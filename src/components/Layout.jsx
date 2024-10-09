import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Layout = ({children}) => {
    const location = useLocation()
    const menus = [
        {
            label: 'Home',
            href: '/'
        },
        {
            label: 'Products',
            href: '/products'
        },
        {
            label: 'Category',
            href: '/category'
        },
        {
            label: 'Contact us',
            href: '/contact-us'
        },
        
    ]
  return (
    <div>
      <nav className='py-2 bg-white shadow-xl sticky top-0 left-0'>
        <div className='w-10/12 h-full m-auto flex items-center justify-between'>
            <Link to={'/'} className=' font-bold text-2xl '>
                VibeNest
            </Link>
            <ul className='flex gap-7 items-center justify-center'>
                {
                    menus.map((item, index) => (
                        <li key={index} className='text-[16px] hover:bg-[dodgerblue] hover:text-white'>
                            <Link to={item.href} className='block py-4 px-3 '
                                style={{
                                    borderBottom: (item.href === location.pathname) ? '2px solid dodgerblue' : 'transparent',
                                }}
                            >{item.label}</Link>
                        </li>
                    ))
                }
                <Link to={'/login'} className='text-[16px] py-2 px-6 hover:bg-[dodgerblue] hover:text-white'>Login</Link>
                <Link to={'/singup'} className='text-[16px] py-2 px-6 bg-[dodgerblue] text-white rounded hover:bg-[#3e82ff]'>Singup</Link>
            </ul>
        </div>
      </nav>

       <div className="bg-gray-100">
        {children}
       </div>

      <footer className='bg-[dodgerblue] py-16'>
        <div className="w-10/12 m-auto grid grid-cols-3">
            <div className="">
            <Link to={'/'} className=' font-bold text-5xl text-white'>
                VibeNest
            </Link>
            <p className='text-base text-[#d4d4d8] mt-4'>
                <i className="ri-map-pin-line mr-3 text-black text-xl"></i>
                Sonia Vihar, New Delhi, Delhi 110094
            </p>
            </div>
            <div className="">
                <h1 className='text-3xl text-white font-semibold'>Usefull Links</h1>
                <ul className='space-y-2 mt-4'>
                    {
                        menus.map((item, index) => (
                            <li key={index} className='text-white '>
                                <Link to={item.href}>{item.label}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="">
                <h1 className='text-3xl text-white font-semibold mb-4'>Contact us</h1>
                <form action="" className='space-y-4'>
                    <input required type="text" name="fullname" placeholder='Your Name' className='bg-white w-full rounded p-3' />
                    <input required type="email" name="email" placeholder='Your Emial' className='bg-white w-full rounded p-3' />
                    <textarea name="message" placeholder='Message' rows={3} className='bg-white w-full rounded p-3'/>
                    <button className='bg-black text-white py-2 px-4 rounded'>Submit</button>
                </form>
            </div>
        </div>
            
            <hr className='mt-3' />
            <p className='text-center mt-1 text-white text-[16px]'>Copyright © 2024 VibeNest</p>
      </footer>
    </div>
  )
}

export default Layout
