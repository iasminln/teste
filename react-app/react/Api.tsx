import React, { useState } from 'react';
import { useCssHandles } from 'vtex.css-handles';
import axios from 'axios';

interface   Post{
  email: String;
  id: number;
  name: String;
  username: String;
}


const CSS_HANDLES = [
  'centralDiv',
  'titulo',
  'button',
  'divDos',
  'ul',
  'li',
  'h1',
  'parrafo',
  'enviar'

] as const

export default function Api () {
  const hola = useCssHandles(CSS_HANDLES);

  const [data, setdata] = useState([]);

  const [loading, setloading] = useState(false);





  function buscarDados() {
    setloading(true)
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const api = res.data;
        setdata (api)
        console.log(api)
        setloading(false)

      })
  }


    return (
      <div className={`${hola.centralDiv}`}>
        <h1 className={`${hola.titulo}`}>DATA --- A.P.I</h1>
        <button className={`${hola.button}`}onClick={() => {buscarDados()}}><p className={`${hola.enviar}`}>Enviar</p></button>
        <div className={`${hola.divDos}`}>
        <ul className={`${hola.ul}`}>
          {loading == true ? ('Cargando conteudo...'): '' }
          { data.map((apiMap : Post) => <li className={`${hola.li}`}>
            <h1 className={`${hola.h1}`}>{apiMap ['username']}</h1>
            <p className={`${hola.parrafo}`}>Name: {apiMap ['name']}</p>
            <p className={`${hola.parrafo}`}>ID: {apiMap ['id']}</p>
            <p className={`${hola.parrafo}`}>Email: {apiMap ['email']}</p>
            </li>)}

      </ul>
        </div>
      </div>
    )

}
