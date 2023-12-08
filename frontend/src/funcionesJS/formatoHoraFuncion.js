export const formatoHoraFunction = (time) => {
  const unoDosInicial = Math.floor(time/100)
  const numeroCadena = time.toString()
  const dosUltimos = numeroCadena.length == 3 ? numeroCadena.slice(1) :  numeroCadena.slice(2);

   return `${unoDosInicial}:${dosUltimos} PM`
}