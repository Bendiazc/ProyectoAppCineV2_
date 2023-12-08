import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const registerUser = async(req,res) => {
    try {
        let userData = req.body;
        userData.password = bcrypt.hashSync(userData.password,10)
        
        let result = await User.create(userData)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({
            "message" : error.message
        })
    }
}

const getOneUser = async(req,res) => {
    let id = req.params.idUser
    let userFound = await User.findById(id)
    res.json(userFound)
}

const loginUser = async (req,res) => {

    let result = await User.findOne({email:req.body.email})
    console.log(result);

    if (result == null) {
        res.status(200).json(false)
        return
    }

    let resultCompare = bcrypt.compareSync(req.body.password,result.password)

    if (!resultCompare) {
        res.status(200).json(false)
        return
    }
    res.status(200).json({id:result._id , type: result.typeUser})

}

export {registerUser,loginUser,getOneUser}