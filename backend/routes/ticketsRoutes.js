import express from "express"
import * as ticketsController from '../controllers/ticketsController.js'
import bodyParser from "body-parser";

const router = express.Router();

// router.post("/api/ticket/register", bodyParser.json({ limit: '600kb' }), ticketsController.createTicket);
router.post("/api/ticket/register", ticketsController.createTicket);
router.get("/api/ticket/getTickets/:idUser",ticketsController.getTicketsByUser)
router.get("/api/ticket/getSeatsReserved/:idMovie/:sala/:funcion/:fecha",ticketsController.getSeatsReserved)

export {router}