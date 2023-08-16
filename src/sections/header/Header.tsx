interface Props {
  children: JSX.Element | JSX.Element[]
}

export function Header({ children }: Props) {
  return (
    <header className="w-full flex items-end justify-between px-2 md:px-8">
      <h1 className="text-5xl md:text-8xl text-blue-400">Reading Bookshop</h1>
      {children}
    </header>
  )
}
