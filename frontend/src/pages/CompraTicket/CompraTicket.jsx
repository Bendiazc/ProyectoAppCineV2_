import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/navBar'
import styles from './CompraTicket.module.css'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import RadioFunction from '../../components/RadioButtonsFuncion/RadioFunction.jsx'
import CantidadTickets from '../../components/TablaCantidadTicket/CantidadTickets.jsx'
import ResumenCompra from '../../components/ResumenCompra/ResumenCompra.jsx'
import Modal from '../../components/Modal/Modal.jsx'
import ButacasSala from '../../components/ButacasSala/ButacasSala.jsx'
import TicketResumen from '../../components/TicketResumen/ticketResumen.jsx'
import { ThemeProvider, createTheme } from '@mui/system';

const CompraTicket = () => {

  const [movieTitle, setMovieTitle] = useState("")
  const [infoMovie, setInfoMovie] = useState([])
  const [infoDeRadioButtons ,setInfoDeRadioButton] = useState(null)
  const [infoCantidadTickets, setInfoCantidadTickets] = useState(null)
  const [cancelCompra, setCancelCompra] = useState(false)
  const [ventanaModal , setVentanaModal] = useState(false)
  const [continuar , setContinuar] = useState(0)
  // const [cerrarModal, setCerrarModal] = useState(false)
  // const [continuar2 , setContinuar2] = useState(false)

  const [volver, setVolver] = useState(1)
  const [listaSeleccionadas, setListaSeleccionadas] = useState([])
  const [numeroTotalTickets, setNumeroTotalTickets] = useState(0)

  //estado para captar la imagen..de paso
  const [imagenTemp, setImagenTemp] = useState("")

  const [objetoDatos ,setObjetoDatos] = useState({
    movieT : "",
    movieImg : "",
    butacas : [],
    horaSala: {},
    tickets:[]
  })

  const navigate = useNavigate()
  const params = useParams()
  const idMovie = params.id;
  const indexMovie = params.idx;

  const callApiMovieInfo = async () => {
    try {
      const result = await axios.get(`https://moviesdatabase.p.rapidapi.com/titles/${idMovie}?info=base_info`, {
        headers: {
          "X-RapidAPI-Key": "538792a512msh4656b20ef83c9d5p1409fejsnd2b7df449eec",
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      });
      const movieTitle = result.data.results.titleText.text;
      const infoTemp = result.data.results
      // console.log(infoTemp);
      setInfoMovie(infoTemp)
      setMovieTitle(movieTitle);
      return movieTitle;

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      callApiMovieInfo();
      let val = localStorage.getItem("isLogged")
      !val && navigate("/")
  }, []);

  

  const salaFuncionMovie = (objetoRadioButtons) => {
    setInfoDeRadioButton(objetoRadioButtons)
  }
  const cantidadTickets = (numeroTickets) => {
    setInfoCantidadTickets(numeroTickets)
  }

  useEffect(() => {
    continuar == 2 && setVolver(3)
    continuar==1 && setVolver(2)
    continuar==0 && setVolver(1)
  }, [continuar])

  // useEffect(() => {
  //   continuar2 && setVolver(3)
  //   // !continuar2 && setVolver(2)
  // }, [continuar2])
  
  const calcularTotalNum= () => {
    return infoCantidadTickets.reduce((total, person) => total + person.num, 0) 
  }

  useEffect(() => {
    infoCantidadTickets&&
    setNumeroTotalTickets(calcularTotalNum())
  }, [infoCantidadTickets])
  

  return (
    <div>
      <NavBar objetoDatos = {objetoDatos} ></NavBar>
      {ventanaModal &&
      <Modal setVentanaModal={setVentanaModal}>
        <div className={styles.modal}>
          <h2>¿Está seguro que desea cancelar su compra?</h2>
          <p>Si cancela la compra se perderá toda la información seleccionada</p> 
          <div>
            <button onClick = {() => setVentanaModal(false)}className={styles.volver}>Volver a mi compra</button>
            <button className={styles.cancelar} onClick={() =>{setCancelCompra(!cancelCompra) ; setVentanaModal(false);navigate("/")}}>Sí,Cancelar</button>
          </div>
        </div>
      </Modal>}
      <div className={styles.bodyHere}>
      <div className={styles.contenedor}>
        
        <div className={styles.Progreso}>
            <button className={styles.regresar} onClick={() => {
              volver==1 &&
              navigate(`/movieInfo/${indexMovie}/${idMovie}`)
              volver==2 &&
              setContinuar(0)
              volver==3 &&
              setContinuar(1)
              }}>

              <img src="/flecha.svg"></img>
              <p>VOLVER</p>
            </button>
            <img  className = {styles.imagenProgreso}src={
              volver === 1 ? "/progreso1.svg" : volver === 2 ? "/progreso2.svg" : volver === 3 ? "/progreso3.svg": ""} alt="imagenprogreso" />
        </div>

         {    !(continuar ==2) &&   
           <div className={styles.salaCantidad}>
            { 
              continuar==0 ?
                <div className={styles.SectoresAll}>
                  <div className={styles.arribatitulo}>
                    <h1>Movie </h1>
                    <h2>{movieTitle}</h2>
                  </div>
                  <div className={styles.espacioFunciones}>
                      <h4>Funciones:</h4>
                      <RadioFunction indiceMovie = {indexMovie} salaFuncionMovie = {salaFuncionMovie}></RadioFunction>
                 </div>  
                  <div className={styles.TablaTitulo}>
                    <h4>Tabla de tarifas:</h4>  
                    <CantidadTickets  cancelCompra = {cancelCompra} cantidadTickets = {cantidadTickets}></CantidadTickets>     
                  </div>
                </div> : 
                  (
                    <div className={styles.espacioButacas}> 
                        <h1>Movie: <span style={{color: "#00AFFE"}}>{movieTitle}</span></h1>
                        <div>
                          <ButacasSala 
                          vsala={infoDeRadioButtons.sala}                           
                          setListaSeleccionadas = {setListaSeleccionadas}
                          numeroTotalTickets={numeroTotalTickets}
                          vhora = {infoDeRadioButtons.checked}
                          setImagenTemp={setImagenTemp}
                          vidMovie={idMovie}></ButacasSala>
                        </div>
                    </div>
                  )         
            }
        </div> }

        { !(continuar ==2) &&  
        <div className={styles.resumenCompra}>
          <ResumenCompra 
            infoButtons = {infoDeRadioButtons}  
            infoTickets = {infoCantidadTickets} 
            prevCancelarCompra = {setVentanaModal}    
            setContinuar = {setContinuar}
            vcontinuar = {continuar}
            listaSeleccionadas={listaSeleccionadas}
            setObjetoDatos={setObjetoDatos}
            ></ResumenCompra>
        </div>}

         {
          continuar ==2 &&  
          <div className={styles.sectorResumen}>
              <TicketResumen objetoDatos = {objetoDatos} imagenTemp={imagenTemp}></TicketResumen>
          </div>
         } 

      </div>
    </div>
    </div>
  )
}

export default CompraTicket
