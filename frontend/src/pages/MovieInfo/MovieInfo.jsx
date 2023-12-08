import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player'
import styles from './MovieInfo.module.css'
import {formatSecondsToHoursMinutes} from '../../funcionesJS/formatoDuracion.js'
import {formatDateApi} from '../../funcionesJS/formatoFechaApi.js'
import CarouselMovies from '../../components/CarouselMovies/carouselMovies.jsx';
import NavBar from '../../components/NavBar/navBar.jsx';
import Modal from '../../components/Modal/Modal.jsx'

const apikeyMovie1 = import.meta.env.VITE_API_KEY_MOVIE1
const apikeyYt = import.meta.env.VITE_API_KEY_YT

const MovieInfo = () => {
  const navigate = useNavigate()
  const params = useParams();
  const idMovie = params.id;
  const indexMovie = params.idx;
  const [videos, setVideos] = useState([]);
  const [movieTitle, setMovieTitle] = useState("")
  const [infoMovie, setInfoMovie] = useState([])
  const [showTriler, setShowTriler] = useState(false)   
  const [datoCarousel, setDatoCarousel] = useState(false)
  const [ventanaModal , setVentanaModal] = useState(false)

  // useEffect(() => {
  //   let isLogged = localStorage.getItem("isLogged")
  //   isLogged ? setVentanaModal(true) : setVentanaModal(false) 
  // }, [])
  
  const callApiMovieInfo = async () => {
      try {
        const result = await axios.get(`https://moviesdatabase.p.rapidapi.com/titles/${idMovie}?info=base_info`, {
          headers: {
            "X-RapidAPI-Key": apikeyMovie1,
            "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
          },
        });
        const movieTitle = result.data.results.titleText.text;
        const infoTemp = result.data.results
        console.log(infoTemp);
        setInfoMovie(infoTemp)
        // console.log(movieTitle);
        setMovieTitle(movieTitle);
        return movieTitle;
      } catch (error) {
        console.log(error);
      }
    };

    const callYouTubeApi = async (movieTitle) => {
      try {
        const result = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${apikeyYt}&q=${movieTitle} movie trailer&maxResults=6`);
        console.log(result.data.items);
        const urlsTemp = result.data.items.map(video => video.id.videoId)
        setVideos(urlsTemp)
        console.log(urlsTemp);

      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      const fetch= async () => {
        const movieTitle = await callApiMovieInfo();
        callYouTubeApi(movieTitle);
      };

      fetch();
    }, [idMovie]);

    const goToBuyTicket = () => {
        let ask = localStorage.getItem("isLogged")

        ask ?
        navigate(`/buyTicket/${indexMovie}/${idMovie}`) : setVentanaModal(true)
        
        !ask &&
        localStorage.setItem("deMovieInfo",`/${indexMovie}/${idMovie}`)
    }

    useEffect(() => {
      (!ventanaModal ) && localStorage.removeItem("deMovieInfo")
    }, [ventanaModal])
    

    const clickTicket = (valor) => {
        setDatoCarousel(valor)      
    }
  return (
<div>
    <NavBar></NavBar>
    {ventanaModal &&
      <Modal setVentanaModal={setVentanaModal}>
        <div className={styles.modal}>
          <h2>No estás autenticado</h2>
          <p>Para continuar con la seccion de compra, por favor, inicia sesión o crea una cuenta.</p> 
          <div>
            <button className={styles.comprarTickett } onClick={() => navigate("/login")}>Iniciar Sesion</button>
            <button className={styles.comprarTickett }  onClick={() => navigate("/register")}>Registrar</button>
          </div>
        </div>
      </Modal>}
    {
      !showTriler && 
        <div className={styles.imagenArriba} style={{ backgroundImage: `url("https://img.youtube.com/vi/${videos[0]}/maxresdefault.jpg")` }}>
            <div className={styles.imagenArribaEfecto} style={{ backgroundImage: `url("/rectangulo2.svg")` }}>
              <img  onClick = {() => setShowTriler(true)}src="/play.svg" alt="Icono" />
            </div>
         </div> 
    }

    <div className={styles.conteinerInfo}>
      {
        showTriler ? 
        <div className={styles.spaceTriler}>
            <div className={styles.ArribaVideo}>
              <h2>{movieTitle}</h2>
              <img  onClick = {() => setShowTriler(false)}src="/close.svg" alt="Icono" />
            </div>
            <hr />
            <div  className={styles.contenidoVideo}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videos[0]}`}
              width="100%"
              height="100%"
              controls={true}  
              playing={true}    
            />
            </div>
            <button onClick = {goToBuyTicket} className={styles.comprarTickett}>Get Ticket</button>
        </div>:

        <div className={styles.tituloGetTicket}>
          <h1>{movieTitle}</h1>
          <button onClick = {goToBuyTicket} className={styles.comprarTickett}>Get Ticket</button>
        </div> 
      }

      <div className={styles.detallesMovie}>    
        <div className={styles.especificInfo}>
          <p > {infoMovie.runtime?.seconds && formatSecondsToHoursMinutes(infoMovie.runtime.seconds)}</p>
          <p>{formatDateApi(infoMovie.releaseDate)}</p>

        </div>
        <div className={styles.generalInfo}> 
          {infoMovie.plot?.plotText && infoMovie.plot?.plotText.plainText }
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid reiciendis cum ea minus quos voluptas non quasi ex architecto et omnis ab illum, laborum aut voluptates tenetur a nam illo.Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        </div>
      </div>
      <div className={styles.generos}>
          { infoMovie.genres &&
            infoMovie.genres.genres.map(genero => (
              <p>{genero.text}</p>)
          )}
      </div>
      <hr></hr>
      <p className={styles.moreTrailers}>More Trailers and Videos for {movieTitle && movieTitle} </p>
      <div className={styles.extratrailers}>
        {  videos.map(vod => (
            <div key={vod}>
              <ReactPlayer
                // url={vod}
                url={`https://www.youtube.com/watch?v=${vod}`}
                width="400px"
                height="200px"
                controls={true}        
              />
            </div>)) }        
      </div>
      <hr/>    
    </div> 
    <CarouselMovies yesNoClick = {clickTicket}></CarouselMovies>
    {
      datoCarousel && (() => {
        setShowTriler(false);
        setDatoCarousel(false); //No olvidar, porque datoCarousel ya seria True y entraria al if infinitas veces
      })()
    }
  </div>
  )
}

export default MovieInfo
