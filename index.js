const express = require("express")
const expshbs = require("express-handlebars")
const session = require("express-session")
const FileStore = require("session-file-store")(session)
const flash = require("express-flash")
const toughtRoutes = require("./routes/toughtsRotes")
const authRoutes = require("./routes/authRotes")

const conn = require("./db/connect")

const app = express()

//Controller
const ToughtController = require("./controllers/ToughtController")
//Models
const Toughts = require("./models/Toughts")
const User = require("./models/User")



//Template engine
app.engine("handlebars",expshbs.engine())
app.set("view engine","handlebars")
//public path
app.use(express.static("public"))
//Receber reposta do body
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//session midleware

app.use(
    session({
        name:"session",
        secret:"nosso_secret",
        resave:false,
        saveUninitialized:false,
        store: new FileStore({
            logFn: function(){},
            path: require("path").join(require("os").tmpdir(), "sessions")
        }),
        cookie:{
            secure:false,
            maxAge:360000,
            expires: new Date(Date.now() + 3660000),
            httpOnly:true
        }
    })
)

//flash message

app.use(flash())

//set session to res
app.use((req,res,next)=>{

    if(req.session.userid){
        res.locals.session = req.session
    }
    next()

})

//Routes
app.use("/toughts",toughtRoutes)
app.get("/",ToughtController.showToughts)
app.use("/",authRoutes)

conn.sync().then(()=>{
    app.listen(3000,()=>{
        console.log("Servidor inciado");
    })
}).catch((error)=>{
    console.log("Erro ao conectar no servidor:"+error); 
})





