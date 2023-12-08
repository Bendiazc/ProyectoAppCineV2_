import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/navBar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './EntradasUsuarios.module.css'

const EntradasUsuarios = () => {

  const navigate = useNavigate()
  const [ticketsImg, setTicketsImg] = useState([])

  const getInfoUser = async () => {
    try {
        let response= await axios.get("http://localhost:8050/api/ticket/getTickets/"+localStorage.getItem("idUser"))
        const infoUser = response.data
        // console.log(infoUser);
        setTicketsImg(infoUser)     
        // setButacasReserved(MapeoParaButacasReserved(butacasReservadas))
    } catch (error) {
        alert(error)
    }
  }

  useEffect(() => {
    let val = localStorage.getItem("isLogged")
    !val ? navigate("/") : getInfoUser()
  }, [])
  
  return (
    <>
    <NavBar></NavBar>
    <div className={styles.bodyHere}>
      <div className={styles.contentImages}>
        {       
          ticketsImg &&   
          ticketsImg.map(img => (
            <img key={img.id} src={img.captura} alt={img.alt} />
          ))
        }
      </div>
    </div>
    </>
  )
  
}

export default EntradasUsuarios
