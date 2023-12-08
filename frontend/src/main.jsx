import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import CineApp from './CineApp.jsx'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render( 

  <BrowserRouter>
    <React.StrictMode>
      <CineApp></CineApp>
    </React.StrictMode>
  </BrowserRouter>
)
