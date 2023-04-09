const Tought = require("../models/Toughts")
const User = require("../models/User")

const bcrypt = require("bcryptjs")

module.exports = class AuthController{
    static login(req,res){
        res.render("auth/login")
    }
    static async loginPost(req,res){

        const {email,password} = req.body

        //find User
        
        const user = await User.findOne({where: {email:email}})

        if(!user){
            req.flash('message','E-mail não cadastrado')
            return
        }

        //password validation
        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!passwordMatch){
            req.flash('message','Senha incorreta!')
            res.redirect("/register")
            return
        }
        //Initialize session
        req.session.userid = user.id


        req.flash('message','Autenticação realizada com sucesso!')

        req.session.save(() =>{
            res.redirect("/")
        })
        

    }
    static register(req,res){
        res.render("auth/register")
    }
    static async registerPost(req,res){
        
        const {name,email,password,confirmpassword} = req.body

        //pasword match validation

        if(password !== confirmpassword){
            req.flash("message","As senhas não conferem,tente novamente!")
            res.render("auth/register")

            return
        }

        //check if user exists
        const checkUserExists = await User.findOne({where:{email:email}})

        if(checkUserExists){
            req.flash("message","Este email já está em uso!")
            res.render("auth/register")

            return
        }

        //create a password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password,salt)

        const user = {
            name: name,
            email: email,
            password: hashedPassword
        }

        try {
           const createdUser = await User.create(user)

            //Initialize session
            req.session.userid = createdUser.id


            req.flash('message','Cadastrado com sucesso!')

            req.session.save(() =>{
                res.redirect("/")
            })

            
        
        } catch (error) {
            console.log(error);
        }
        
    }
    static logout(req,res){
        req.session.destroy()
        res.redirect("/login")
    }
}   
