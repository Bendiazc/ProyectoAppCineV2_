import express from "express"
import * as cinemaController from '../controllers/cinemaController.js'
import bodyParser from "body-parser";

const router = express.Router();

router.post("/api/cinema/create", cinemaController.createCinema);
router.get("/api/cinema/get", cinemaController.getCinemas);
router.get("/api/cinema/getOne/:idc", cinemaController.getOneCinema);
router.put("/api/cinema/update/:idc", cinemaController.updateCinema);
router.delete("/api/cinema/delete/:idc", cinemaController.deleteCinema);

export {router}