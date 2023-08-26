import { ReactComponent as ImageBroken } from '@assets/image-broken.svg'
import { useMemo, useState } from 'react'
import { ImageLoader } from './image-loader'

const enum state {
  LOADING = 'loading',
  COMPLETE = 'complete',
  ERROR = 'error'
}

interface Props {
  src: string
  alt: string
  className?: string
}

export function Image({ src, alt, className = '' }: Props) {
  const [currentState, setCurrentState] = useState(state.LOADING)

  const hidden = useMemo(() => {
    return currentState === state.LOADING || currentState === state.ERROR ? 'hidden' : 'block'
  }, [currentState])

  return (
    <div
      className={`max-h-[13rem] border border-slate-400 flex items-center justify-center overflow-hidden ${className}`}
    >
      {currentState === state.LOADING && <ImageLoader />}
      {currentState === state.ERROR && <ImageBroken className="w-20" aria-label="Error al descargar la Imagen" />}
      <img
        rel="preload"
        className={`object-scale-down ${hidden}`}
        src={src}
        alt={alt}
        onLoad={() => setCurrentState(state.COMPLETE)}
        onError={() => setCurrentState(state.ERROR)}
      />
    </div>
  )
}
