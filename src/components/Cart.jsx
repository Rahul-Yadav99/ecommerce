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
      <div className='w-10/12 m-auto p-8 bg-white shadow-lg'>
        <div className='flex items-center gap-4'>
          <i className="ri-shopping-cart-line text-3xl font-bold"></i>
          <h1 className='text-3xl font-bold'>Cart</h1>
        </div>
        <hr className='my-6'/>
        <div className=" space-y-10">
          {
            product.map((item, index) => (
              <div key={index} className='flex gap-10'>
                <img src={item.image} alt="" className='h-[180px] w-[110px] object-cover' />
                <div className='flex flex-col items-start justify-start gap-3'>
                    <h1 className='font-semibold text-lg capitalize'>{item.title}</h1>
                    <div className='space-x-3'>
                      <label className='text-xl font-semibold'>₹{item.price-(item.price*item.discount)/100}</label>
                      <del className='font-semibold text-red-600'>₹{item.price}</del>
                      <label className='text-green-600'>({item.discount}% off)</label>
                    </div>
                    <button className='bg-[dodgerblue] text-white px-4 py-2 rounded hover:bg-[#3e82ff]'>
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
