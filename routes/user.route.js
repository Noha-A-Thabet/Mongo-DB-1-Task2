const router = require("express").Router()
const userController = require("../controller/user.controller")
router.get("/add", userController.add)
router.get("/", userController.all)
router.get("/single/:id", userController.single)
module.exports = router