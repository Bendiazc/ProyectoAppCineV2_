import React, { useEffect } from 'react'
import styles from './navBar.module.css'
import { Link , useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const NavBar = ({objetoDatos} ) => {

  const [yesNoSelected, setYesNoSelected] = useState(null)
  const [name, setName] = useState("")


  useEffect(() => {
    let isLogged = localStorage.getItem("isLogged")
    let user = localStorage.getItem("name")
    let typeUser = localStorage.getItem("")

    // console.log(isLogged);
    setYesNoSelected(isLogged)
    setName(user)
  }, []);

  const getUser = async () => {
    try {
        let responseMovie = await axios.get("http://localhost:8050/api/user/getOne/"+localStorage.getItem("idUser"))
        setName(responseMovie.data.fullName)
    } catch (error) {
        alert(error)
    }
  }

  useEffect(() => {
    localStorage.getItem("idUser") &&
    getUser();
  }, []);

  const navigate = useNavigate()

  
  const  logOut = () => {
    localStorage.removeItem("isLogged")
    localStorage.removeItem("idUser")
    localStorage.removeItem("type")
    setYesNoSelected(false);
    navigate("/")
  }
  return (
      <nav className={`navbar navbar-expand-lg border-body ${styles.customClassNav} `}>        
      {/* <nav className={`navbar navbar-expand-lg bg-dark border-body ${styles.customClassNav} `}>         */}
        <div className="container-fluid">
          <img src="/zyro-image-2.png" className = {styles.imgLogo} alt="Logo" onClick={()=>navigate("/") }/>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item" >
                <a className="nav-link active" style = {{color: "white"}} aria-current="page" href="#" >Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" style = {{color: "white"}}> Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style = {{color: "white"}}>
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li> 
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>*/}
            </ul>
            <form className={styles.sectorDerecha} role="search">
              { yesNoSelected &&
                <>
                  <p>¡Bienvenido {name}!</p>
                  <button onClick={() => navigate("/userTickets")} className={styles.BtnNav} type="submit">Mis entradas</button>
                  <button onClick={logOut} className={styles.BtnNav}>Log Out</button>
                </>
              }
              { !yesNoSelected&&
                <>
                  <p>¡Bienvenido!</p>
                  <button onClick={() => navigate("/Login")} className={styles.BtnNav}>Iniciar Sesion</button>
                </>
              }
            </form>
          </div>
        </div>
      </nav>
  )
}

export default NavBar
