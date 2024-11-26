import React, { useState } from 'react'
import Layout from './Layout'

const Cart = () => {

  const [product, setProducts] = useState([
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
      image: '/products/g.jpg'
    }
    ,{
      title : 'Men`s Shirt blue denim',
      description : 'I am related to men`s product',
      price: 2000,
      discount: 15,
      image: '/products/h.jpg'
    }
    ,{
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
    }
  ])

  return (
    <Layout>
      <div className='md:w-8/12 w-11/12 m-auto p-8 bg-white shadow-lg'>
        <div className='flex items-center gap-4'>
          <i className="ri-shopping-cart-line text-3xl font-bold"></i>
          <h1 className='text-3xl font-bold'>Cart</h1>
        </div>
        <hr className='my-6'/>
        <div className="grid md:grid-cols-4 grid-cols-1 gap-8">
          {
            product.map((item, index) => (
              <div key={index} className='m-auto'>
                <img src={item.image} alt="" className='h-[280px] w-[210px] object-cover rounded-lg' />
                <div className='flex flex-col items-start justify-start gap-y-2 mt-2'>
                    <h1 className='text-gray-600 text-base capitalize'>{item.title}</h1>
                    <div className='space-x-2'>
                      <label className='text-gray-600 font-semibold'>₹{item.price-(item.price*item.discount)/100}</label>
                      <del className='text-red-600'>₹{item.price}</del>
                      <label className='text-green-600'>({item.discount}% off)</label>
                    </div>
                    <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700'>
                      <i className="ri-delete-bin-6-line mr-3"></i>
                      Remove
                    </button>
                </div>
              </div>
            ))
          }
        </div>
        <hr className='my-6'/>
        <div className='flex justify-between items-center'>
          <h1 className='text-lg font-semibold'>Total : ₹52,000</h1>  
          <button className=' bg-[dodgerblue] text-white px-4 py-2 rounded hover:bg-[#3e82ff]'>
          <i className="ri-shopping-bag-line mr-3"></i>
            Buy Now
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Cart
