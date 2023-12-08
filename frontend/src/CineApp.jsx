import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import MovieList from './pages/MovieList/MovieList'
import MovieInfo from './pages/MovieInfo/MovieInfo'
import CompraTicket from './pages/CompraTicket/CompraTicket'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import EntradasUsuarios from './pages/EntradasUsuarios/EntradasUsuarios'


const CineApp = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<MovieList></MovieList>}></Route>
            <Route path='/movieInfo/:idx/:id' element={<MovieInfo></MovieInfo>}></Route>
            <Route path='/buyTicket/:idx/:id' element={<CompraTicket></CompraTicket>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
            <Route path='/userTickets' element={<EntradasUsuarios></EntradasUsuarios>}></Route>
        </Routes>
    </div>
  )
}

export default CineApp
