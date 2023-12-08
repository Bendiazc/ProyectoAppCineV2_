import express from "express"
import * as userCtrl from '../controllers/userController.js'


const router = express.Router();

router.post("/api/user/register",userCtrl.registerUser)
router.post("/api/user/login",userCtrl.loginUser)
router.get("/api/user/getOne/:idUser",userCtrl.getOneUser);

export {router}


