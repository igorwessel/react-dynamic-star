import * as React from 'react'
import './App.css'
import { DynamicStar } from 'react-dynamic-star'

function App () {
  return (
    <div className='App'>
      <DynamicStar rating={2} />
    </div>
  )
}

export default App
