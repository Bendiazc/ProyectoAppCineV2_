import styles from './SliderMovies.module.css'
import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {formatSecondsToHoursMinutes} from '../../funcionesJS/formatoDuracion.js'


const apikeyMovie2 = import.meta.env.VITE_API_KEY_MOVIE2

const SliderMovies = () => {

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <img src="/left-arroww.svg" className = {styles.boton}alt="prevArrow" {...props} />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img src="/right-arroww.svg" alt="nextArrow" {...props} />
  );

  const [movieTitle, setMovieTitle] = useState("")
  const [infoMovie, setInfoMovie] = useState([])
  const [imageUrls, setImageUrls] = useState([])
  const [dataFilter, setDataFilter] = useState([])
  const navigate = useNavigate() 
  const callApi = async () => {

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&sort_by=popularity.desc&page=1&primary_release_year=2024&api_key=${apikeyMovie2}`
      );
  
      const dataTemp = response.data.results
      const dataFilterTemp = dataTemp.filter(data => 
          data.backdrop_path != null &&
          data.id != 939243 &&
          data.id != 866398 &&
          data.id != 1034541 &&
          data.id != 653346  &&
          data.id != 823464 
        ).slice(0, 8);
      const imageURLtemp = dataFilterTemp.map(url => ("https://image.tmdb.org/t/p/original"+url.backdrop_path));
  
      // console.log(dataFilterTemp);
      setDataFilter(dataFilterTemp)
      setImageUrls(imageURLtemp);

    } catch (error) {
      console.error("Error al llamar a la API:", error);
    }
  };

  useEffect(() => {
    callApi()
  }, [])
  
  const [centerImageIndex, setCenterImageIndex] = useState(0);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    afterChange: (currentSlide) => {
      setCenterImageIndex(currentSlide);
    },
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
    <div className={styles.ContenedorSlider}>
      {/* <h2>Coming soon</h2> */}
      <h1 style={{fontWeight: "bold"}} >PROXIMOS ESTRENOS</h1>
      {/* <hr style={{ borderTop: '5px solid white', margin: '20px -50px 20px -50px' }}></hr> */}
      <hr style={{ borderTop: '5px solid white'}}></hr>
      <Slider {...settings}>
        {dataFilter.map((data,idx) => (
                <div key = {idx}>
                    <div className={styles.CajaSlider} style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original${data.backdrop_path}')` }}>
                      {/* <h2>{data.original_title}</h2> */}
                        <div key={idx} className={styles.imagenSlider} style={{ backgroundImage: `url('/rectangulo2.svg')`}}>
                            <div className={styles.contenedorSoon}>
                              <h1>{data.original_title}</h1>
                              <p>{data.release_date}</p>
                            </div>
                        </div>
                    </div>               
                </div>
            ))}

      </Slider>
    </div>
  )
}

export default SliderMovies
