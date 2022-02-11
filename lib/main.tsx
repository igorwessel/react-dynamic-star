import * as React from 'react'
import { useId } from '@/hooks/useId'
import { IDynamicStarProps, IStar } from '@/types'
import {
  createEmptyStar,
  emptyStar,
} from '@/utils'
import { reducer } from '@/reducer'
import './style.css'

function DynamicStar ({
  rating,
  outlined,
  outlineWidth,
  sharpnessStar = 2.5,
  totalStars = 5,
  width = 100,
  height = 100,
  emptyStarColor = 'transparent',
  fullStarColor = '#FFBC00',
}: IDynamicStarProps) {
  const id = useId('star')
  const internalTotalStars = totalStars < 0 ? 0 : totalStars
  const [stars, dispatch] = React.useReducer(
    reducer,
    Array(internalTotalStars).fill(createEmptyStar()),
  )

  const getFullFillColor = (starData: IStar) =>
    starData.raw !== emptyStar ? fullStarColor : emptyStarColor

  const calcStarPoints = (
    centerX: number,
    centerY: number,
    innerCircleArms: number,
    innerRadius: number,
    outerRadius: number,
  ) => {
    const angle = Math.PI / innerCircleArms
    const angleOffsetToCenterStar = 60
    const totalArms = innerCircleArms * 2
    let points = ''
    for (let i = 0; i < totalArms; i++) {
      const isEvenIndex = i % 2 === 0
      const r = isEvenIndex ? outerRadius : innerRadius
      const currX = centerX + Math.cos(i * angle + angleOffsetToCenterStar) * r
      const currY = centerY + Math.sin(i * angle + angleOffsetToCenterStar) * r
      points += currX + ',' + currY + ' '
    }
    return points
  }

  const getStarPoints = () => {
    const centerX = width / 2
    const centerY = width / 2
    const innerCircleArms = 5
    const innerRadius = width / innerCircleArms
    const innerOuterRadiusRatio = sharpnessStar
    const outerRadius = innerRadius * innerOuterRadiusRatio
    return calcStarPoints(
      centerX,
      centerY,
      innerCircleArms,
      innerRadius,
      outerRadius,
    )
  }

  /**
   * Responsible to remove a star when star count changes.
   */
  React.useEffect(() => {
    const removeStars = internalTotalStars - stars.length
    if (removeStars < 0) {
      dispatch({
        type: 'REMOVE_STAR',
        payload: removeStars,
      })
    }
  }, [internalTotalStars, stars.length])

  /**
   * Responsible to add a new star when star count changes.
   */
  React.useEffect(() => {
    const addStars = internalTotalStars - stars.length
    if (addStars > 0) {
      dispatch({
        type: 'ADD_STAR',
        payload: addStars,
      })
    }
  }, [internalTotalStars, stars.length])

  /**
   * Responsible to fill stars
   */
  React.useEffect(() => {
    dispatch({
      type: 'FILL_STAR',
      payload: typeof rating === 'string' ? parseFloat(rating) : rating,
    })
  }, [rating, stars.length])

  return (
    <div className='dynamic-star-rating' aria-label={`${rating} of 5`}>
      {stars.map((star, index) => (
        <div key={`${id}_${index}`} className='dynamic-star-container'>
          <svg
            className='dynamic-star-svg'
            style={{
              fill: `url(#${id}_gradient${star.raw})`,
              stroke:
                typeof outlined === 'string'
                  ? outlined
                  : outlined
                    ? fullStarColor
                    : 'none',
              strokeWidth: outlineWidth ?? 'unset',
              width,
              height,
            }}
            aria-hidden='true'
          >
            <polygon points={getStarPoints()} fillRule='nonzero' />
            <defs>
              {/* id has to be unique to each star fullness(dynamic offset) - it indicates fullness above */}
              <linearGradient id={`${id}_gradient${star.raw}`}>
                <stop
                  id='stop1'
                  offset={star.percent}
                  stopOpacity='1'
                  stopColor={getFullFillColor(star)}
                />
                <stop
                  id='stop2'
                  offset={star.percent}
                  stopOpacity='0'
                  stopColor={getFullFillColor(star)}
                />
                <stop
                  id='stop3'
                  offset={star.percent}
                  stopOpacity='1'
                  stopColor={emptyStarColor}
                />
                <stop
                  id='stop4'
                  offset='100%'
                  stopOpacity='1'
                  stopColor={emptyStarColor}
                />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  )
}

const MemoizedComponent = React.memo(DynamicStar) as typeof DynamicStar

export { MemoizedComponent as DynamicStar }
