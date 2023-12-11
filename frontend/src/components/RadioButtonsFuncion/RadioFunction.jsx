import React, { useContext, useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// import styles from './RadioFunction.module.css'
import {formatoHoraFunction} from '../../funcionesJS/formatoHoraFuncion.js'
import styles from './RadioFunction.module.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { pink, yellow } from '@mui/material/colors';
import EntradasContext from '../../context/entradasContext.jsx';


const { palette } = createTheme();
const theme = createTheme({
  palette: {
    pinky: palette.augmentColor({ color: pink }),
    summer: palette.augmentColor({ color: yellow }),
  },
});

const Funciones = [
  [
    { Sala: 1, Hora: 300 },
    { Sala: 4, Hora: 630 },
    { Sala: 1, Hora: 900 }
  ],
  [
    { Sala: 2, Hora: 315 },
    { Sala: 5, Hora: 645 },
    { Sala: 2, Hora: 915 }
  ],
  [
    { Sala: 3, Hora: 330 },
    { Sala: 6, Hora: 700 },
    { Sala: 3, Hora: 930 }
  ],
  [
    { Sala: 1, Hora: 530 },
    { Sala: 4, Hora: 800 },
    { Sala: 1, Hora: 1030 }
  ],
  [
    { Sala: 2, Hora: 545 },
    { Sala: 5, Hora: 815 },
    { Sala: 2, Hora: 1045 }
  ],
  [
    { Sala: 3, Hora: 600 },
    { Sala: 6, Hora: 830 },
    { Sala: 3, Hora: 1100 }
  ],
  [
    { Sala: 1, Hora: 730 },
    { Sala: 4, Hora: 1000 }
  ],
  [
    { Sala: 2, Hora: 745 },
    { Sala: 5, Hora: 1015 }
  ],
  [
    { Sala: 3, Hora: 800 },
    { Sala: 6, Hora: 1030 }
  ],
  [
    { Sala: 4, Hora: 830 },
    { Sala: 1, Hora: 1100 }
  ]
]
const RadioFunction = ({ indiceMovie }) => {

  const {infoDeRadioButtons,handleInfoRadioButtons} = useContext(EntradasContext)

  const [selectedFunction, setSelectedFunction] = useState({
    checked: null,
    sala: null,
  });

  const [funcionesSalas, setFuncionesSalas] = useState(Funciones);

  const handleChange = ({ target }) => {
    setSelectedFunction({ checked: target.value, sala: target.name });
    handleInfoRadioButtons({ checked: target.value, sala: target.name });
    // console.log(target.value, target.name);
  };


  const styles = theme => ({
    radio: {
      '&$checked': {
        color: '#4B8DF8'
      }
    },
    checked: {}
  })


  return (
    <div className={styles.contentRadio}>
      <ThemeProvider theme={theme}>
        <FormControl >
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {funcionesSalas[indiceMovie].map((val, index) => (
              <FormControlLabel
              classes={{root: styles.formControlLabelRoot, label: styles.formControlLabel}}
                key={index}
                value={val.Hora}
                name={val.Sala.toString()}
                control={
                  <Radio
                    color="primary"
                    disableRipple
                    styles={{root: styles.radio, checked: styles.checked}}
                  />
                }
                checked={infoDeRadioButtons && (infoDeRadioButtons.sala == val.Sala && infoDeRadioButtons.checked==val.Hora) ? true : false}
                onChange={handleChange}
                label={formatoHoraFunction(val.Hora)}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </ThemeProvider>
    </div>
  );
};

export default RadioFunction
