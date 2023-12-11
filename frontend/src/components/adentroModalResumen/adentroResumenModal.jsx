import React, { useContext, useEffect, useState } from 'react'
import styles from './adentroResumenModal.module.css'

import {formatoHoraFunction} from '../../funcionesJS/formatoHoraFuncion.js'
import {formatDate} from '../../funcionesJS/formatoFecha.js'
import ButacasContext from '../../context/butacasContext.jsx'
import ProductContext from '../../context/productContext.jsx'
import TarjetaResumen from '../TarjetaResumen/tarjetaResumen.jsx'


const AdentroResumenModal = ({objetoDatos,continuar,ventanaModalResumen,setContinuar,setVentanaModalResumen}) => {

  const {products} = useContext(ProductContext)

  const [imagen,setImagen] = useState("")
  // const [productosLista , setProductosLista] = useState([])

  const [datosTodo , setDatosTodo] = useState({})
  const [imgBase64, setImgBase64] = useState(null)
  const [canvash, setCanvash] = useState(null)

  const {imagenTemp} = useContext(ButacasContext) 

  // useEffect(() => {
  //   setImagen(imagenTemp)
  //   // console.log(imagenTemp+"111111111");
  // }, [imagenTemp])

  // useEffect(()=>{
  //   products&& setProductosLista(products)
  // },[products])

  const calcularTotalNum= () => {
    return datosTodo.tickets && datosTodo.tickets.reduce((total, person) => total + person.num, 0) 
  }

  useEffect(() => {
    setDatosTodo(objetoDatos);
    console.log(objetoDatos.movieT);
  }, [objetoDatos])

  const calcularTotalPrecio = () => {
    return datosTodo.tickets && datosTodo.tickets.reduce((total, person) => total + person.price * person.num, 0).toFixed(2)  
  }

  const subTotalProductosPrecio = () => {
    let suma = 0;
    products.map(item => {
      suma = suma + item.precio * item.cantidad;
      return null;  // Es necesario devolver algo en la función de map
    });
    return suma;
  }
  
  
  return (
    <div style={{width : "100%"}}>
      <div className={styles.contenedorTodo}>      
        <div id = "SectorResumen" className={styles.SectorResumen}>
          <img src={datosTodo && datosTodo.movieImg}  alt = "Imagen Pelicula"></img>
          <div className={styles.centroInfo}>
              <h3>{datosTodo.movieT}</h3>
              <div className={styles.infoDos}>
                <p>LUGAR</p> 
                <p> {datosTodo.horaSala && 
                "Sala " + datosTodo.horaSala.sala + "  -  " + formatoHoraFunction(datosTodo.horaSala.checked)}</p>
              </div>
              <div className={styles.infoDos}>
                <p>CANTIDAD Y TIPO DE ENTRADAS </p> 
                  <div className={styles.spaceAsientos}>
                    {datosTodo.tickets && datosTodo.tickets.map((val,idx) => 
                      datosTodo.tickets.length -1 ===idx ?
                      <p key={val.person}><span style={{fontWeight:"bold"}}>{val.num}</span>{` ${val.person}`}</p> : 
                      <p key={val.person}><span style={{fontWeight:"bold"}}>{val.num}</span>{` ${val.person} /`}</p>)
                    }
                    {/* {calcularTotalNum()>1 ?
                    <p>{`(${calcularTotalNum()} Tickets)`}</p>: <p>{`(${calcularTotalNum()} Ticket)`}</p>} */}
                  </div>
              </div>
              <div className={styles.infoDos}>
                <p>BUTACAS SELECCIONADAS </p> 
                  <div className={styles.spaceAsientos}>
                    { datosTodo.butacas&&
                      datosTodo.butacas.map((butaca, idx)  => 
                        datosTodo.butacas.length - 1 === idx ? (
                          <p key={idx}>{`${butaca}`}</p>
                        ) : (
                          <p key={idx}>{`${butaca} -`}</p>
                        )                      
                        )
                    }
                  </div>
              </div>
              <div className={styles.infoDos}>
                <p>FECHA</p> 
                <p>{formatDate(new Date())}</p>
              </div>
          </div>
          <div className={styles.spaceButacas}>

          <h3>Distribucion de Butacas</h3>
            {imagenTemp && <img src={imagenTemp} alt="fbefb" />}
          </div>         
      </div>
      <h5><span>Subtotal:</span> Entradas {calcularTotalNum()>1 ?
                    `(${calcularTotalNum()} Tickets)`: `(${calcularTotalNum()} Ticket)`} - <span>S/{calcularTotalPrecio()}</span></h5>   
      <h2>Dulcería</h2>  
      <div className={styles.sectorTarjetas}>
          <div className={styles.espacioProductoss}>
          {
            products.map((item, index) => (
                <TarjetaResumen item = {item} 
                                key={index}
                                index = {index} 
                                vcontinuar = {continuar}
                                ventanaModalResumen={ventanaModalResumen}
                                ></TarjetaResumen>
            ))
          }       
        </div>      
      </div>
      
      <div className={styles.subTot}>
        <h5><span>Subtotal:</span> Dulceria - <span>S/{subTotalProductosPrecio().toFixed(2)}</span></h5> 
        <h3><span>TOTAL: </span> S/{(subTotalProductosPrecio()+parseInt(calcularTotalPrecio())).toFixed(2)} </h3>
      </div>

    </div>
          <button className={styles.comprarbtn} onClick={()=>{setContinuar(3);setVentanaModalResumen(false)}}>Comprar</button>
    </div>

  )
}

export default AdentroResumenModal