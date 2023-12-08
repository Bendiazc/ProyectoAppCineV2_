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
import styles from './Register.module.css'
import { useNavigate ,Link } from 'react-router-dom';
import { spacing } from '@mui/system';
import axios from "axios";

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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

const Register = () => {

  const [fullName , setFullName] = useState("");
  const [lastName , setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [estado, setestado] = useState(false)
  const [campoVacio1, setCampoVacio1] = useState([false,false,false,false])

  const navigate = useNavigate()
  
  const registerUser = async() => {

      let camposVaciosTemp = [];
      if (fullName === "") camposVaciosTemp[0] = true;
      else camposVaciosTemp[0] = false;  
      if (email === "") camposVaciosTemp[1] = true;
      else camposVaciosTemp[1] = false;  
      if (password === "") camposVaciosTemp[2] = true;
      else camposVaciosTemp[2] = false;  
      if (confirmPassword === "") camposVaciosTemp[3] = true;
      else camposVaciosTemp[3] = false;  

      setCampoVacio1([...camposVaciosTemp]);

      const hayAlgunVacio = camposVaciosTemp.some( (elemento) => elemento === true);

      if (hayAlgunVacio) 
      return;
      
      if(password != confirmPassword) { 
          alert("Las contraseñas no son iguales"); 
          return;
      }

      try {
          let userData = {
            "fullName": fullName,
            "email": email,
            "password": password,
            "confirmPassword": confirmPassword
          };

          let response = await axios.post(
            "http://localhost:8050/api/user/register",userData);

          if(response.status !=200){
              alert("hubo un error") 
              return          
          } 
          alert("se registro correctamente")
          navigate("/login");
      } catch (error) {
          console.log(error);
          alert(error.response.data.message);
      }
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };



  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <> 
        <img src="/sala2.png" className={styles.imgFondo}></img>
        <div className={styles.contenedorLogin} >
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xxs"  sx={{ pt: 0}} style={{ backgroundColor: 'transparent' }} >
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign Up
                  </Typography >
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                    <TextField
                      error={campoVacio1[0]? true : false}
                      helperText={campoVacio1[0] && "Required field."}
                      margin="normal"
                      required
                      fullWidth
                      id="fullName"
                      label="Full Name"
                      name="fullName"
                      autoComplete="fullName"
                      value={fullName}
                      onChange={(e)=>{setFullName(e.target.value)
                                      setCampoVacio1([false,campoVacio1[1],campoVacio1[2],campoVacio1[3]])}}
                    />

                    <TextField
                      error={campoVacio1[1] ? true : false}
                      helperText={campoVacio1[1] && "Required field."}
                      margin="normal"
                      required
                      fullWidth
                      value={email}
                      type="email"
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(e)=>{setEmail(e.target.value)
                                      setCampoVacio1([campoVacio1[0],false,campoVacio1[2],campoVacio1[3]])}}
                    />
                    <TextField
                      error={campoVacio1[2] ? true : false}
                      helperText={campoVacio1[2] && "Required field."}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      value={password}
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      onChange={(e)=>{setPassword(e.target.value)
                                      setCampoVacio1([campoVacio1[0],campoVacio1[1],false,campoVacio1[3]])}}
                      autoComplete="current-password"
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
                    <TextField
                      error={campoVacio1[3] ? true : false}
                      helperText={campoVacio1[3] && "Required field."}
                      margin="normal"
                      required
                      fullWidth
                      value={confirmPassword}
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="current-password"
                      onChange={(e)=>{setConfirmPassword(e.target.value)
                                      setCampoVacio1([campoVacio1[0],campoVacio1[1],campoVacio1[2],false])}}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={registerUser}
                    >
                      Sign Up
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
                        <Link to = "/Login" variant="body2">
                          {"I have an account - Sign in"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Box sx={{ mt: 8, mb: 4 }}>
                  
                  <Typography variant="body2" color="text.secondary" align="center">
                    <img src = '/zyro-image-2.png' style={{width :  "250px"}}></img>
                  </Typography>
                </Box>
              </Container>
              </ThemeProvider>
            </div>
    </>
  )
}

export default Register
