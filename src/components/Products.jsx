import React, { useState } from 'react'
import Layout from './Layout'

const Products = () => {
  const [products, setProducts] = useState([
    {
      title : 'Men`s Shirt blue denim',
      description : 'I am related to men`s product',
      price: 2000,
      discount: 50,
      image: '/products/a.jpg'
    },
    {
      title : 'Men`s Shirt blue denim',
      description : 'I am related to men`s product',
      price: 2000,
      discount: 15,
      image: '/products/b.jpg'
    },
    {
      title : 'Men`s Shirt blue denim',
      description : 'I am related to men`s product',
      price: 2000,
      discount: 15,
      image: '/products/c.jpg'
    },
    {
      title : 'Men`s Shirt blue denim',
      description : 'I am related to men`s product',
      price: 2000,
      discount: 15,
      image: '/products/d.jpg'
    },
    {
      title : 'Men`s Shirt blue denim',
      description : 'I am related to men`s product',
      price: 2000,
      discount: 15,
      image: '/products/e.jpg'
    },
    {
      title : 'Men`s Shirt blue denim',
      description : 'I am related to men`s product',
      price: 2000,
      discount: 15,
      image: '/products/a.jpg'
    },
    {
      title : 'Men`s Shirt blue denim',
      description : 'I am related to men`s product',
      price: 2000,
      discount: 15,
      image: '/products/g.jpg'
    },
    {
      title : 'Men`s Shirt blue denim',
      description : 'I am related to men`s product',
      price: 2000,
      discount: 15,
      image: '/products/h.jpg'
    },
    {
      title : 'Men`s Shirt blue denim',
      description : 'I am related to men`s product',
      price: 2000,
      discount: 15,
      image: '/products/i.jpg'
    },
    {
      title : 'Men`s Shirt blue denim',
      description : 'I am related to men`s product',
      price: 2000,
      discount: 15,
      image: '/products/j.jpg'
    },
    {
      title : 'Men`s Shirt blue denim',
      description : 'I am related to men`s product',
      price: 2000,
      discount: 15,
      image: '/products/k.jpg'
    },
    {
      title : 'Men`s Shirt blue denim',
      description : 'I am related to men`s product',
      price: 2000,
      discount: 15,
      image: '/products/a.jpg'
    },
  ])

  return (
    <Layout>
      <div className='md:w-8/12 w-9/12 m-auto py-8'>
        <h1 className='text-3xl font-bold'>All Products</h1>
        <p className='text-gray-600 mt-3 mb-3 text-sm md:text-base'>Bring home the latest products designed to blend sophistication with practicality. Whether for daily use or special occasions, this is the must-have item of the season.</p>
        <div className='grid md:grid-cols-4 grid-cols-1 md:gap-8 gap-2 py-8'>
          {
            products.map((item, index) => (
              <div key={index} className='m-auto border pb-2 rounded-lg shadow-xl'>
              <img src={item.image} alt="" className='object-cover rounded-lg' />
              <div className='flex flex-col items-start justify-start gap-y-1 mt-2 p-2'>
                  <h1 className='text-gray-600 text-base capitalize'>{item.title}</h1>
                  <div className=' '>
                    <label className='text-gray-600 font-semibold'>₹{item.price-(item.price*item.discount)/100}</label>
                    <del className='text-red-600'>₹{item.price}</del>
                    <label className='text-green-600'>({item.discount}% off)</label>
                  </div>
                  <button
                    className='mt-1 rounded-lg bg-green-600 py-1 w-full px-3 text-white hover:bg-green-700' 
                    style={{
                     transition:'0.3s'
                    }}
                   >
                     Buy Now
                  </button>
                 <button 
                    className='mt-1 rounded-lg bg-[dodgerblue] py-1 w-full px-3 text-white hover:bg-[#3e82ff]' 
                    style={{
                     transition:'0.3s'
                    }}
                  >
                    <i className="ri-shopping-cart-line mr-1"></i>
                     Add to cart
                   </button>
              </div>
            </div>
            ))
          }
        </div>
      </div>
    </Layout>
  )
}

export default Products
