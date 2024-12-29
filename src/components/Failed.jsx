import React from 'react'
import { Link } from 'react-router-dom'

const Failed = () => {
  return (
    <div className='h-screen flex flex-col gap-8 justify-center items-center'>
      <h1 className='font-semibold text-3xl'>Payment is Failed</h1>
      <Link to={'/'} className='bg-[dodgerblue] px-4 py-3 text-white font-semibold hover:bg-[deeppink] rounded-lg'>Go Back To Home</Link>
    </div>
  )
}

export default Failed
