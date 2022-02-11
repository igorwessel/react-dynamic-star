import * as React from 'react'
import './App.css'
import { DynamicStar } from 'react-dynamic-star'

function App () {
  const [star, setStar] = React.useState({
    rating: 2,
    totalStars: 5,
    sharpness: 2.5,
    width: 100,
    height: 100,
    outlined: true,
    outlinedColor: '',
    fullStarColor: '#FFBC00',
    emptyStarColor: 'transparent',
  })
  const handleAddStar = () =>
    setStar((prev) => ({ ...prev, totalStars: prev.totalStars + 1 }))

  const handleRemoveStar = () =>
    setStar((prev) => ({ ...prev, totalStars: prev.totalStars - 1 }))

  const handleOutlined = () =>
    setStar((prev) => ({ ...prev, outlined: !prev.outlined }))

  const handleFloatValue = (e: React.ChangeEvent<HTMLInputElement>, property: string) => {
    const float = e.target.value.replace(/,/g, '.')
    setStar((prev) => ({ ...prev, [property]: float }))
  }

  const handleStringValue = (e: React.ChangeEvent<HTMLInputElement>, property: string) =>
    setStar((prev) => ({ ...prev, [property]: e.target.value }))

  return (
    <div className='App'>
      <DynamicStar
        rating={star.rating}
        width={star.width}
        height={star.height}
        outlined={star.outlinedColor ? star.outlinedColor : star.outlined}
        totalStars={star.totalStars}
        sharpnessStar={star.sharpness}
        fullStarColor={star.fullStarColor}
        emptyStarColor={star.emptyStarColor}
      />
      <button onClick={handleAddStar}>Add Star</button>
      <button onClick={handleRemoveStar}>Remove Star</button>
      <button onClick={handleOutlined}>Outlined</button>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label htmlFor='width'>Width</label>
        <input
          id='width'
          value={star.width}
          onChange={(e) => handleFloatValue(e, 'width')}
        />
        <label htmlFor='height'>Height</label>
        <input
          id='height'
          value={star.height}
          onChange={(e) => handleFloatValue(e, 'height')}
        />
        <label htmlFor='rating'>Rating</label>
        <input
          id='rating'
          value={star.rating}
          onChange={(e) => handleFloatValue(e, 'rating')}
        />
        <label htmlFor='sharpness'>Sharpness(Fatness)</label>
        <input
          id='sharpness'
          value={star.sharpness}
          onChange={(e) => handleFloatValue(e, 'sharpness')}
        />
        <label htmlFor='outlined_color'>Outlined color</label>
        <input
          id='outlined_color'
          value={star.outlinedColor}
          onChange={(e) => handleStringValue(e, 'outlinedColor')}
        />
        <label htmlFor='full_star_color'>Full Star Color</label>
        <input
          id='full_star_color'
          value={star.fullStarColor}
          onChange={(e) => handleStringValue(e, 'fullStarColor')}
        />
        <label htmlFor='empty_star_color'>Empty Star Color</label>
        <input
          id='empty_star_color'
          value={star.emptyStarColor}
          onChange={(e) => handleStringValue(e, 'emptyStarColor')}
        />
      </div>
    </div>
  )
}

export default App
