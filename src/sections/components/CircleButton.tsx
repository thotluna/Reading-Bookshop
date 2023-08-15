interface Props {
  children: JSX.Element
  onClick: () => void
  className?: string
}

function CircleButton({ children, onClick, className = '' }: Props) {
  return (
    <button
      className={`w-8 h-8 flex items-center justify-center rounded-full border-2 border-slate-100 text-slate-100 hover:scale-110 hover:border-red-500 hover:text-red-500 transition-transform ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default CircleButton
