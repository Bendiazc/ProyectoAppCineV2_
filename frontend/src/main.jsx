import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import CineApp from './CineApp.jsx'
import './style.css'
import { EntradasProvider } from './context/entradasContext.jsx'
import { VolverContinuarProvider } from './context/volverContinuarContext.jsx'
import { ProductProvider } from './context/productContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render( 
  <BrowserRouter>
    <React.StrictMode>
      <ProductProvider>
        <CineApp></CineApp>
      </ProductProvider>
    </React.StrictMode>
  </BrowserRouter>
)
