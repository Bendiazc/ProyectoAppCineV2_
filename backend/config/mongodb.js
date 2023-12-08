import mongoose from "mongoose";

const createMongoDBcon = () => {
  mongoose
    .connect("mongodb://localhost:27017/AppCine")
    .then(() =>  console.log("Conexion correcta"))
    .catch((e) => console.log(e));
};

export default createMongoDBcon
