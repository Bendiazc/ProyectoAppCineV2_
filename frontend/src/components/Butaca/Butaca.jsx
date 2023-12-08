import React, { useEffect } from 'react';
import { useState } from 'react';

const Butaca = ({ asiento ,asientosLlenos, onSeleccion,cantidadTickets,butacasSeleccionadas}) => {
  
  const [yesNoSelect, setYesNoSelect] = useState(false);
  const [preSeleccionado , setPreSeleccionado] = useState(false)
  const resultado = asiento.fila + asiento.columna;
  const [arriveLimit, setArriveLimit] = useState(false)
  
  const estaContenido = asientosLlenos.includes(resultado);
  // console.log(estaContenido);

  //Esta variable me sirve para solo poder volver a deseleeccionar 
  //las butacas que ya estan contenidas en "butacasSeleccionadas"
  //cuando llega al limite no permite mas selecciones, y solo puedo
  //seleccionar las que ya estaban... y esto gracias a esta variable
  //que entra en la condicion del Onclick
  const limite = butacasSeleccionadas.includes(resultado)

  useEffect(() => {
    if (estaContenido) {
      setYesNoSelect(true)
      setPreSeleccionado(true)
    }
   }, [asiento])

   useEffect(() => {
    if (cantidadTickets == butacasSeleccionadas.length) setArriveLimit(true) 
    else setArriveLimit(false) 
   }, [butacasSeleccionadas])
   
  return (
      <svg 
        width="30"
        height="30" 
        viewBox="0 0 50 50" 
        fill="none" 
        cursor={!preSeleccionado ? "pointer" : "not-allowed"}
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => {
          if (preSeleccionado==false && (!arriveLimit || limite)) 
          {setYesNoSelect(!yesNoSelect)
          onSeleccion(resultado);}
          // console.log(resultado);}     
        }}

        style={{ transition: "fill 0.3s", ":hover": { fill: "lightgray" } }}>                 
          <path   
            d="M0 10C0 4.47715 4.47715 0 10 0H40C45.5228 0 50 4.47715 50 10V46C50 48.2091 48.2091 50 46 50H4C1.79086 50 0 48.2091 0 46V10Z"
             fill={yesNoSelect ? (preSeleccionado ? "red" : "#0066FF") : "white"}
          />
      </svg>
  );
};

export default Butaca;
