import React, { useContext, useEffect, useRef, useState } from 'react';
import Butaca from '../Butaca/Butaca.jsx';
import styles from './ButacasSala.module.css';
import html2canvas from 'html2canvas';
import {formatDate} from '../../funcionesJS/formatoFecha.js'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EntradasContext from '../../context/entradasContext.jsx';
import ButacasContext from '../../context/butacasContext.jsx';

//  const sala1 = [[11,11,11,11],[12,12,12,12],[11,11,11,11]]
//  const sala2 = [[10,10,10],[12,12,12,12],[10,10,10,10,10]]
//  const sala3 = [[11,11,11,11],[11,11,11,11],[11,11,11,11]]
//  const sala4 = [[10,10,10,10,10],[11,11,11,11,11],[10,10,10]]
//  const sala5 = [[10,10,10],[12,12,12,12,12],[10,10,10]]
//  const sala6 = [[12,12],[12,12,12,12,12,12],[10,10,10,10]]

 const salas = [
  [[11,11,11,11],[12,12,12,12],[11,11,11,11]],
  [[10,10,10],[12,12,12,12],[10,10,10,10,10]],
  [[11,11,11,11],[11,11,11,11],[11,11,11,11]],
  [[10,10,10,10,10],[11,11,11,11,11],[10,10,10]],
  [[10,10,10],[12,12,12,12,12],[10,10,10]],
  [[12,12],[12,12,12,12,12,12],[10,10,10,10]]
 ]
// const salaElegida = [...sala6]

 function generarLetras(num) {
  const letras = [];
  const inicio = 'A'.charCodeAt(0);

  for (let i = 0; i < num; i++) {
    letras.push(String.fromCharCode(inicio + i));
  }
  return letras;
}

function numeroALetra(numero) {
  if (numero < 1 || numero > 26) {
    return null;
  }
  const codigoLetra = 65 + numero - 1;
  const letra = String.fromCharCode(codigoLetra);// Convierte el código ASCII a letra
  return letra;
}

//infoDeRadioButtons,handleInfoRadioButtons
//infoDeRadioButtons.sala
//infoDeRadioButtons.checked

// vsala={infoDeRadioButtons.sala}                           
// setListaSeleccionadas = {setListaSeleccionadas}
// vhora = {infoDeRadioButtons.checked}

const ButacasSala = ({vidMovie}) => {

  const {listaSeleccionadas,setListaSeleccionadas,setImagenTemp} = useContext(ButacasContext)
  
  const {infoCantidadTickets,infoDeRadioButtons} = useContext(EntradasContext) || {}

  const calcularTotalNum= () => {
    return infoCantidadTickets.reduce((total, person) => total + person.num, 0) 
  }

  useEffect(() => {
    infoCantidadTickets&&
    setCantidadTickets(calcularTotalNum())
  }, [infoCantidadTickets])
  
  
  //DATOS QUE DEPENDEN DEL MAPEO Y SELECCION DE BUTACAS
  const [butacasReserved , setButacasReserved] = useState([]) //pintar y no permitir seleccionar

  const getSeatsReserved = async () => {
    try {
        let responseSeats = await axios.get("http://localhost:8050/api/ticket/getSeatsReserved/"+vidMovie+"/"+infoDeRadioButtons.sala+"/"+infoDeRadioButtons.checked+"/"+formatDate(new Date()))
        const butacasReservadas = responseSeats.data
        // console.log(MapeoParaButacasReserved(butacasReservadas));
        setButacasReserved(MapeoParaButacasReserved(butacasReservadas))

    } catch (error) {
        alert(error)
    }
  }

  useEffect(() => {
    getSeatsReserved();
  }, [vidMovie,infoDeRadioButtons.sala,infoDeRadioButtons.checked]);

  const MapeoParaButacasReserved = (data) => {
    return data.map(seats => 
       seats.butacas)
  }


  const [cantidadTickets , setCantidadTickets] = useState(0)
  // const [butacasSeleccionadas, setButacasSeleccionadas] = useState([]);
  const listaSalida = butacasReserved.flat();
  const [salasLista, setSalasLista] = useState(salas)
  const [salaElegida, setSalaElegida] = useState([])
  // console.log(listaSalida);

  useEffect(() => {
    cantidadTickets == listaSeleccionadas.length &&
    CapturarImagen()
  }, [listaSeleccionadas])

  //=====Para capturar la imagen======//

  // libreria: hmtl2canvas 

  const boxSala = useRef();

  const CapturarImagen = async () => {
    if (boxSala.current) {
      try {
        const canvas = await html2canvas(boxSala.current,
          { logging: true, 
            letterRendering: 1, 
            useCORS: true,
            onrendered: (canvas) => {
              const imageURL = canvas.toDataURL('image/png');
              // console.log(imageURL);
              setImagenTemp(imageURL);
            },
          }); //el {} importante para links externos 
          
        const imageURL = canvas.toDataURL('image/png');
        // console.log(imageURL);
        setImagenTemp(imageURL);
      } catch (error) {
        console.error('Error al capturar la imagen:', error);
      }
    }
  };

  //=================================//

  // useEffect(() => {
  //   // console.log(numeroTotalTickets+"OUUUUUUUU");
  //   setCantidadTickets(numeroTotalTickets)
  // }, [numeroTotalTickets])
  
  // useEffect(() => {
  //   setListaSeleccionadas(butacasSeleccionadas)
  // }, [butacasSeleccionadas])
  
  // useEffect(()=> {
  //   setListaSeleccionadas([])
  // },[]) 

  useEffect(() => {
    // console.log(vsala+"Efwef11111111111111"+vhora+"Efwef");
    setSalaElegida(salasLista[infoDeRadioButtons.sala-1])
  }, [infoDeRadioButtons.sala])
  

  const calculoNumColumnas = (sala) => {
    let suma = 0
    sala.map(seccion => 
      {let temp = seccion.length
        return suma +=temp}
      )
    return(suma)
  }

  const columnasPorSeccion = (sala) => {
    let listaTemp = []
    sala.map(seccion => listaTemp.push(seccion.length))
    return listaTemp  
  }

  const SumaColumSeccionesPrevias = (numColumnSection, idx) => {
    let suma = 0;
    numColumnSection.map((numColumSect, ix) => {
      if (ix < idx) {
        suma += numColumSect;
      }
    });
    return suma;
  };

  const numColumna = (sala,idxSection,idxCol) => { //sala6 , 1 , 0
    const numColumnSection = columnasPorSeccion(sala) //[ , , ]
    // console.log(numColumnSection);
    if (idxSection > 0) {
      return((idxCol + 1) + SumaColumSeccionesPrevias(numColumnSection,idxSection))
    }
    return idxCol+1
  }

  const calculoNumFilasMaxima = (sala) => {
    let numMax = 0;
    sala.map( section => (
      section.map(filas => {
        if (filas>numMax) numMax = filas
        })
    ))
    return numMax
  }

  const handleSeleccion = (asiento) => {
    // Verificar si la butaca ya está en la lista de seleccionadas
    if (listaSeleccionadas.includes(asiento)) {
      // Si está, la deseleccionamos eliminándola de la lista
      setListaSeleccionadas((prev) => prev.filter((butaca) => butaca !== asiento));
    } else {
      // Si no está, la seleccionamos agregándola a la lista
      setListaSeleccionadas((prev) => [...prev, asiento]);
    }
  };


  const notify = () => {
    toast.error('El campo Tickets es Obligario.', {
      position: "bottom-left",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      background:"red"
      });
  };
  
  return (
    <div className={styles.containerr}>
      <div className={styles.boxParaCaptura} ref = {boxSala} >
      <img src="/Pantalla.svg" alt="ImagenPantalla"  />     
      <div className={styles.boxButacas} style={{ width: `${calculoNumColumnas(salaElegida) * 60}px` }} > 
      {/* //ref para capturar la imagen */}
            <div className={styles.boxLetters}>              
              {    
                  generarLetras(calculoNumFilasMaxima(salaElegida)).map(letra => (
                    <div key = {letra} className={styles.letras}>{letra}</div>
                  ))
              }
            </div>

            {
              salaElegida.map((seccion , idxSeccion) => (
                <div key = {idxSeccion} className={styles.seccionSala} style = {{flex: seccion.length}}>
                  {
                    seccion.map ((column ,idxColum )=> (
                      <div key = {idxColum}  className={styles.columnSala}>
                        {
                          Array.from({length: column}).map((butaca,idxFila) => (
                            <Butaca
                              key={idxFila} 
                              asiento={{ fila: numeroALetra(idxFila+1),        columna: numColumna(salaElegida, idxSeccion, idxColum) }}
                              asientosLlenos = {listaSalida}
                              onSeleccion={handleSeleccion}
                              cantidadTickets={cantidadTickets}
                            />
                          ))
                        }
                      </div>
                    ))
                  }
                </div>
              ))
            }    
          </div>
          </div>
        <img src="/DebajoSala.svg" alt="AvisoSala"  />
        
    </div>
  )
}

export default ButacasSala
