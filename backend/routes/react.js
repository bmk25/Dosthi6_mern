const express = require("express")
const {postReact ,getReacts}= require("../controllers/react")
const {authUser }= require("../middlewares/auth")

const router = express.Router();


router.put("/postReact",authUser,postReact)
router.get("/getReacts/:id", authUser, getReacts);



module.exports = router;
