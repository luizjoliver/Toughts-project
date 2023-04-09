const express = require("express")
const ToughtController = require("../controllers/ToughtController")

//helpers
const checkAuth = require("../helpers/auth").checkAuth

const Router = express.Router()

Router.get("/",ToughtController.showToughts)
Router.get("/add",checkAuth,ToughtController.createTought)
Router.get("/edit/:id",checkAuth, ToughtController.updateTought)
Router.post("/edit",checkAuth, ToughtController.updateToughtSave)
Router.post("/add", checkAuth, ToughtController.createToughtSave)
Router.post("/remove",checkAuth, ToughtController.removeTought)
Router.get("/dashboard",checkAuth,ToughtController.dashboard)






module.exports = Router