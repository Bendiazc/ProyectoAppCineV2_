import { createContext, useEffect, useState } from "react";

const ButacasContext = createContext()

const ButacasProvider = ({children}) => {

  const [listaSeleccionadas, setListaSeleccionadas] = useState([])
  const [imagenTemp, setImagenTemp] = useState("")
  const [arriveLimit, setArriveLimit] = useState(false)

  const data = {listaSeleccionadas,setListaSeleccionadas,imagenTemp,setImagenTemp,arriveLimit, setArriveLimit}

  // useEffect(() => {
  //   console.log(imagenTemp+"0000000");
  // }, [imagenTemp])
  
  useEffect(() => {
    setListaSeleccionadas(listaSeleccionadas)
    // console.log(listaSeleccionadas);
  }, [listaSeleccionadas])

  
  return <ButacasContext.Provider value = {data}>{children}</ButacasContext.Provider>
}

export {ButacasProvider}

export default ButacasContext