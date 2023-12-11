import React, {useContext, useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/navBar'
import styles from './CompraTicket.module.css'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import RadioFunction from '../../components/RadioButtonsFuncion/RadioFunction.jsx'
import CantidadTickets from '../../components/TablaCantidadTicket/CantidadTickets.jsx'
import ResumenCompra from '../../components/ResumenCompra/ResumenCompra.jsx'
import Modal from '../../components/Modal/Modal.jsx'
import ButacasSala from '../../components/ButacasSala/ButacasSala.jsx'
import CompraProductos from '../../components/CompraProductos/CompraProductos.jsx'
import ProductContext, { ProductProvider } from '../../context/productContext.jsx'
import { EntradasProvider } from '../../context/entradasContext.jsx'
import { ButacasProvider } from '../../context/butacasContext.jsx'
import { VolverContinuarProvider } from '../../context/volverContinuarContext.jsx'
import AdentroResumenModal from '../../components/adentroModalResumen/adentroResumenModal.jsx'

const CompraTicket = () => {

  const [movieTitle, setMovieTitle] = useState("")
  const [infoMovie, setInfoMovie] = useState([])
  const {products} = useContext(ProductContext)
  
  const [cancelCompra, setCancelCompra] = useState(false)
  const [ventanaModal , setVentanaModal] = useState(false)
  const [ventanaModalResumen, setVentanaModalResumen] = useState(false)

  const [continuar , setContinuar] = useState(0)
  const [volver, setVolver] = useState(1)

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

  
  useEffect(() => {

    continuar == 3 && setVolver(4)
    continuar == 2 && setVolver(3)
    continuar==1 && setVolver(2)
    continuar==0 && setVolver(1)
  }, [continuar])

  return (
    <div>
      <ButacasProvider>
      {/* <ProductProvider> */}
      <NavBar objetoDatos = {objetoDatos} ></NavBar>
      {ventanaModal &&
      <Modal setVentanaModal={setVentanaModal} setVentanaModalResumen={setVentanaModalResumen}>
        <div className={styles.modal}>
          <h2>¿Está seguro que desea cancelar su compra?</h2>
          <p>Si cancela la compra se perderá toda la información seleccionada</p> 
          <div>
            <button onClick = {() => setVentanaModal(false)}className={styles.volver}>Volver a mi compra</button>
            <button className={styles.cancelar} onClick={() =>{setCancelCompra(!cancelCompra) ; setVentanaModal(false);navigate("/")}}>Sí,Cancelar</button>
          </div>
        </div>
      </Modal>}

      {ventanaModalResumen &&
      <Modal setVentanaModalResumen={setVentanaModalResumen} setVentanaModal={setVentanaModal} resumen = {true}>
        <div className={styles.modal2}>
          <h2>Confirmacion de la compra</h2>
          <p>Confirme los datos ingresados para efectuar la compra</p> 
          <AdentroResumenModal objetoDatos={objetoDatos} 
                               continuar={continuar} 
                               ventanaModalResumen={ventanaModalResumen} 
                               setContinuar={setContinuar}
                               setVentanaModalResumen={setVentanaModalResumen}></AdentroResumenModal>
        </div>
      </Modal>}
      
      <div className={styles.bodyHere}>
      
        <EntradasProvider>
          
            <VolverContinuarProvider>
              <div className={styles.contenedor} style={{ width: continuar === 3? "55%" : "85%" }}>       
                <div className={styles.Progreso}>
                    <button className={styles.regresar} onClick={() => {
                      volver==1 &&
                      navigate(`/movieInfo/${indexMovie}/${idMovie}`)
                      volver==2 &&
                      setContinuar(0)
                      volver==3 &&
                      setContinuar(1)
                      volver==4 &&
                      setContinuar(2)
                      }}>

                      <img src="/flecha.svg"></img>
                      <p>VOLVER</p>
                    </button>
                    <img  className = {styles.imagenProgreso}src={
                      volver === 1 ? 
                      "/progreso1v.svg" 
                      : volver === 2 ? 
                      "/progreso2v.svg" 
                      : volver === 3 ? 
                      "/progreso3v.svg" 
                      : volver === 4 ? 
                      "/progreso4v.svg" 
                      : "" } alt="imagenprogreso" />
                </div>

                {    !(continuar ==3) &&   
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
                              <RadioFunction indiceMovie = {indexMovie}></RadioFunction>
                        </div>  
                          <div className={styles.TablaTitulo}>
                            <h4>Tabla de tarifas:</h4>  
                            <CantidadTickets  cancelCompra = {cancelCompra}></CantidadTickets>     
                          </div>
                        </div> : continuar==1?
                          
                            <div className={styles.espacioButacas}> 
                                <h1>Movie: <span style={{color: "#00AFFE"}}>{movieTitle}</span></h1>
                                <div>
                                  <ButacasSala                          
                                    vidMovie={idMovie}></ButacasSala>
                                </div>
                            </div>
                          :  
                          <div >
                            <div className={styles.espacioButacas}>
                                <h1>Movie: <span style={{color: "#00AFFE"}}>{movieTitle}</span></h1>
                            </div>  
                            <CompraProductos></CompraProductos>
                          </div>                
                    }
                </div> }

                { !(continuar ==3) &&  
                <div className={styles.resumenCompra}>
                  <ResumenCompra 
                    prevCancelarCompra = {setVentanaModal}    
                    setContinuar = {setContinuar}
                    vcontinuar = {continuar}
                    setObjetoDatos={setObjetoDatos}
                    setVentanaModalResumen={setVentanaModalResumen}
                    ></ResumenCompra>
                </div>}

                { 
                  continuar ==3 &&  
                  <div className={styles.sectorPago}>
                      {/* <TicketResumen objetoDatos = {objetoDatos}></TicketResumen> */}
                      <h1>Confirmacion de la Compra</h1>
                      <p>Confirme e Ingrese los datos  para efectuar la compra</p>
                      <h4>Movie: <span style={{color: "#00AFFE"}}>{movieTitle}</span></h4>
                      <img className = {styles.imagenPeli}src={infoMovie.primaryImage.url} alt="imagenPeli"></img>
                      <button className={styles.botonComprar}
                              onClick={ () => setVentanaModalResumen(true)}
                      >Ver Resumen de la Compra</button>

                      <div className={styles.pagoPaypal}>


                        {/* Codigo o Componente*/}
                        
                        {/* Em el Objeto {products} tienes la info de los prodcutos de dulceria seleeccionados con el precio
                            En el objeto {objetoDatos} tienes la info (en el campo tickes) de la cantidad y precio de las entradas seleccionadas

                            Si tu componenete requiere esos datos, de aca solo le pasas ambos como props
                            <Componente products={products} objetoDatos={objetoDatos} ></Commponente>*/}

                      </div>
                      <p>*¡Tu comprobante de compra se descarga en formato PDF después de completar tu pedido!</p>
                  </div>
                } 

              </div>
            </VolverContinuarProvider>
        </EntradasProvider>             
      </div>
    {/* </ProductProvider> */}
    </ButacasProvider>
    </div>
  )
}

export default CompraTicket
