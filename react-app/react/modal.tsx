
import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles';
import { canUseDOM } from 'vtex.render-runtime';
import { setCookie,getCookie } from './components/Cookies'



const CSS_HANDLES = [
  'ContainerBox',
  'modalBox',
  'aside',
  'h1',
  'content',
  'boton1',
  'boton2',
  'h2',
  'h3',
  'input1',
  "input2",
  'imagen',
  'formulario',
  'divimagen',
  'Boxbutton',
  'BoxH2',
  'BoxH3'
] as const



const Modal = ({ src, children,title,subtitle,cookieDays}: ModalProps) => {

  const [ModalVisible, setModalVisible] = useState(false);
  const hola = useCssHandles(CSS_HANDLES);
  const Img = src ? src : 'https://avantivtexio.vteximg.com.br/arquivos/banner-desktop-ic3.png';
  const TitleModal = title ? title:'BEM VINDO AO';
  const Subtitlemodal = subtitle ? subtitle:'GIASSI SUPERMERCADO';
  const porFavor = cookieDays ? cookieDays: 2


  /*VALIDACION COOKIE */
  useEffect(() => {
    const checkCookie = canUseDOM
      ? getCookie('Edcookies')
      : ''

    if (checkCookie !== 'Pronto') {
      setModalVisible(true);
    }
  },[])
  /*VALIDACION COOKIE */
  /*FUNTION CLOSE OVERLAY*/
  function emptyclick(){

    setModalVisible(false)
  }
   /*FUNTION CLOSE OVERLAY*/
  /*FUNTION COOKIE + CLOSE*/

  function handleClick() {

    setCookie('Edcookies', 'Pronto', porFavor),
      setModalVisible(false)

  }

  /*END FUNTION COOKIE = CLOSE*/


  if (ModalVisible == false) {
    return (
      null
    )
  }
  return (

    <div onClick={() => { emptyclick() }} className={`${hola.ContainerBox}`} >
      <div onClick={(event) => event.stopPropagation()} className={`${hola.modalBox}`}>
        <aside className={`${hola.aside}`}>
         <div className={`${hola.divimagen}`}>
         <img className={`${hola.imagen}`} src={Img} alt="" />
         </div>

        </aside>

        <div className={`${hola.content}`}>
          <div className={`${hola.Boxbutton}`}>
          <button onClick={handleClick} className={`${hola.boton1}`}>X</button>
          </div>
          <div className={`${hola.BoxH2}`}>
          <h2 className={`${hola.h2}`}> {TitleModal}</h2>
          </div>
          <div className={`${hola.BoxH3}`}>
          <h3 className={`${hola.h3}`}>{Subtitlemodal}</h3>
          </div>
          <div className={`${hola.formulario}`}>{children}</div>

        </div>
      </div>
    </div >
  )
}
Modal.schema = {
  title: 'Modal',
  type: 'object',
  properties: {
    title: {
      title: 'Título',
      type: 'string',
      default: "BEM VINDO AO",
      description: "Coloque seu titulo"
    },
    src:{
      title: "Modal imagem",
      type:"string",
      default:"https://avantivtexio.vteximg.com.br/arquivos/banner-desktop-ic3.png",
      description:"Colocar imagens proporcionais melhora o desempenho do modal.Ex:1050x970px"
    },
    subtitle: {
      title: 'Subtítulo',
      type: 'string',
      default: "GIASSI SUPERMERCADO",
      description: "Coloque seu subtitulo"
    },
    cookieDays:{
      title: 'Dias Cookie',
      type: 'number',
      description:"Número de dias de validade do cookie",
      default: 2
    }
  },
}

export default Modal;
