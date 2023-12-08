import React, { useEffect, useState } from 'react'
import styles from './CantidadTickets.module.css'

const TipoTicket = [
  {
    person: "Adult",
    price: 20,
    num : 0
  },
  {
    person: "Child 3-8",
    price: 10,
    num : 0
  },
  {
    person: "Adult +60",
    price: 10,
    num : 0
  },
]

const CantidadTickets = ({cancelCompra , cantidadTickets}) => {

  const [listaPersonas,setListaPersonas] = useState(TipoTicket)
  // console.log(cancelCompra , "efsefseffsef");

  const handleAumentar = (idx) => {
    const listaTem = [...listaPersonas]
    listaTem[idx].num += 1
    // console.log(listaTem[idx].num);
    setListaPersonas(listaTem)
  }
  const handleReducir = (idx) => {
    const listaTem = [...listaPersonas]
    if (listaTem[idx].num>0) listaTem[idx].num -= 1
    // console.log(listaTem[idx].num);
    setListaPersonas(listaTem)
  }

 useEffect(() => {
  cancelCompra != null &&
  setListaPersonas([
    {
      person: "Adult",
      price: 20,
      num : 0
    },
    {
      person: "Child 3-8",
      price: 10,
      num : 0
    },
    {
      person: "Adult +60",
      price: 10,
      num : 0
    },
  ])
 }, [cancelCompra])
 
  //Mas Elegante
  // const handleAumentar = (idx) => {
  //   setListaPersonas((prevLista) => {
  //     const nuevaLista = [...prevLista];
  //     nuevaLista[idx] = { ...nuevaLista[idx], num: nuevaLista[idx].num + 1 };
  //     return nuevaLista;
  //   });
  // };
  
  // const handleReducir = (idx) => {
  //   setListaPersonas((prevLista) => {
  //     const nuevaLista = [...prevLista];
  //     nuevaLista[idx] = { ...nuevaLista[idx], num: nuevaLista[idx].num - 1 };
  //     return nuevaLista;
  //   });
  // };
  
  useEffect(() => {
    cantidadTickets(listaPersonas)
  }, [listaPersonas])
  
  // console.log(listaPersonas);
  return (
<>
            
            <table className={styles.tableStyle}>
              <thead>
                <tr>
                  <th>Persona</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {listaPersonas.map((item, idx) => (
                  <tr key={idx + 'id'}>
                    <td><img src="/ticket.svg" id = {styles.icoTicket}></img>{item.person}</td>
                    <td>{item.price}</td>
                    <td>
                    <button className="btn btn-outline-primary" onClick={() => handleReducir(idx)}>-</button>
                    <button className="btn btn-primary">{item.num}</button>
                    <button className="btn btn-outline-primary" onClick={() => handleAumentar(idx)}>+</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </>
  )
}

export default CantidadTickets
