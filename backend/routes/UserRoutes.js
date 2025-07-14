const express = require("express");
const UserControllers = require("../controllers/UserControllers");
const router = express.Router();

router.get("/getusers", UserControllers.getUsers)
router.get("/claimhistory", UserControllers.getClaimHistory)
router.post("/createuser", UserControllers.createUser)
router.put("/updateuser", UserControllers.updateUser)
module.exports = router;