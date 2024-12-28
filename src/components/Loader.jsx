import React from 'react'
import './Loader.css'

const Loader = () => {
  return (
    <div className='min-h-screen w-full absolute top-0 left-0 bg-white opacity-90 flex justify-center items-center z-20'>
      <span class="loader"></span>
    </div>
  )
}

export default Loader
