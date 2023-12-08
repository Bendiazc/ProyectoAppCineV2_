import React, { useEffect } from 'react'
import styles from './ticketResumen.module.css'
import { useState } from 'react';
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import {formatoHoraFunction} from '../../funcionesJS/formatoHoraFuncion.js'
import {formatDate} from '../../funcionesJS/formatoFecha.js'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const TicketResumen = ({imagenTemp,objetoDatos}) => {

  const [datosTodo , setDatosTodo] = useState({})
  const [imgBase64, setImgBase64] = useState(null)
  const [canvash, setCanvash] = useState(null)

  useEffect(() => {
    // console.log(objetoDatos);
    setDatosTodo(objetoDatos);
  }, [objetoDatos])
  
  // console.log(calcularTotalPrecio());

  const params = useParams()
  // console.log(params.id);
  const navigate = useNavigate()
  const idMovie = params.id;


  const calcularTotalNum= () => {
    return datosTodo.tickets && datosTodo.tickets.reduce((total, person) => total + person.num, 0) 
  }

  useEffect(() => {
    setImagen(imagenTemp)
    // console.log(imagenTemp+"awdawdawdawdawdawda");
  }, [imagenTemp])
  
  const [imagen, setImagen] = useState('');

  //Captura Imagen
  const capturaImagen = async() => {

    const input = document.getElementById("SectorResumen");
    if (!input) {
      console.error("No se encontró el elemento con el id 'SectorResumen'");
      return;
    }

    const canvas = await html2canvas(input, 
      { logging: true, 
        letterRendering: 2,
         useCORS: true});

    // Verificar si el lienzo se generó correctamente
    if (!canvas) {
      console.error("Error al generar el lienzo");
      return;
    }
    setCanvash(canvas)
    const imgData = canvas.toDataURL('image/png');
    // console.log(imgData);
    setImgBase64(imgData)
  }

  useEffect(() => {
    capturaImagen()
  }, [imgBase64,imagen])
  //Para pdf
  const exportPDF = async () => {

    try {
   
      const imgWidth = 250; // Ancho de A4 en mm
      const imgHeight = (canvash.height * imgWidth) / canvash.width;

      // const imgLogo = canvas.toDataURL('/zyro-image-2.png')
      // PDF
      const pdf = new jsPDF('l', 'mm', 'a4');
      pdf.setDrawColor("#0066FF"); // Azul
      pdf.setFillColor("#0066FF"); // Azul
      pdf.setLineWidth(2); // Grosor de la línea
      pdf.rect(5, 5, pdf.internal.pageSize.width - 10, pdf.internal.pageSize.height - 10);
      pdf.addImage('/zyro-image-2.png', 'PNG', 95, 30, 100, 20);
      pdf.addImage(imgBase64, 'PNG', 22, 70, imgWidth, imgHeight);
      pdf.save("pdfCompra.pdf");
    } catch (error) {
      console.error('Error al generar el lienzo:', error);
    }
  };

  const calcularTotalPrecio = () => {
      return datosTodo.tickets.reduce((total, person) => total + person.price * person.num, 0).toFixed(2)  
  }

  const registerTicket = async() => {

      var dataTicket = {
        "idMovie": params.id,
        "sala": datosTodo.horaSala.sala,
        "funcion": datosTodo.horaSala.checked,
        "date": formatDate(new Date()),
        "butacas": datosTodo.butacas,
        "idUser": localStorage.getItem("idUser"),
        "captura": imgBase64
      }
      
      try { 
          let result = await axios.post("http://localhost:8050/api/ticket/register",dataTicket)
          if (result.status === 200){
            //  console.log(result);
             navigate("/")
          } 
        }catch (error) {
          alert(error.response.data.Mensaje)
        }
  }
  
  const goToMovies = () => {
  navigate("/movies")
  }

  useEffect(() => {
  let isLogged = localStorage.getItem("isLogged")
  if (isLogged==null){
    navigate("/")
  }
  }, []);


  const Comprar = () => {
    registerTicket()
    exportPDF()
  }

  return (
    <div className={styles.cuadroTicket}>
        <div className={styles.SectorTexto}>
          <h1>Confirmacion de la Compra</h1>
          <p>Confirme los datos ingresados para efectuar la compra</p>
        </div>

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
                      <p key={val.person}>{`${val.num} ${val.person}`}</p> : 
                      <p key={val.person}>{`${val.num} ${val.person} -`}</p>)
                    }
                    {calcularTotalNum()>1 ?
                     <p>{`(${calcularTotalNum()} Tickets)`}</p>: <p>{`(${calcularTotalNum()} Ticket)`}</p>}
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
          {imagen && <img src={imagen} alt="fbefb" />}
          </div>
        </div>
        <div className={styles.SectorBotonTotal}>
          <p>¡Tu comprobante de compra se descarga en formato PDF después de completar tu pedido!</p>
          <div className={styles.SectorTotal}>
            <p>TOTAL</p>
            <p>S/ {datosTodo.tickets && calcularTotalPrecio()} </p> 
          </div>
          <button onClick={Comprar}>Comprar</button>
        </div>
        
    </div>
  )
}

export default TicketResumen
