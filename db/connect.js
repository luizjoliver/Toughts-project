const {Sequelize} = require("sequelize")

const sequelize = new Sequelize("toughts","root","@Elejota1010",{
    dialect: "mysql",
    host:"localhost"
})


try {
    sequelize.authenticate()
    console.log("Conectado ao banco de dados mysql");
      
    
} catch (error) {
    console.log("Erro ao conectar no banco de dado " + error);
}

module.exports = sequelize