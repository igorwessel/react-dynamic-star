import { IStar } from '@/types'

const fullStar = 1
const emptyStar = 0

const createEmptyStar = (): IStar => ({ raw: emptyStar, percent: '0%' })

const createFullStar = (): IStar => ({ raw: fullStar, percent: '100%' })

const createStarWithPercentageFilled = (roundedOneDecimalPoint: number): IStar => ({ raw: roundedOneDecimalPoint, percent: roundedOneDecimalPoint * 100 + '%' })

export {
  createEmptyStar,
  createFullStar,
  createStarWithPercentageFilled,
  fullStar,
  emptyStar,
}
