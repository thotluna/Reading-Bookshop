import { Gender } from '@mod-catalogue/domain'
import { FiltersState } from '@mod-filters/domain'

export type FiltersActions =
  | { type: 'addGender'; payload: Gender }
  | { type: 'delGender'; payload: Gender }
  | { type: 'addNPages'; payload: number }
  | { type: 'addSearch'; payload?: string }
  | { type: 'saveAll'; payload: FiltersState }

export function filtersReducer(state: FiltersState, action: FiltersActions): FiltersState {
  switch (action.type) {
    case 'addGender': {
      return {
        ...state,
        genders: state.genders.concat(action.payload)
      }
    }

    case 'delGender': {
      return {
        ...state,
        genders: state.genders.filter((gender) => gender !== action.payload)
      }
    }

    case 'addNPages': {
      return {
        ...state,
        nPages: action.payload
      }
    }

    case 'addSearch': {
      return {
        ...state,
        search: action.payload !== ' ' ? action.payload : undefined
      }
    }

    case 'saveAll': {
      return action.payload
    }

    default:
      return state
  }
}
