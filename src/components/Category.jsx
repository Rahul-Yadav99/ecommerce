import React, { useState } from 'react'
import Layout from './Layout'
import { Link } from 'react-router-dom'

const Category = () => {
    const [category, setCategory] = useState([
        {
            title: 'Electronics',
            url: '/img/c1.jpg'
        },
        {
            title: 'Fashion',
            url: '/img/c2.jpg'
        },
        {
            title: 'Smartphone',
            url: '/img/c3.jpg'
        },
        {
            title: 'Men`s',
            url: '/img/c4.jpg'
        },
        {
            title: 'Women`s',
            url: '/img/c5.jpg'
        },
        {
            title: 'Fashion',
            url: '/img/c2.jpg'
        },
        {
            title: 'Game`s',
            url: '/img/c7.jpg'
        }
    ])
  return (
    <Layout>
        <div className='w-8/12 m-auto py-8'>
            <div className='grid grid-cols-4 auto-rows-[400px] gap-2'>
                {
                    category.map((item, index) => (
                        <div key={index} 
                            style={{
                                gridRow : (index === 2) ? 'span 2' : '',
                                gridColumn : (index === 0 || index === 4 || index === 5 || index === 6) ? 'span 2' : '',
                                position : 'relative'
                            }}
                        >
                            <img className="object-cover h-full w-full overflow-hidden" src={item.url}  />
                            <Link to={'/'} className='absolute bottom-5 right-5 font-semibold text-lg bg-white hover:text-white hover:bg-[dodgerblue] px-6 py-2 rounded-full'
                                style={{
                                    transition : '0.2s'
                                }}
                            >
                                {item.title}
                                <i className="ri-arrow-right-up-line ml-2"></i>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    </Layout>
  )
}

export default Category
