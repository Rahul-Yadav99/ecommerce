import React, { useState } from 'react'
import Layout from './Layout'
import Slider from './Slider';

const Home = () => {
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
    }
  ])

  const [weOffer, setWeOffer] = useState([
    {
      title : 'Free Delivery',
      icon : 'ri-truck-line text-[#376af7] text-5xl',
      p : 'Nor again is there anyone who loves or pursues or desires to obtain pain of itself.',
      borderBottem : 'bg-[#376af7] h-[4px] rounded-lg'
    },
    {
      title : 'Secure Payment',
      icon : 'ri-bank-card-line text-[#d93f48] text-5xl',
      p : 'Nor again is there anyone who loves or pursues or desires to obtain pain of itself.',
      borderBottem : 'bg-[#d93f48] h-[4px] rounded-lg'
    },
    {
      title : 'Free Return`s',
      icon : 'ri-shopping-cart-line text-[#1b8657] text-5xl',
      p : 'Nor again is there anyone who loves or pursues or desires to obtain pain of itself.',
      borderBottem : 'bg-[#1b8657] h-[4px] rounded-lg'
    },{
      title : '24/7 Support',
      icon : 'ri-customer-service-line text-[#fbc437] text-5xl',
      p : 'Nor again is there anyone who loves or pursues or desires to obtain pain of itself.',
      borderBottem : 'bg-[#fbc437] h-[4px] rounded-lg'
    },
  ])
  return (
    <Layout>
      <Slider />
      <div className='md:w-8/12 w-11/12 m-auto py-8'>
        <h1 className='text-3xl font-bold'>Latest Products</h1>
        <p className='text-gray-600 mt-3 mb-5'>Bring home the latest products designed to blend sophistication with practicality. Whether for daily use or special occasions, this is the must-have item of the season.</p>
        <div className='grid md:grid-cols-4 grid-cols-2 md:gap-8 gap-2 '>
          {
            products.map((item, index) => (
              <div key={index} className='bg-white shadow-xl border '>
                <div className='overflow-hidden'>
                  <img src={item.image} alt="" className='hover:scale-110 ' 
                  style={{
                    transition : '0.3s'
                  }}
                  />
                </div>
                <div className="p-2">
                  <h1 className='font-semibold '>{item.title}</h1>
                  <div className='space-x-3'>
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
      <div className='bg-white py-8 text-center shadow-xl'>
          <h1 className='md:text-3xl text-2xl font-semibold text-gray-700'>What We Offer!</h1>
          <p className='text-gray-500'>The purpose of lorem ipsum</p>
        <div className='grid md:grid-cols-4 grid-cols-1 gap-4 w-8/12 m-auto mt-3'>
            {
              weOffer.map((item, index) => (
                <div key={index} className='bg-white pt-4 border shadow-xl rounded-lg text-center'>
                  <i className={item.icon}></i>
                  <h1 className='text-2xl '>{item.title}</h1>
                  <p className=' text-gray-500 m-3'>{item.p}</p>
                  <div className={item.borderBottem} />
                </div>
              ))
            }
          </div>
        </div>
    </Layout>
  )
}

export default Home
