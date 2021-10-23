import * as React from 'react'
import './App.css'
import { DynamicStar } from 'react-dynamic-star'

function App () {
  return (
    <div className='App'>
      <p>Outlined</p>
      <DynamicStar outlined rating={2.1} />
      <p>Outlined with custom outline width</p>
      <DynamicStar
        outlined
        outlineWidth={3}
        emptyStarColor='black'
        rating={2.5}
      />
      <p>Outlined with custom empty star</p>
      <DynamicStar outlined emptyStarColor='black' rating={2.5} />
      <p>Outlined with custom color</p>
      <DynamicStar outlined='black' rating={2.5} />
      <p>With more stars</p>
      <DynamicStar
        rating={3.5}
        totalStars={7}
        fullStarColor='black'
        emptyStarColor='blue'
      />
      <p>Custom full star color and empty color</p>
      <DynamicStar rating={3.5} fullStarColor='black' emptyStarColor='blue' />
      <p>Custom full star color, empty color, stroke color</p>
      <DynamicStar
        rating={3.5}
        outlined='#FFBC00'
        fullStarColor='black'
        emptyStarColor='blue'
      />
      <p>Custom width and height</p>
      <DynamicStar width={50} height={50} rating={2.5} />
      <p>Custom sharpness</p>
      <DynamicStar rating={2.5} sharpnessStar={1.7} />
    </div>
  )
}

export default App
