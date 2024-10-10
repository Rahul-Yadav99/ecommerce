import React, { useState } from 'react'
import Layout from './Layout'

const Category = () => {
    const [category, setCategory] = useState([
        {
            title: 'Electronics'
        },
        {
            title: 'Fashion'
        },
        {
            title: 'Smartphone'
        },
        {
            title: 'Men`s'
        },
        {
            title: 'Women`s'
        },
        {
            title: 'Fashion'
        },
        {
            title: 'Game`s'
        },
        {
            title: 'Toy`s'
        },
    ])
  return (
    <Layout>
        <div className='w-10/12 m-auto py-8'>
            <div className='grid md:grid-cols-4 grid-cols-1  gap-16'>
                {
                    category.map((item, index) => (
                        <div key={index} className='hover:bg-[dodgerblue] hover:text-white bg-white shadow-lg flex items-center justify-center flex-col p-8 rounded-lg border' style={{transition: '0.3s'}}>
                            <i className="ri-menu-search-line text-6xl"></i>
                            <h1 className='text-2xl font-bold'>{item.title}</h1>
                        </div>
                    ))
                }
            </div>
        </div>
    </Layout>
  )
}

export default Category
