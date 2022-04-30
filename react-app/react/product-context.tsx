import React, { FC } from 'react'
import { useProduct } from 'vtex.product-context';
import { useCssHandles } from 'vtex.css-handles';


const CSS_HANDLES = [
  'textUno',
  'textDos',
  'textTres',
  'dad'
] as const

const MyComponent: FC = () => {
  const productContextValue = useProduct()
  const handles = useCssHandles(CSS_HANDLES);

  function RenderEdw() {
    if (productContextValue?.product?.categories[0] == '/Woman/') {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      {RenderEdw() ? (
        <div className={`${handles.dad}`}>
          <div className={`${handles.textUno}`}>
          {productContextValue?.product?.clusterHighlights[0].name}
          </div>
          <div className={`${handles.textDos}`}>
          {productContextValue?.product?.clusterHighlights[1].name}
          </div>
          <div className={`${handles.textTres}`}>
          {productContextValue?.product?.clusterHighlights[2].name}
          </div>
        </div>
      ) : null}
    </>
  )
}

export default MyComponent
