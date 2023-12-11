import express from "express"
import * as confiteriaController from '../controllers/confiteriaController.js'

const router = express.Router();

router.get("/api/products/get", confiteriaController.getAllProducts);
// router.post("/api/products/get", confiteriaController.initializeDatabase);
export {router}