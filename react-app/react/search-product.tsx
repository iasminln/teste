import React, {  useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import axios from 'axios';
import { FormattedCurrency } from 'vtex.format-currency';


const CSS_HANDLES = [
  'centralDivSearch',
  'tituloSearch',
  'button',
  'divDos',
  'divDosParrafo',
  'divDosImg',
  'h1',
  'parrafo2',
  'enviar',
  'form2',
  'select',
  'input2',
  'spanBestPrice',
  "spanPrice",
  'ul',
  'li'
] as const


export default function Api() {
  const hola = useCssHandles(CSS_HANDLES)

  const [data, setdata] = useState<any>([])

  const [loading, setloading] = useState(false)
  const [search, setSearch] = useState('')
  const [messagem, setMessagem] = useState('')
  const [searchSkull,setSearchSkull] = useState('');

  const [nameComplete,setNameComplete] = useState('');

  function buscarDados() {
    setloading(true)
    axios
      .get(`/api/catalog_system/pub/products/search?fq=productId:${search}`)
      .then((res) => {
        const api = res.data
        setdata(api)
        setloading(false)

        api == '' ? setMessagem('Nenhum resultado encontrado') : setMessagem('')
      })
  }
  function buscarSkull() {
    setloading(true)
    axios
      .get(`/api/catalog_system/pub/products/search?fq=skuId:${searchSkull}`)
      .then((res) => {
        const api = res.data
        setdata(api)
        setloading(false)

        api == '' ? setMessagem('Nenhum resultado encontrado') : setMessagem('')

        let i = 0
      for (let item of api[0]?.items){
        if(item.itemId==searchSkull){
          setNameComplete(api[0]?.items[i]?.name)
        }
        i++
      }
      })

  }
  console.log(data)

  return (
    <div className={`${hola.centralDivSearch}`}>
      <h1 className={`${hola.tituloSearch}`}>Search Product</h1>
      <form className={`${hola.form2}`} action="" onSubmit={(e) => {e.preventDefault() }}>
        <p className={`${hola.parrafo2}`}>Coloque ID do produto</p>
        <input
          className={`${hola.input2}`}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
         <button
        className={`${hola.button}`}
        onClick={() => {
          buscarDados()
        }}
      >
        <p className={`${hola.enviar}`}>Enviar</p>
        </button>
    </form>
      <br />
      <br />
        <form className={`${hola.form2}`} action="" onSubmit={(e) => {e.preventDefault() }} >
        <p className={`${hola.parrafo2}`}>Coloque Skull produto</p>
        <input
          className={`${hola.input2}`}
          type="text"
          value={searchSkull}
          onChange={(e) => setSearchSkull(e.target.value)}
        />
         <button
        className={`${hola.button}`}
        onClick={() => {
          buscarSkull()
        }}
      >

        <p className={`${hola.enviar}`}>Enviar</p>
      </button>
      </form>

      <div className={`${hola.divDos}`}>

          {loading == true ? 'Cargando conteudo...' : messagem}

            <span className={`${hola.divDosParrafo}`}>{data[0]?.productName}</span><span className={`${hola.divDosParrafo}`}>{nameComplete}</span>
           <img className={`${hola.divDosImg}`} src={data[0]?.items[0]?.images[0].imageUrl} />
           <br />

           {data.length > 0 ? (
           <>
           <span className={`${hola.spanBestPrice}`}>Best Price:</span>
           <FormattedCurrency value={data[0]?.items[0].sellers[0].commertialOffer.Price}/> </> ) : null
            }
           <br />

           {data.length > 0 ? (
             <>
             <span className={`${hola.spanPrice}`}>Price:</span>
             <FormattedCurrency value={data[0]?.items[0].sellers[0].commertialOffer.ListPrice}/> </>) : null}

      </div>
    </div>
  )
}
