import React, { useState } from 'react'
import styles from './Modal.module.css'

const Modal = ({children,setVentanaModal,setVentanaModalResumen,resumen=false}) => {

  const [cerrar, setCerrar] = useState(false)

  return (
    <>
      <div className={styles.overlay}>
          <div className={styles.contenedorModal} style={{width : resumen ? "900px": "500px"}}>

                <div className={styles.botonCerrar} onClick={() => {setVentanaModalResumen(false);setVentanaModal(false)}}>
                  <svg style = {{width : "100%" ,height:"100%"}}xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                  </svg>
                </div>
                {children}

          </div>
      </div>

    </>
  )
}

export default Modal
