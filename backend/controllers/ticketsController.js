import Ticket from "../models/ticketsModel.js";

const createTicket = async (req, res) => {
  let TicketData = req.body;
  let response = await Ticket.create(TicketData);
  res.status(200).json(response);
};

const getTicketsByUser = async (req, res) => {
  let User = req.params.idUser;
  let ListTickets = await Ticket.find({idUser:User})
  res.status(200).json(ListTickets)
};

const getSeatsReserved = async(req,res) => {
  let Movie = req.params.idMovie;
  let Sala = req.params.sala;
  let Funcion = req.params.funcion;
  let Fecha = req.params.fecha;
  let SeatsList = await Ticket.find({idMovie:Movie,
                                     sala:Sala,
                                     funcion:Funcion,
                                     date:Fecha})
  res.status(200).json(SeatsList)
}

export { createTicket,getTicketsByUser,getSeatsReserved};