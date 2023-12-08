import Cinema from "../models/cinemaModel.js"

const createCinema = async(req,res) => {
    try {
      let CinemaData = req.body
      let newCinema = await Cinema.create(CinemaData)
      res.status(200).json(newCinema)
  } catch (error) {
      console.log("Error: " + error);
      res.status(400).json({
          "Message" : error.message
      })
  }
}

const getCinemas = async (req,res) => {

  let cinemasList = await Cinema.find()
  //No hace falta igualarlo a una constante
  // const sortedcinemas = cinemasList.sort((a, b) => a.name.localeCompare(b.name))
  cinemasList.sort((a, b) => a.pais.localeCompare(b.name))
  res.json(cinemasList)
}

const getOneCinema = async(req,res) => {
    let id = req.params.idc
    let CinemaFound = await Cinema.findById(id)
    res.json(CinemaFound)
}

const deleteCinema = async(req,res) => {
    let id = req.params.idc
    await Cinema.findByIdAndDelete(id)
    res.status(200).json()//para este metodo no se requiere necesariamente retornar una respuesta 
}

const updateCinema = async (req,res) => {

  try {
    let id = req.params.idc
    let dataChange = req.body
    await Cinema.findByIdAndUpdate(id,dataChange, {runValidators: true})
    res.status(200).json()
} catch (e) {
    console.log("Error: "+ e);
    res.status(400).json({
        "Mensaje" : e.message
    })
}
}

export {createCinema,getCinemas,getOneCinema,deleteCinema,updateCinema}
