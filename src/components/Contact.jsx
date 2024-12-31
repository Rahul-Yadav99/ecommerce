import React from 'react'
import Layout from './Layout'

const Contact = () => {
  return (
    <Layout>
        <div className='md:w-5/12 w-11/12 m-auto md:py-20 py-8 gap-20'>
            <div className='flex flex-col justify-center'>
                <form action="" className='mt-5 space-y-5'>
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold text-lg'>Name:</label>
                        <input type="text" name="name" placeholder='Rahul' required className='p-3 border border-gray-300 rounded'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold text-lg'>Email:</label>
                        <input type="email" name="email" placeholder='rahul@gmail.com' required className='p-3 border border-gray-300 rounded'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold text-lg'>Message:</label>
                        <textarea name="message" placeholder='message' rows={6} className='p-3 border border-gray-300 rounded' />
                    </div>

                <button 
                    className='mt-2 bg-[dodgerblue] py-3 px-6 rounded-lg w-fit text-white font-semibold hover:bg-[#3e82ff]' 
                    style={{
                      transition:'0.3s'
                    }}
                >
                    Get Quote
                  </button>
                </form>
            </div>
        </div>
    </Layout>
  )
}

export default Contact
