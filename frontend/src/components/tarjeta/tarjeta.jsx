import React, { useContext, useEffect, useState } from 'react';
import styles from './tarjeta.module.css';
import ProductContext from '../../context/productContext';

const Tarjeta = ({ item, categoria }) => {
  const { products, handleListProducts } = useContext(ProductContext);

  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(null);

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
/*================================*/ 

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
    setPrecio(item.precio.toFixed(2));
  }, [item]);

  return (
    <div className={styles.tarjeta}>
      <div className={styles.nameImg}>
        <img src={url} alt={name} />
        <h4>{name}</h4>
      </div>
      <p>{description}</p>
      <div>
        <hr className={styles.hrr} />
        <div className={styles.seccionAbajo}>
          <div className={styles.seccionBotones}>
            <button className={styles.BtnSec} onClick={handleReducir}>
              -
            </button>
            <p>{cantidad}</p>
            <button className={styles.BtnSec} onClick={handleAumentar}>
              +
            </button>
          </div>
          <h4>S/ {precio}</h4>
        </div>
      </div>
    </div>
  );
};

export default Tarjeta;
