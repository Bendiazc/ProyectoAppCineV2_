import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './Login.module.css'
import backgroundImage  from '/sala.jpg'
import { useNavigate ,Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios'



const theme = createTheme({
  // Personaliza el fondo
  palette: {
    background: {
      default: 'black'
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          padding: 0
        },
        html: {
          height: '100%', // Ajusta según tus necesidades
        },
        '#root': {
          height: '100%', // Ajusta según tus necesidades
        },
      },
    },
  },
});

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [camposVacios, setCamposVacios] = useState([false, false]);
  const navigate = useNavigate();



  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };


  const [estado, setEstado] = useState("")

  const loginUser = async() =>{
    let camposVaciosTemp = [];
    if (email === "" || email == null) camposVaciosTemp[0] = true;
    else camposVaciosTemp[0] = false;

    if (password === "" || password == null) camposVaciosTemp[1] = true;
    else camposVaciosTemp[1] = false;

    setCamposVacios([...camposVaciosTemp]);

    const hayAlgunVacio = camposVaciosTemp.some((elemento) => elemento === true);

    if (hayAlgunVacio) 
      return;
    

    try {
      var obj = {
        email: email,
        password: password,
      };
  
      let result = await axios.post("http://localhost:8050/api/user/login", obj);
      //console.log(result); // data:true => registroExitoso , data:false => registroFallido

      // localStorage.setItem("name",result.data.name)
      // localStorage.setItem("email",result.data.email)

      if (result.data == false) {
        alert("el email o contraseña es incorrecta");
        return;
      }

      localStorage.setItem("idUser",result.data.id)
      localStorage.setItem("type",result.data.type)
      localStorage.setItem("isLogged",true)
      alert("Login Exitoso")

      let yesNoMovieInfo = localStorage.getItem("deMovieInfo");
      yesNoMovieInfo !== null
        ? (navigate(`/buyTicket${yesNoMovieInfo}`), localStorage.removeItem("deMovieInfo"))
        : navigate("/");
      
    } catch (error) {
      alert(`El error es : ${error}`)
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
    <img src="/sala1.png" className={styles.imgFondo}></img>
    <div className={styles.contenedorLogin} >
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xxs" style={{ backgroundColor: 'transparent' }} >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'info.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              error={camposVacios[0] ? true : false}
              helperText={camposVacios[0] && "Required field."}
              required
              fullWidth
              // id="email"
              label="Email Address"
              // name="email"
              autoComplete="email"
              onChange={(e) => {
                setEmail(e.target.value);
                setCamposVacios([false, camposVacios[1]]);
              }}
              value={email}
            />
            <TextField
              margin="normal"
              error={camposVacios[1] ? true : false}
              helperText={camposVacios[1] && "Required field."}
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setCamposVacios([camposVacios[0], false]);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={loginUser}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              <Link
                to="/"
                variant="body2"
                onClick={() => {
                  if (localStorage.getItem("deMovieInfo") !== null) {
                    localStorage.removeItem("deMovieInfo");
                  }
                }}
              >
                Go to Home
              </Link>
              </Grid>
              <Grid item>
                <Link to = "/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box sx={{ mt: 8, mb: 4 }}>
          
          <Typography variant="body2" color="text.secondary" align="center">
            <img src = '/zyro-image-2.png' style={{width :  "250px"}}></img>
            {/* {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
              Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'} */}
          </Typography>
        </Box>
      </Container>
      </ThemeProvider>
    </div>
  </>
  );
}

export default Login
