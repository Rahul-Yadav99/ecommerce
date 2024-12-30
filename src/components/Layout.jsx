import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import firebaseAppConfig from '../util/firebase-config'
import { getAuth, onAuthStateChanged, signOut} from 'firebase/auth'
const auth = getAuth(firebaseAppConfig)

const Layout = ({children}) => {
    const location = useLocation()
    const [session, setSession] = useState(null)
    const [accountMenu, setAccountMenu] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                setSession(user)
            }else{
                setSession(null)
            }
        })
    },[])

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
            label: 'Contact us',
            href: '/contact-us'
        },
        
    ]
    
  return (
    <div>
        {/* Desktop Nav */}
        <nav className='py-2 bg-white shadow-xl sticky top-0 left-0 z-10'>
        <div className='md:w-8/12 w-11/12 h-full m-auto flex items-center justify-between'>
            <Link to={'/'} className='font-bold text-2xl text-[dodgerblue] flex  items-center gap-1'>
                <img src="/img/logo.png" alt="" className='md:w-[60px] w-[10%]'/>
                VibeNest
            </Link>
            <button className='md:hidden' onClick={() => setMobileMenu(!mobileMenu)}>
                {
                    mobileMenu ? <i className="ri-close-line font-bold text-2xl"></i> : <i className="ri-menu-4-line font-bold text-2xl"></i>

                }
            </button>
            <ul className='md:flex hidden gap-6 items-center justify-center'>
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
                {
                    !session &&
                    <>
                        <Link to={'/login'} className='text-[16px] py-2 px-6 hover:bg-[dodgerblue] hover:text-white'>Login</Link>
                        <Link to={'/signup'} className='text-[16px] py-2 px-6 bg-[dodgerblue] text-white rounded hover:bg-[#3e82ff]'>Signup</Link>
                    </>
                }
                {
                    session && 
                    <button className="bg-gray-600 rounded-full relative">
                        <img src="/img/avtar.png" alt="" className="w-14 h-14 " onClick={()=>setAccountMenu(!accountMenu)} />
                            {
                                accountMenu &&
                                <div className="shadow-xl absolute top-[60px] right-0 bg-white py-6">
                                    <div className='flex flex-col items-start'>
                                        <h1 className='bg-gray-100 text-base font-semibold w-full text-center py-2'>{session.displayName}</h1>
                                        <Link to={'/profile'} className="text-base font-semibold hover:bg-gray-100 w-full py-2 px-16 text-start">
                                            <i className="ri-user-line mr-3 text-green-500"></i>
                                            Profile
                                        </Link>
                                        <Link to={'/cart'} className="text-base font-semibold hover:bg-gray-100 w-full py-2 px-16 text-start">
                                            <i className="ri-shopping-cart-line mr-3 text-green-500"></i>
                                            Cart
                                        </Link>
                                        <button className="text-base font-semibold w-full text-left py-2 px-16 hover:bg-gray-100" onClick={() => signOut(auth)}>
                                            <i className="ri-logout-box-line mr-3 text-red-500"></i>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            }
                    </button>
                }
            </ul>
        </div>
      </nav>
  
       <div className="bg-white">
        {children}
       </div>

      <footer className='bg-[#4e4e4e] md:py-16 py-8 z-10'>
        <div className="md:w-8/12 w-11/12 m-auto grid md:grid-cols-3 grid-cols-1 gap-8">
            <div className="">
            <Link to={'/'} className='font-bold text-5xl text-white flex  items-center gap-2'>
                <img src="/img/logo.png" alt="" className='h-[12%] w-[30%]'/>
                VibeNest
            </Link>
            <p className='text-base text-[#d4d4d8] md:mt-4 mt-2'>
                <i className="ri-map-pin-line mr-3 text-xl"></i>
                Sonia Vihar, New Delhi, Delhi 110094
            </p>
            </div>
            <div className="">
                <h1 className='text-3xl text-white font-semibold'>Usefull Links</h1>
                <ul className='space-y-2 md:mt-4 mt-1'>
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
    
        {/* Phone nav */}
    
        <aside className='h-full bg-gray-700 shadow-xl fixed top-0 left-0 z-10 overflow-hidden pt-6'
            style={{
                width: mobileMenu ? 250 : 0,
                transition: '0.3s',
            }}
        >
            {
                session && 
                <button className="bg-gray-600 rounded-full border ml-6">
                        <img src="/img/avtar.png" alt="" className="w-14 h-14 " onClick={()=>setAccountMenu(!accountMenu)} />
                            {
                                accountMenu &&
                                <div className="shadow-xl absolute top-[83px] right-2 bg-white py-6">
                                    <div className='flex flex-col items-start'>
                                        <h1 className='bg-gray-100 text-base font-semibold w-full text-center py-2'>{session.displayName}</h1>
                                        <Link to={'/profile'} className="text-base font-semibold hover:bg-gray-100 w-full py-2 px-16 text-start">
                                            <i className="ri-user-line mr-3 text-green-500"></i>
                                            Profile
                                        </Link>
                                        <Link to={'/cart'} className="text-base font-semibold hover:bg-gray-100 w-full py-2 px-16 text-start">
                                            <i className="ri-shopping-cart-line mr-3 text-green-500"></i>
                                            Cart
                                        </Link>
                                        <button className="text-base font-semibold w-full text-left py-2 px-16 hover:bg-gray-100" onClick={() => signOut(auth)}>
                                            <i className="ri-logout-box-line mr-3 text-red-500"></i>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            }
                </button>
            }
            <div className='flex flex-col gap-2 pl-2 pt-6 pr-2'>
                {
                    menus.map((item, index) => (
                        <Link to={item.href} key={index} className='text-white px-4 py-2 text-sm font-medium w-full'
                            style={{
                                background: (item.href === location.pathname) ? 'dodgerblue' : '',
                            }}
                        >
                            {item.label}
                        </Link>
                    ))
                }
                {
                    !session && 
                    <>
                        <Link to={'/login'} className='py-2 px-4 text-white bg-[dodgerblue] rounded'>Login</Link>
                        <Link to={'/signup'} className='py-2 px-4 border border-[dodgerblue] text-white rounded'>Signup</Link>
                    </>
                }
            </div>
        </aside>

    </div>
  )
}

export default Layout
