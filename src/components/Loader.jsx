import React from 'react'
import './Loader.css'

const Loader = () => {
  return (
    <div className='min-h-screen w-full absolute top-0 left-0 bg-black opacity-80 flex justify-center items-center'>
      <span class="loader"></span>
    </div>
  )
}

export default Loader
