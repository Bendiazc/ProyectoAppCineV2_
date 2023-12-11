import { createContext, useEffect, useState } from "react";

const ProductContext = createContext(); //creamos contexto

const ProductProvider = ({ children }) => { //creamos proveedor
  //contenedor que envuelva a todos los componentes necesarios
  const [products, setProducts] = useState([]);

  const handleListProducts = (val) => {
    setProducts(val);
  };

  // useEffect(() => {
  //   console.log(products);
  // }, [products])
  
  const data = { products, handleListProducts }; //valores que se necesitan pasar 
  return <ProductContext.Provider value={data}>{children}</ProductContext.Provider>;
};

export { ProductProvider };

export default ProductContext;
