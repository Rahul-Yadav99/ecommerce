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
      <div className='md:w-8/12 w-11/12 m-auto py-8'>
        <h1 className='text-3xl font-bold'>All Products</h1>
        <p className='text-gray-600 mt-3 mb-3'>Bring home the latest products designed to blend sophistication with practicality. Whether for daily use or special occasions, this is the must-have item of the season.</p>
        <div className='grid md:grid-cols-4 grid-cols-1 md:gap-8 gap-2 py-8'>
          {
            products.map((item, index) => (
              <div key={index} className='bg-white shadow-xl border '>
                <div className='overflow-hidden relative'>
                  <img src={item.image} alt="" className='hover:scale-110 h-[280px] w-full object-cover object-top' 
                  style={{
                    transition : '0.3s'
                  }}
                  />
                </div>
                <div className="py-4 px-4">
                  <h1 className='font-semibold '>{item.title}</h1>
                  <div className='space-x-2'>
                    <label>₹{item.price-(item.price*item.discount)/100}</label>
                    <del className='font-semibold text-red-600'>₹{item.price}</del>
                    <label className='text-green-600'>({item.discount}% off)</label>
                  </div>
                  <button 
                    className='mt-3 rounded-lg bg-green-600 py-3 w-full text-white font-semibold hover:bg-green-700' 
                    style={{
                      transition:'0.3s'
                    }}
                  >
                    Buy Now
                  </button>
                  <button 
                    className='mt-2 rounded-lg bg-[dodgerblue] py-3 w-full text-white font-semibold hover:bg-[#3e82ff]' 
                    style={{
                      transition:'0.3s'
                    }}
                  >
                    <i className="ri-shopping-cart-line mr-3"></i>
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
