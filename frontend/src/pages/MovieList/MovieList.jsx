import React, { useState } from 'react'
import NavBar from '../../components/NavBar/navBar'
import CarouselMovies from '../../components/CarouselMovies/carouselMovies'
import SliderMovies from '../../components/SliderMovies/SliderMovies'

const MovieList = () => {
  const [yesNoLogged, setYesNoLogged] = useState(false)
  
  return (
    <div>
      <NavBar setYesNoLogged={setYesNoLogged}></NavBar>
      <SliderMovies></SliderMovies>
      <hr style={{ borderTop: '5px solid white', margin : '0 50px 0 50px' }}></hr>
      <CarouselMovies></CarouselMovies>
    </div>
  )
}

export default MovieList
