const fullStar = 1
const emptyStar = 0

const createEmptyStar = () => ({ raw: emptyStar, percent: '0%' })

const createFullStar = () => ({ raw: fullStar, percent: '100%' })

const createStarWithPercentageFilled = (roundedOneDecimalPoint: number) => ({ raw: roundedOneDecimalPoint, percent: roundedOneDecimalPoint * 100 + '%' })

export {
  createEmptyStar,
  createFullStar,
  createStarWithPercentageFilled,
  fullStar,
  emptyStar,
}
