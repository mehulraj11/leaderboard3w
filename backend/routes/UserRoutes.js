const express = require("express");
const UserControllers = require("../controllers/UserControllers")
const router = express.Router();

router.get("/getusers", UserControllers.getUsers)
router.post("/createuser", UserControllers.createUser)
module.exports = router;