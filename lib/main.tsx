import * as React from 'react'
import { useId } from '@/utils/hooks/useId'
import './style.css'

type IDynamicStarProps<Style> = {
  rating: number;
  starStyle?: React.StyleHTMLAttributes<Style>;
  isIndicatorActive?: boolean;
};

type IStar = {
  raw: number;
  percent: string;
};

function DynamicStar<T> ({
  rating,
  starStyle,
  isIndicatorActive,
}: IDynamicStarProps<T>) {
  const id = useId('star')
  const emptyStar = 0
  const fullStar = 1
  const totalStars = 5
  const styleStarWidth = 100
  const styleStarHeight = 100
  const styleEmptyStarColor = '#737373'
  const styleFullStarColor = '#ed8a19'
  const fullStarsCounter = Math.floor(rating)
  const surplus = Math.round((rating % 1) * 10) / 10
  const roundedOneDecimalPoint = Math.round(surplus * 10) / 10
  const calcStarFullness = React.useCallback(
    (starData: IStar) => starData.raw * 100 + '%',
    [],
  )

  const [stars, setStars] = React.useState<IStar[]>(Array(totalStars).fill({ raw: emptyStar, percent: emptyStar + '%' }))

  const getFullFillColor = (starData: IStar) => starData.raw !== emptyStar ? styleFullStarColor : styleEmptyStarColor

  const calcStarPoints = React.useCallback(
    (centerX, centerY, innerCircleArms, innerRadius, outerRadius) => {
      const angle = Math.PI / innerCircleArms
      const angleOffsetToCenterStar = 60
      const totalArms = innerCircleArms * 2
      let points = ''
      for (let i = 0; i < totalArms; i++) {
        const isEvenIndex = i % 2 === 0
        const r = isEvenIndex ? outerRadius : innerRadius
        const currX =
          centerX + Math.cos(i * angle + angleOffsetToCenterStar) * r
        const currY =
          centerY + Math.sin(i * angle + angleOffsetToCenterStar) * r
        points += currX + ',' + currY + ' '
      }
      return points
    },
    [],
  )

  const getStarPoints = React.useCallback(() => {
    const centerX = styleStarWidth / 2
    const centerY = styleStarWidth / 2
    const innerCircleArms = 5 // a 5 arms star
    const innerRadius = styleStarWidth / innerCircleArms
    const innerOuterRadiusRatio = 2.5 // Unique value - determines fatness/sharpness of star
    const outerRadius = innerRadius * innerOuterRadiusRatio
    return calcStarPoints(
      centerX,
      centerY,
      innerCircleArms,
      innerRadius,
      outerRadius,
    )
  }, [styleStarWidth, calcStarPoints])

  React.useEffect(() => {
    setStars((prevState) =>
      prevState.map((star, index) =>
        fullStarsCounter >= index + 1
          ? { raw: fullStar, percent: calcStarFullness(star) }
          : { raw: roundedOneDecimalPoint, percent: calcStarFullness(star) },
      ),
    )
  }, [calcStarFullness, fullStarsCounter, roundedOneDecimalPoint])

  return (
    <div className='star-rating' aria-label={`${rating} of 5`}>
      {stars.map((star, index) => (
        <div key={`${id}_${index}`} className='star-container'>
          <svg
            className='star-svg'
            style={{
              fill: `url(#gradient${star.raw})`,
              width: styleStarWidth,
              height: styleStarHeight,
              ...starStyle,
            }}
            aria-hidden='true'
          >
            <polygon points={getStarPoints()} style={{ fillRule: 'nonzero' }} />
            <defs>
              {/* id has to be unique to each star fullness(dynamic offset) - it indicates fullness above */}
              <linearGradient id={`gradient${star.raw}`}>
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
                  stopColor={styleEmptyStarColor}
                />
                <stop
                  id='stop4'
                  offset='100%'
                  stopOpacity='1'
                  stopColor={styleEmptyStarColor}
                />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
      {isIndicatorActive && <div className='indicator'>{rating}</div>}
    </div>
  )
}

const MemoizedComponent = React.memo(DynamicStar) as typeof DynamicStar

export { MemoizedComponent as DynamicStar }
