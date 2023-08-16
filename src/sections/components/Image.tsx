import { useMemo, useState } from 'react'
import { ReactComponent as ImageBroken } from '@assets/image-broken.svg'
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
      className={`max-h-[15rem] borderborder-slate-400 flex items-center justify-center overflow-hidden ${className}`}
    >
      {currentState === state.LOADING && <ImageLoader />}
      {currentState === state.ERROR && <ImageBroken className="w-20" aria-label="Error al descargar la Imagen" />}
      <img
        className={`object-scale-down ${hidden}`}
        src={src}
        alt={alt}
        onLoad={() => setCurrentState(state.COMPLETE)}
        onError={() => setCurrentState(state.ERROR)}
      />
    </div>
  )
}
