import React, { useEffect, useState } from 'react'
import styles from './ResumenCompra.module.css'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {formatSecondsToHoursMinutes} from '../../funcionesJS/formatoDuracion.js'
import {formatDateApi} from '../../funcionesJS/formatoFechaApi.js'
import {formatDate} from '../../funcionesJS/formatoFecha.js'
import {formatoHoraFunction} from '../../funcionesJS/formatoHoraFuncion.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const apikeyMovie1 = import.meta.env.VITE_API_KEY_MOVIE1

const ResumenCompra = ({infoButtons,infoTickets,prevCancelarCompra,setContinuar,listaSeleccionadas,vcontinuar,setObjetoDatos}) => {
  // console.log(infoButtons , "infoButtons");
  // console.log(infoTickets ,"infoTickets");

  const [movieTitle, setMovieTitle] = useState("")
  const [infoMovie, setInfoMovie] = useState([])
  const [infoDeRadioButtons ,setInfoDeRadioButton] = useState(infoButtons)
  const [infoCantidadTickets, setInfoCantidadTickets] = useState(infoTickets)
  const [reactTostify, setReactTostify] = useState(false)
  const [listaButacasSeleccionadas, setListaButacasSeleccionadas] = useState([])
  
  useEffect(() => {
    setObjetoDatos({
      movieT : movieTitle,
      movieImg : infoMovie.primaryImage && infoMovie.primaryImage.url,
      butacas : listaSeleccionadas,
      horaSala: infoDeRadioButtons,
      tickets:infoCantidadTickets
    })
  }, [listaSeleccionadas])
  
  const params = useParams()
  const navigate = useNavigate()
  const idMovie = params.id;
  const indexMovie = params.idx;

  useEffect(() => {
    // console.log(listaSeleccionadas + "ooooooooooooooooo");
    setListaButacasSeleccionadas(listaSeleccionadas)
  }, [listaSeleccionadas])
  

  const callApiMovieInfo = async () => {
    try {
      const result = await axios.get(`https://moviesdatabase.p.rapidapi.com/titles/${idMovie}?info=base_info`, {
        headers: {
          "X-RapidAPI-Key": apikeyMovie1,
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      });
      const movieTitle = result.data.results.titleText.text;
      const infoTemp = result.data.results
      setInfoMovie(infoTemp)
      setMovieTitle(movieTitle);
      return movieTitle;

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      callApiMovieInfo();
  }, []);

  const salaFuncionMovie = (objetoRadioButtons) => {
    setInfoDeRadioButton(objetoRadioButtons)
  }

  const cantidadTickets = (numeroTickets) => {
    setInfoCantidadTickets(numeroTickets)
  }

  const calcularTotalPrecio = () => {
    return infoCantidadTickets.reduce((total, person) => total + person.price * person.num, 0).toFixed(2)  
  }
  
  const calcularTotalNum= () => {
    return infoCantidadTickets.reduce((total, person) => total + person.num, 0) 
  }

  useEffect(() => {
    setInfoDeRadioButton(infoButtons);
    setInfoCantidadTickets(infoTickets);
  }, [infoButtons, infoTickets]);

  const notify1 = () => {
    toast.error('El campo Tickets es Obligario.', {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",   
      });
  };
  const notify2 = () => {
    toast.error('El campo Butacas es obligatorio.', {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",   
      });
  };

  const notify3 = () => {
    toast.error('Debe completar la cantidad de butacas', {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",   
      });
  };

  return (
    <div className={styles.resumenCompra}>
      <h4>DETALLE DE LA COMPRA</h4>
      <img src={infoMovie.primaryImage && infoMovie.primaryImage.url}  alt = "Imagen Pelicula"></img><br/>
      <div className={styles.resumenTexto}>
        <div className={styles.titlesResumen}>
              <div>DURACION</div>
              <div>ESTRENO</div>
        </div>
        <div className={styles.valoresResumen}>
              <div>{infoMovie.runtime && formatSecondsToHoursMinutes(infoMovie.runtime.seconds)}</div>
              <div>{infoMovie.releaseDate && formatDateApi(infoMovie.releaseDate)}</div>
        </div>
        <div className={styles.titlesResumen}>
              <div>FECHA</div>
              <div>LUGAR</div>
        </div>
        <div className={styles.valoresResumen}>
              <div>{formatDate(new Date())}</div>
              <div>{infoDeRadioButtons? 
              "Sala " + infoDeRadioButtons.sala + "  -  " + formatoHoraFunction(infoDeRadioButtons.checked) :"-"}</div>
        </div>

        <hr/>
        <p style={{marginBottom :"0px", fontWeight: "bold"}}>CANTIDAD Y TIPO DE ENTRADAS</p>  
        <div className={styles.cantidadEntrada}>
            {(infoCantidadTickets && (infoCantidadTickets[0].num > 0 || infoCantidadTickets[1].num > 0 || infoCantidadTickets[2].num > 0)) ? 
              <>
                {infoCantidadTickets.map(val => (
                  val.num > 0 && <p key={val.person}>{`${val.num} ${val.person}`}</p>
                ))}
                {calcularTotalNum()>1 ?
                  <p>{`(${calcularTotalNum()} Tickets)`}</p>: <p>{`(${calcularTotalNum()} Ticket)`}</p>}
              </>
              :  "-"
            }    
        </div>
        
      
        <div id = {styles.paraMargin} className={styles.titlesResumen} style={{marginTop: "7px"}}>
              <div>BUTACAS SELECCIONADAS</div>
        </div>

        <div className={styles.valoresResumen}>
              <div className={styles.espacioListaButacas}>
                  {listaButacasSeleccionadas.length > 0 && vcontinuar!==0? (
                    listaButacasSeleccionadas.map((butaca, idx) =>
                      listaButacasSeleccionadas.length - 1 === idx ? (
                                <p key={idx}>{`${butaca}`}</p>
                              ) : (
                                <p key={idx}>{`${butaca} ,`}</p>
                              )
                            )
                  ) : (<p>-</p>)}
              </div>
        </div>

        <div className={styles.totalContinuar}>
          <div className={styles.totalPrecio}>
            <p>TOTAL</p>
            <p>S/ {infoCantidadTickets && calcularTotalPrecio()} </p> 
          </div>
          <div className={styles.botonComprarCancelar}>

            
            <button onClick={() => {
               let num = 0
               infoCantidadTickets.map (category => 
               num+= category.num)
              //  console.log(num);
               if (num==0 || infoDeRadioButtons==null ) notify1()
               else if (vcontinuar==1 && (listaButacasSeleccionadas.length ==0) ) notify2()
               else if (vcontinuar==1 && !(listaButacasSeleccionadas.length ==calcularTotalNum()) ) notify3()
               else if (vcontinuar==1 && (listaButacasSeleccionadas.length ==calcularTotalNum()))
               setContinuar(2)
               else  setContinuar(1)}}>Continuar</button>
                {          
                  <ToastContainer />  
                }     
            
            <button onClick={() => {
              //setInfoCantidadTickets(TipoTicket) ; 
              prevCancelarCompra(true)}               
              }
              >Cancelar Compra</button>
            
          </div>
        </div>          
      </div>
    </div>
  )
}

export default ResumenCompra
