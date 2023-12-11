import React, { useContext, useEffect, useState } from 'react'
import styles from './ResumenCompra.module.css'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {formatSecondsToHoursMinutes} from '../../funcionesJS/formatoDuracion.js'
import {formatDateApi} from '../../funcionesJS/formatoFechaApi.js'
import {formatDate} from '../../funcionesJS/formatoFecha.js'
import {formatoHoraFunction} from '../../funcionesJS/formatoHoraFuncion.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductContext from '../../context/productContext.jsx'
import TarjetaResumen from '../TarjetaResumen/tarjetaResumen.jsx'
import EntradasContext, { EntradasProvider } from '../../context/entradasContext.jsx'
import ButacasContext from '../../context/butacasContext.jsx'
import Modal from '../Modal/Modal.jsx'

const apikeyMovie1 = import.meta.env.VITE_API_KEY_MOVIE1

const ResumenCompra = ({prevCancelarCompra,setContinuar,vcontinuar,setObjetoDatos,setVentanaModalResumen}) => {
  // console.log(infoButtons , "infoButtons");
  // console.log(infoTickets ,"infoTickets");

  const {listaSeleccionadas} = useContext(ButacasContext)
  const {infoCantidadTickets,handlecantidadTickets,infoDeRadioButtons,handleInfoRadioButtons} = useContext(EntradasContext)

  const [movieTitle, setMovieTitle] = useState("")
  const [infoMovie, setInfoMovie] = useState([])
  // const [infoCantidadTickets, setInfoCantidadTickets] = useState(infoCantidadTickets)
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
    handleInfoRadioButtons(objetoRadioButtons)
  }

  // const cantidadTickets = (numeroTickets) => {
  //   setInfoCantidadTickets(numeroTickets)
  // }

  const calcularTotalPrecio = () => {
    return infoCantidadTickets.reduce((total, person) => total + person.price * person.num, 0).toFixed(2)  
  }
  
  const calcularTotalNum= () => {
    return infoCantidadTickets.reduce((total, person) => total + person.num, 0) 
  }

  useEffect(() => {
    handleInfoRadioButtons(infoDeRadioButtons);
    // handlecantidadTickets(infoCantidadTickets);
  }, [infoDeRadioButtons, infoCantidadTickets]);

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

  const { products, handleListProducts } = useContext(ProductContext);


  return (
    <div className={styles.resumenCompra}>
      <h4>DETALLE DE LA COMPRA</h4>
      <div className={styles.contenedorImagenResumen}>
        <img src={infoMovie.primaryImage && infoMovie.primaryImage.url}  alt = "Imagen Pelicula"></img><br/>
        <div className={styles.contenedorResumen}>
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
          <hr  style={{color: "white"}}></hr>
          <p style={{marginBottom :"0px", fontWeight: "bold"}}>CANTIDAD Y TIPO DE ENTRADAS</p>  
          <div className={styles.cantidadEntrada}>
               {(infoCantidadTickets && infoCantidadTickets.length > 0 && (infoCantidadTickets.some((val) => val.num > 0))) ? 
              //  {(infoCantidadTickets && (infoCantidadTickets[0].num > 0 || infoCantidadTickets[1].num > 0 || infoCantidadTickets[2].num > 0)) ? 
               (
                <>
                  {infoCantidadTickets.map((val) => (
                    val.num > 0 && <p key={val.person}>{`${val.num} ${val.person}`}</p>
                  ))}
                  {calcularTotalNum() > 1 ? (
                    <p>{`(${calcularTotalNum()} Tickets)`}</p>
                  ) : (
                    <p>{`(${calcularTotalNum()} Ticket)`}</p>
                  )}
                </>
               ) : (
                <p style={{ marginLeft: "35px" }}>-</p>
              )}  
          </div>
          </div>
        
      </div>

      <div className={styles.resumenTexto}>
        
        <div id = {styles.paraMargin} className={styles.titlesResumen} style={{marginTop: "7px"}}>
              <div>BUTACAS SELECCIONADAS</div>
        </div>

        <div className={styles.valoresResumenButacas}>
              <div className={styles.espacioListaButacas}>
                  {listaButacasSeleccionadas.length > 0 ? (
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

        <div id = {styles.paraMargin} className={styles.titlesResumen} style={{marginTop: "7px"}}>
              <div>DULCERÍA</div>
        </div>
        <div className={styles.espacioProductoss}>
          {
            products.map((item, index) => (
                <TarjetaResumen item = {item} 
                                key={index+item.name}                       
                                index = {index} 
                                vcontinuar = {vcontinuar}
                                ></TarjetaResumen>
            ))
          }       
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
               console.log(num);
               if (num==0 || infoDeRadioButtons==null ) notify1()
               else if (vcontinuar==1 && (listaButacasSeleccionadas.length ==0) ) notify2()
               else if (vcontinuar==1 && !(listaButacasSeleccionadas.length ==calcularTotalNum()) ) notify3()
               else if (vcontinuar==1 && (listaButacasSeleccionadas.length ==calcularTotalNum()))
               setContinuar(2)
               else if (vcontinuar==2) setVentanaModalResumen(true)
              //  else if (vcontinuar==3) setContinuar(3)
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
