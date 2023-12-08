import React, { useEffect, useState} from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import styles from './carouselMovies.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {formatSecondsToHoursMinutes} from '../../funcionesJS/formatoDuracion.js'

const apikeyMovie1 = import.meta.env.VITE_API_KEY_MOVIE1

const CarouselMovies = ({ yesNoClick = () => {} }) => {

  const [imageUrls, setImageUrls] = useState([])
  const [dataFilter, setDataFilter] = useState([])
  const navigate = useNavigate() 
  const callApi = async () => {

    try {
      const response = await axios.get("https://moviesdatabase.p.rapidapi.com/titles/random?startYear=2022&endYear=2025&limit=50&list=top_boxoffice_200&info=base_info", {
        headers: {
          "X-RapidAPI-Key": apikeyMovie1,
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      });
  
      const dataTemp = response.data.results

      const dataTempOrdenado = ordenarPorTitulo(dataTemp)   

      const dataFilterTemp = dataTempOrdenado.filter(url => 
          url.primaryImage != null && 
          url.runtime != null && 
          url.id != "tt9114286" &&
          url.id != "tt5113044" &&
          url.runtime.seconds>3600 && 
          url.primaryImage.url != null && 
          url.titleType.isSeries != true && 
          url.primaryImage.height > url.primaryImage.width
        ).slice(0, 10);
   
      const imageURLtemp = dataFilterTemp.map(url => url.primaryImage.url);
  
      // console.log(dataFilterTemp);
      setDataFilter(dataFilterTemp)
      setImageUrls(imageURLtemp);
    } catch (error) {
      console.error("Error al llamar a la API:", error);
    }
  };
    const ordenarPorTitulo = (array) => {
      return array.sort((a, b) => {
        const tituloA = a.titleText.text.toUpperCase();
        const tituloB = b.titleText.text.toUpperCase();
    
        if (tituloA < tituloB) {
          return -1;
        }
        if (tituloA > tituloB) {
          return 1;
        }
    
        return 0;
      });
    };

  useEffect(() => {
    callApi()
  }, [])
  
  const [centerImageIndex, setCenterImageIndex] = useState(0);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '340px',
    slidesToShow: 3,
    speed: 200,
    afterChange: (currentSlide) => {
      setCenterImageIndex(currentSlide);
    },
    focusOnSelect: true,

  };

  const containerStyle = {
    backgroundImage: `url(${imageUrls[centerImageIndex]})`,
  };

  const handleMouseEnter = (index) => {
    setHoveredImageIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredImageIndex(null);
  };

  const getInfoMovie = (id,title,index) => {
    // console.log(id);
    // console.log(title);
    // console.log(index);
    navigate("/movieInfo/"+index+"/"+id)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    yesNoClick(true);
  }

  return (
    <div className={styles.containerr} style={containerStyle}>
      <div className={styles.desenfoque}>
        <h1 style={{fontWeight: "bold" , fontStyle : "Italic"}}>Películas en CINECODE</h1>
        <hr style={{ borderTop: '5px solid white' }} />
      <Slider {...settings}>
          {dataFilter.map((data, index) => (
            <div
              id = "box-movie"
              key={index}
              className={`slider-item ${index === centerImageIndex ? styles.centerImage : ''} ${index === hoveredImageIndex ? 'hovered-image' : ''}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className={styles.centeredContent}>
                <img src={data.primaryImage.url} alt={`Image ${index}`} />
                <h2>{data.titleText.text}</h2>
                <p className={styles.duracion}>{data.runtime &&formatSecondsToHoursMinutes(data.runtime.seconds)}</p>
                <p className={styles.fecha}>Estreno: {data.releaseDate.day}/{data.releaseDate.month}/{data.releaseDate.year}</p>
                <button className={styles.comprarTicket} onClick={() => {getInfoMovie(data.id,data.titleText.text,index)}}>Get Info</button>                
              </div>
            </div>
          ))}
        </Slider>  
      </div>

    </div>
  )
}

export default CarouselMovies
