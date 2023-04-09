const express = require("express")
const AuthController = require("../controllers/AuthController")

const Router = express.Router()

Router.get("/login",AuthController.login)
Router.post("/login",AuthController.loginPost)
Router.get("/register",AuthController.register)
Router.post("/register",AuthController.registerPost)
Router.get("/logout", AuthController.logout)

module.exports = Router