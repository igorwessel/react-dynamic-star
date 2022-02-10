import { IStar } from '@/types'
import {
  createEmptyStar,
  createFullStar,
  createStarWithPercentageFilled,
} from '@/utils'

type Actions = 'REMOVE_STAR' | 'ADD_STAR' | 'FILL_STAR';

type Action = {
  type: Actions;
  payload?: number;
};

type ReducerFunction = (state: IStar[], action: Action) => IStar[];

const reducer: ReducerFunction = (state, action) => {
  switch (action.type) {
    case 'ADD_STAR': {
      if (action.payload === undefined) {
        return state
      }

      return [
        ...state,
        ...Array(action.payload).fill(createEmptyStar()),
      ]
    }
    case 'FILL_STAR': {
      if (action.payload === undefined) {
        return state
      }

      const fullStarsCounter = Math.floor(action.payload)

      const surplus = Math.round((action.payload % 1) * 10) / 10
      const roundedOneDecimalPoint = Math.round(surplus * 10) / 10

      return state.map((_, index) =>
        fullStarsCounter >= index + 1
          ? createFullStar()
          : action.payload === index + roundedOneDecimalPoint
            ? createStarWithPercentageFilled(roundedOneDecimalPoint)
            : createEmptyStar(),
      )
    }
    case 'REMOVE_STAR': {
      return [...state.slice(0, action.payload)]
    }
    default:
      return state
  }
}

export { reducer }
