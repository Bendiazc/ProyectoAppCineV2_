import React, { useContext, useEffect, useRef } from 'react';
import { useState } from 'react';
import ButacasContext from '../../context/butacasContext';

const Butaca = ({ asiento ,asientosLlenos, onSeleccion,cantidadTickets}) => {

  const {listaSeleccionadas,setListaSeleccionadas,arriveLimit, setArriveLimit} = useContext(ButacasContext)

  const pathRef = useRef(null) //para garantizar que me refiero a las prop del path

  const [yesNoSelect, setYesNoSelect] = useState(false);
  const [preSeleccionado , setPreSeleccionado] = useState(false)
  const resultado = asiento.fila + asiento.columna;

  const estaContenido = asientosLlenos.includes(resultado);

  // useEffect(() => {
  //   console.log(arriveLimit);
  // }, [arriveLimit])

  const seleccionadoTemp = listaSeleccionadas.includes(resultado) //la butaca ya estaba seleccionado temporalmente

  // console.log(estaContenido);

  /*LEER COMENTARIO1*/
  const limite = listaSeleccionadas.includes(resultado) 

  useEffect(() => {
    if (estaContenido) {
      setYesNoSelect(true)
      setPreSeleccionado(true)
    }
   }, [asiento])

   useEffect(() => {
    if (cantidadTickets == listaSeleccionadas.length) setArriveLimit(true) 
    else setArriveLimit(false) 
    // console.log(listaSeleccionadas);
    // console.log(limite+"DeLimite");
   }, [listaSeleccionadas])
   
  return (
      <svg 
        width="30"
        height="30" 
        viewBox="0 0 50 50" 
        fill="none" 
        cursor={!preSeleccionado ? "pointer" : "not-allowed"}
        xmlns="http://www.w3.org/2000/svg"
        onClick={(e) => {
          // console.log(limite+"45646546546");
          if (preSeleccionado==false && (!arriveLimit || limite))          
          { 
            //lEER EL COMENTARIO2
            let color = pathRef.current.getAttribute('fill'); 
            if (color == "#0066FF") setYesNoSelect(false)

            else setYesNoSelect(!yesNoSelect)
            onSeleccion(resultado);
        }
          // console.log(resultado);}     
        }}

        style={{ transition: "fill 0.3s", ":hover": { fill: "lightgray" } }}>                 
          <path   
            ref={pathRef}
            d="M0 10C0 4.47715 4.47715 0 10 0H40C45.5228 0 50 4.47715 50 10V46C50 48.2091 48.2091 50 46 50H4C1.79086 50 0 48.2091 0 46V10Z"
             fill={yesNoSelect ? 
                    (preSeleccionado ? 
                      "red" 
                      : 
                        "#0066FF") 
                  : seleccionadoTemp ? 
                    "#0066FF"
                  :
                    "white"}
          />
      </svg>
  );
};

export default Butaca;

/*COMENTARIO1:  Cuando se leega al limite de butacas no permite mas selecciones, entonces con esta variable
  lo que se logra es poder seleccionar solo a las que ya estan seleccionadas, como Deseleccionar
  cuando llego al tope de tickets, esta variable solo vale "true" en las butacas que ya seleccione, entonces
  ese valor se puede pasar en el metodo Onclick, ya que al llegar al limite esta bien que no pueda seleccionar mas
  pero si las que ya estan seleccionadas como editarlos.. por esta como un condicional de "O" (preSeleccionado==false && (!arriveLimit || limite))  SIN ESO EL PARENTESIS DE LA CONDICION SIEMPOREE ES FALSE entonces no funciona el onclick.. pero con esta variable da una 
  oportunidad para las butacas que estan seleccionadas, si es true entonces el aprentesis es TRUE  
  */

/*COMENTARIO2: 2lineas siguientes importantes en el caso de cuando vuelvo a la parte de seleccionar butacas luego de hber continuado con la seccion de confiteria... , cuando yo regresaba a la seccion de butacas, gracias a la condicion adicionl del fill

  : seleccionadoTemp ? 
  "#0066FF"
  Que funciona como un elseif, ya que no entraba al primer if..porque yesnoSelect era "false", al rendeerizar todas las butacas, la butaca que coincida con una de las listas entonces tenia esta variablee en "true" y poir eso se pintaba de azul, cosa que esta bien ya que yo queria que al retonrar haya una memoria de las que se selecciono previamente...

El problema estaba que como ya estaba "Azul" al darle click nuevamente para seleccionarlas entraba en el primer if porque el yesnoselect se volvia True

  yesNoSelect ? 
        (preSeleccionado ? 
          "red" 
          : 
            "#0066FF") 
  Lo volvia a pintar de azul porque al seleccionarlaas 

Entnoces claro , mi objetivo era que al darle click se pinte de blacno no que siempre este azul..
Para eso refeerencio la propiedad del fill del path.. y pregunto primero si es azul, entonces si o si poner el setyesnoSelect en False.. cosa que en las condiciones del fill no entra a ninguna y se pone en color "white"..

No se que hubiese pasado si el YesNoselect lo agregaba al contexto.. cosa que recordaba si fue o no seleccionado, el valor de true o el fasle.. quizas funcionaba..*/