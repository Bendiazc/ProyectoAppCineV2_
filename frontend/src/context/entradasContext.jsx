import { useEffect, useState } from "react";
import { createContext } from "react";

const EntradasContext = createContext()

const TipoTicket = [
  {
    person: "Adult",
    price: 20,
    num : 0
  },
  {
    person: "Child 3-8",
    price: 10,
    num : 0
  },
  {
    person: "Adult +60",
    price: 10,
    num : 0
  },
]

const EntradasProvider = ({children}) => {

  const [infoCantidadTickets, setInfoCantidadTickets] = useState(TipoTicket)
  const [infoDeRadioButtons ,setInfoDeRadioButton] = useState(null)

  // useEffect(() => {
  //   console.log(infoDeRadioButtons);
  // }, [infoDeRadioButtons])

  // useEffect(() => {
  //   console.log(infoCantidadTickets);
  // }, [infoCantidadTickets])
  
  const handlecantidadTickets = (numeroTickets) => {
    setInfoCantidadTickets(numeroTickets);
  }

  const handleInfoRadioButtons = (objetoRadioButtons) => {
    setInfoDeRadioButton(objetoRadioButtons)
  }

  const data= {infoCantidadTickets,handlecantidadTickets,infoDeRadioButtons,handleInfoRadioButtons};
  return <EntradasContext.Provider value = {data}>{children}</EntradasContext.Provider>
}

export {EntradasProvider}

export default EntradasContext