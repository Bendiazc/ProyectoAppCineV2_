// mongodb.js
import mongoose from "mongoose";
import * as confiteriaController from "../controllers/confiteriaController.js";

const createMongoDBcon = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/AppCine");

    console.log("Conexión exitosa a MongoDB");

    await confiteriaController.initializeDatabase({});
    
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
  }
};

export default createMongoDBcon;
