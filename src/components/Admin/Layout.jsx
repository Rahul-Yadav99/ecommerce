import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const Layout = ({children}) => {

    const [size, setSize] = useState(280)
    const [accountMenu, setAccountMenu] = useState(false)
    const location = useLocation()

    const menus = [
        {
            label : 'Products',
            href: '/admin/products'
        },
        {
            label : 'Orders',
            href: '/admin/orders'
        },
        {
            label : 'Payments',
            href: '/admin/payments'
        },
        {
            label : 'Settings',
            href: '/admin/settings'
        }
    ]
    
    return (
        <div>
            <aside 
                className="w-[280px] h-full fixed top-0 left-0 shadow-xl bg-[dodgerblue] overflow-hidden py-16"
                style={{
                    width: size,
                    transition: '0.3s'
                }}
            >
                <div className="flex flex-col ">
                    {
                        menus.map((item, index) => (
                            <Link key={index} to={item.href} className="p-3 text-base font-[17.5px] text-white"
                                style={{
                                    background : (location.pathname === item.href) ? '#e11d48' : 'transparent'
                                }}
                            >
                                {item.label}
                            </Link>
                        ))
                    }
                </div>
            </aside>


            <section 
                className="h-screen"
                style={{
                    marginLeft : size,
                    transition: '0.3s',
                }}
            >
                <nav className="min-h-16 px-5 bg-white shadow-xl flex items-center justify-between sticky top-0 left-0">
                    <div className="flex gap-4 items-center">
                        <button 
                            onClick={()=>setSize(size === 280 ? 0 : 280)}
                            className="w-8 h-8 hover:bg-gray-100"
                        >
                            <i className="ri-menu-line text-base font-bold"></i>
                        </button>
                        <h1 className="text-base font-semibold">VibeNest</h1>
                    </div>

                    <div className="flex items-center">
                        <button className="bg-gray-600 rounded-full relative">
                            <img src="/img/avtar.png" alt="" className="w-14 h-14 " onClick={()=>setAccountMenu(!accountMenu)} />
                            {
                                accountMenu &&
                                <div className="shadow-xl absolute top-[60px] right-0 bg-white p-6 w-[210px]">
                                    <div>
                                        <h1 className="text-base font-semibold">Rahul</h1>
                                        <p className="text-base font-semibold">rahul@gmail.com</p>
                                        <div className="h-px bg-gray-300 my-4" />
                                        <button className="text-base font-semibold">
                                            <i className="ri-logout-box-line mr-3 text-red-500"></i>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            }
                        </button>
                    </div>
                </nav>
                <div className="p-8 z-1 bg-white">
                    {children}
                </div>
            </section>
        </div>
    )
}

export default Layout