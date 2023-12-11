import React, { useEffect, useState } from 'react'
import styles from './CompraProductos.module.css'
import axios from 'axios'
import { useStepperContext } from '@mui/material'
import Tarjeta from '../tarjeta/tarjeta'

const CompraProductos = () => {
  const [combos, setCombos] = useState([])
  const [canchita, setCanchita] = useState([])
  const [bebidas, setBebidas] = useState([])
  const [otros, setOtros] = useState([])
  const [elegido , setElegido] = useState(null)

  const [click, setClick] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("combos");

  const CallApi = async() => {
    const response = await axios.get("http://localhost:8050/api/products/get")
    setCombos(response.data[0].combos);
    // console.log(response.data[0].combos);
    setCanchita(response.data[0].canchita);
    setBebidas(response.data[0].bebidas);
    setOtros(response.data[0].otros);
  }

  useEffect(() => {
    CallApi()
  }, [])
  
  useEffect(() => {
    setElegido(combos)
  }, [combos])

  const handleClick = (e) => {
    if(e.target.dataset.name == "combos") setElegido(combos);
    if(e.target.dataset.name == "canchita") setElegido(canchita);
    if(e.target.dataset.name == "bebidas") setElegido(bebidas);
    if(e.target.dataset.name == "otros") setElegido(otros);
    const opcion = e.target.dataset.name;
    setOpcionSeleccionada(opcion);
  };

  return (
    <div className={styles.CompraProductos}>
        <ul className={styles.navCompraProductos}>
        <li
    data-name="combos"
    onClick={handleClick}
    className={`${styles.navitem} ${opcionSeleccionada === "combos" ? styles.selected : ""}`}
  >
    COMBOS
  </li>
  <li
    data-name="canchita"
    onClick={handleClick}
    className={`${styles.navitem} ${opcionSeleccionada === "canchita" ? styles.selected : ""}`}
  >
    POP-CORN
  </li>
  <li
    data-name="bebidas"
    onClick={handleClick}
    className={`${styles.navitem} ${opcionSeleccionada === "bebidas" ? styles.selected : ""}`}
  >
    BEBIDAS
  </li>
  <li
    data-name="otros"
    onClick={handleClick}
    className={`${styles.navitem} ${opcionSeleccionada === "otros" ? styles.selected : ""}`}
  >
    OTROS
  </li>
        </ul>

        <div className={styles.lugarProductos}>
          {
            elegido && elegido.map((item,idx) => 
              <Tarjeta key = {idx+item.name} item = {item} idx = {idx} categoria = {opcionSeleccionada}></Tarjeta>)
          }
        </div>
    </div>
  )
}

export default CompraProductos