import * as React from 'react'
import { useId } from '@/hooks/useId'
import './style.css'

type IDynamicStarProps = {
  rating: number;
  outlined?: string | boolean;
  outlineWidth?: number;
  sharpnessStar?: number;
  totalStars?: number;
  width?: number;
  height?: number;
  emptyStarColor?: string;
  fullStarColor?: string;
};

type IStar = {
  raw: number;
  percent: string;
};

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
  const emptyStar = 0
  const fullStar = 1

  const [stars, setStars] = React.useState<IStar[]>(
    Array(totalStars).fill({ raw: emptyStar, percent: emptyStar + '%' }),
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
    const removeStars = totalStars - stars.length

    if (totalStars - stars.length < 0) {
      setStars((prevState) => [...prevState.slice(0, removeStars)])
    }
  }, [totalStars, stars.length])

  /**
   * Responsible to add a new star when star count changes.
   */
  React.useEffect(() => {
    if (totalStars - stars.length > 0) {
      setStars((prevState) => [
        ...prevState,
        ...Array(totalStars - prevState.length).fill({
          raw: emptyStar,
          percent: emptyStar + '%',
        }),
      ])
    }
  }, [totalStars, stars.length])

  /**
   * Responsible to fill stars
   */
  React.useEffect(() => {
    const fullStarsCounter = Math.floor(rating)

    const surplus = Math.round((rating % 1) * 10) / 10
    const roundedOneDecimalPoint = Math.round(surplus * 10) / 10
    const calcStarFullness = (starData: IStar) => starData.raw * 100 + '%'

    setStars((prevState) =>
      prevState.map((star, index) =>
        fullStarsCounter >= index + 1
          ? {
              raw: fullStar,
              percent: calcStarFullness({ ...star, raw: fullStar }),
            }
          : rating === index + roundedOneDecimalPoint
            ? {
                raw: roundedOneDecimalPoint,
                percent: calcStarFullness({
                  ...star,
                  raw: roundedOneDecimalPoint,
                }),
              }
            : {
                raw: emptyStar,
                percent: emptyStar + '%',
              },
      ),
    )
  }, [rating, stars.length])

  return (
    <div className='star-rating' aria-label={`${rating} of 5`}>
      {stars.map((star, index) => (
        <div key={`${id}_${index}`} className='star-container'>
          <svg
            className='star-svg'
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
