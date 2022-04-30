import React, { useState } from 'react';
import { useCssHandles } from 'vtex.css-handles';
import axios from 'axios';

interface   Post{
  email: String;

  name: String;

}


const CSS_HANDLES = [
  'centralDivSearch',
  'tituloSearch',
  'button',
  'divDos',
  'ul',
  'li',
  'h1',
  'parrafo',
  'enviar',
  'form',
  'select',
  'input',
  'larala'

] as const

export default function Api () {
  const hola = useCssHandles(CSS_HANDLES);

  const [data, setdata] = useState([]);

  const [loading, setloading] = useState(false);
  const [search, setSearch] = useState ('');
  const [searchMaster, setSearchMaster] = useState ('name');
  const [messagem, setMessagem] = useState('');
  const [push,setPush]= useState<any>([]);





  function buscarDados() {

    setloading(true)
    axios.get(`/api/dataentities/inovationentity/search?_schema=schemainovation&_fields=email,name&_where=${searchMaster}=${search}`)
      .then(res => {
        const api = res.data;
        setdata (api)
        setloading(false)
        api == '' ? setMessagem('Nenhum resultado encontrado') :setMessagem('')

        let arrayUno = []
        let arrayPush = []
        let varSelect = ''

        if (searchMaster == 'name'){
          varSelect = 'email'
        } else{
          varSelect= 'name'
        }
        for (let item of api){
          if(arrayUno.indexOf(item[varSelect])== -1){
            arrayUno.push(item[varSelect])
            arrayPush.push(item)
          }
        }
        setPush (arrayPush)
        api == ''
        ? setMessagem('Resultado nao encontrado'):setMessagem(`${arrayPush.length} resultado encontrado`)

      })
      console.log(data)
  }


    return (
      <div className={`${hola.centralDivSearch}`}>
        <h1 className={`${hola.tituloSearch}`}>Search API for</h1>
        <form className={`${hola.form}`} action="" onSubmit={(e)=>{e.preventDefault()}}>
        <select
            value={searchMaster}
            onChange={(e) => setSearchMaster(e.target.value)}
            className={`${hola.select}`}
          >
            <option value="name">Nome</option>
            <option value="email">E-mail</option>
          </select>
          <input className={`${hola.input}`}type="text" value={search} onChange={(e) => setSearch(e.target.value)}  />

        </form>
        <button className={`${hola.button}`}onClick={() => {buscarDados()}}><p className={`${hola.enviar}`}>Enviar</p></button>


        <div className={`${hola.divDos}`}>
        <ul className={`${hola.ul}`}>
          <div className={`${hola.larala}`}>{loading == true ? ('Cargando conteudo...'): messagem}</div>


          { push.map((apiMap : Post) => <li className={`${hola.li}`}>

            <p className={`${hola.parrafo}`}>Name: {apiMap ['name']}</p>

            <p className={`${hola.parrafo}`}>Email: {apiMap ['email']}</p>
            </li>)}

      </ul>
        </div>
      </div>
    )

}
