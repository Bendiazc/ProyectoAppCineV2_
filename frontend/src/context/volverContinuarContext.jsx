import { createContext, useEffect, useState } from "react";

const VolverContinuarContext = createContext()

const VolverContinuarProvider = ({children}) => {

  const [continuar , setContinuar] = useState(0)
  const [volver, setVolver] = useState(1)

  useEffect(() => {
    continuar == 3 && setVolver(4)
    continuar == 2 && setVolver(3)
    continuar==1 && setVolver(2)
    continuar==0 && setVolver(1)
  }, [continuar])
  
  const data = {continuar,setContinuar,volver,setVolver}

  return <VolverContinuarContext.Provider value = {data}>{children}</VolverContinuarContext.Provider>
}

export {VolverContinuarProvider}
export default VolverContinuarContext