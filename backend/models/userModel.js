import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  fullName: {type: String,required:true ,minLength: [8,"Enter Full Name"]},
  email: {type:String,unique:true,required:true}, 
  password: {type:String,required:true },  
  confirmPassword: {type:String,required:true,minLength: [4,"The password must be at least 4 characters."]}  ,
  typeUser: {
    type: String,
    required: true,
    enum: ["client", "admin"],
    default: "client" 
  }
},{
    timestamps: true
});

const User = mongoose.model("users", UserSchema);
export default User;



