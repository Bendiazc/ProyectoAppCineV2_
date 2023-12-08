import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({
    idMovie: {type:String,require: true},
    sala: {type:Number, require: true},
    funcion: {type:Number, require: true},
    date:{type:String,require: true},
    butacas:{type:Array,require: true},
    idUser: {type:String,require: true},
    captura:{type:String}
})

const Ticket = mongoose.model("tickets",ticketSchema)
export default Ticket

