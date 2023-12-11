import React, { useContext, useEffect, useState } from 'react'
import styles from './tarjetaResumen.module.css'
import ProductContext from '../../context/productContext';

const TarjetaResumen = ({item,index,vcontinuar,setPrecioTotalProductos,ventanaModalResumen}) => {

  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(null);
  
  const { products, handleListProducts } = useContext(ProductContext);

  // useEffect(() => {
  //   setPrecioTotalProductos
  // }, [item])
  

  /*==========IMPORTANTE============*/ 
  useEffect(() => {
    const existingProduct = products.find((product) => product.name === name);

    if (existingProduct) {
      // Si el producto ya existe, actualiza la cantidad
      setCantidad(existingProduct.cantidad);
    } else {
      // Si el producto no existe, establece la cantidad en 0
      setCantidad(0);
    }
  }, [products, name]);
/*==================================*/ 

  const handleAumentar = () => {
    setCantidad(cantidad + 1);

    const existingProduct = products.find((product) => product.name === name);

    if (existingProduct) {
      // Si ya existe, actualizo la cantidad
      const updatedProducts = products.map((product) =>
        product.name === name ? { ...product, cantidad: product.cantidad + 1 } : product
      );
      handleListProducts(updatedProducts);
    } else {
      // Si no existe, lo agrego al arreglo
      handleListProducts([...products, { name, url, description, cantidad: 1, precio, type: item.type }]);
    }
  };

  const handleReducir = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);

      const existingProduct = products.find((product) => product.name === name);

      if (existingProduct) {
        // Si  ya existe, actualizo la cantidad
        const updatedProducts = products.map((product) =>
          product.name === name ? { ...product, cantidad: product.cantidad - 1 } : product
        );
        handleListProducts(updatedProducts.filter((product) => product.cantidad > 0));
      }
    }
  };

  useEffect(() => {
    setUrl(item.url);
    setName(item.name);
    setDescription(item.description);
    setPrecio((item.precio));
  }, [item]);


  return (
    <div key={index} className={styles.carritoProductos}>
      <div className={styles.ImagenTarjetaResumen}>
        <img src={item.url}></img>
      </div>
      <div className={styles.CategoryName}>
        <p>{item.type}</p>
        <p>{item.name}</p>
      </div>
      <div className={styles.PrecioEdit}>
          <div className={styles.seccionBotones}>
            {!ventanaModalResumen?
              <>
              <button 
                className={`${styles.BtnSec} ${vcontinuar === 2 ? styles['vcontinuar2'] : ''}`} 
                onClick={handleReducir} 
                disabled ={vcontinuar!=2 ? true : false}
                style={{ cursor: vcontinuar === 2 ? 'pointer' : 'not-allowed' }} >
                -
              </button>
              <p className={styles.pSecBotones}>{item.cantidad}</p>
              <button 
                className={`${styles.BtnSec} ${vcontinuar === 2 ? styles['vcontinuar2'] : ''}`}
                onClick={handleAumentar} 
                disabled ={vcontinuar!=2 ? true : false}
                style={{ cursor: vcontinuar === 2 ? 'pointer' : 'not-allowed' }} >
                +
              </button>
              </> :
              <p style={{margin: "0px"}}>Cant: {item.cantidad}</p>
            }
          </div>
          <h4>S/ {(item.precio*item.cantidad).toFixed(2)}</h4>       
      </div>
  </div>
  )
}

export default TarjetaResumen