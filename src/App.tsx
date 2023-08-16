import { InMemoryCatalogueRepository } from '@mod-catalogue/infraestructure'
import { CatalogueComponent } from '@sec-catalogue/CatalogueComponent'
import { Header } from '@sections/header/Header'
import { ReadingComponent } from './sections/reading/ReadingComponent'
import { Filters } from './sections/Filters'
import { FiltersState, Gender } from './modules/catalogue/domain'
import { useState } from 'react'

function App() {
  const repository = InMemoryCatalogueRepository()
  const [state, setState] = useState<FiltersState>({
    genders: [],
    nPages: 0
  })

  const isGenderHandler = (gender: Gender) => {
    return state.genders.includes(gender)
  }

  const onChangeGenderHandler = (gender: Gender) => {
    setState((prev) => {
      return {
        ...prev,
        genders: state.genders.includes(gender)
          ? state.genders.filter((g) => g !== gender)
          : state.genders.concat(gender)
      }
    })
  }

  const onChangePage = (nPages: number) => {
    setState((prev) => {
      return { ...prev, nPages }
    })
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Header>
        <Filters
          nPage={state.nPages}
          isChecked={isGenderHandler}
          onChangeGender={onChangeGenderHandler}
          onChangePage={onChangePage}
        />
      </Header>
      <main className="container mx-auto">
        <div className="w-full flex justify-between">
          <CatalogueComponent repository={repository} filters={state} />
          <ReadingComponent />
        </div>
      </main>
    </div>
  )
}

export default App
