const {DataTypes} = require("sequelize")
const sequelize = require("../db/connect")
const User = require("./User")

const Toughts = sequelize.define("Toughts",{
    title:{
        type: DataTypes.STRING,
        allowNull:false,
        required:true
    },

})

Toughts.belongsTo(User)
User.hasMany(Toughts)

module.exports = Toughts