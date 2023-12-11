import mongoose from 'mongoose';
// import  Movie from './movieModel.js'; // Modelo de MOVIE

const cinemaSchema = new mongoose.Schema({
    pais : { type: String, required: true },
    departamento: { type: String, required: true },
    distrito: { type: String, required: true },
    numSalas: { type: Number, required: true },
    arregloSalas: {type: Array, required: true },
    movies: [{
      nameID: { type: String, required: true }, //el front retorna el id..
      funcion: { type: Number, required: true },
      sala: { 
        type: Number, 
        required: true,
        validate: {
          validator: value => (value <= this.numSalas),
          message: props => `La sala no puede ser mayor que el número total de salas (${props.value}).`
      }},
  }],
});

const Cinema = mongoose.model('cinema', cinemaSchema);

export default Cinema;
