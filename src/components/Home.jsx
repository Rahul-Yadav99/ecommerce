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

  const [brands, setBrands] = useState([
    {
      url : '/img/01.webp'
    },
    {
      url : '/img/02.webp'
    },
    {
      url : '/img/03.webp'
    },
    {
      url : '/img/04.webp'
    },
    {
      url : '/img/05.webp'
    },
    {
      url : '/img/06.webp'
    },
    {
      url : '/img/07.webp'
    },
    {
      url : '/img/08.webp'
    },
    {
      url : '/img/09.webp'
    },
    {
      url : '/img/10.webp'
    },
  ])
  return (
    <Layout>
      <Slider />
      <div className='md:w-8/12 w-9/12 m-auto py-8'>
        <h1 className='md:text-3xl text-2xl font-semibold text-gray-700 text-center'>Latest Products</h1>
        <p className='text-gray-600 text-sm md:text-base md:mt-3 mb-5 text-center'>Bring home the latest products designed to blend sophistication with practicality.</p>
        <div className='grid md:grid-cols-4 grid-cols-1 md:gap-8 gap-4 '>
          {
            products.map((item, index) => (
              <div key={index} className='m-auto border pb-2 rounded-lg shadow-xl'>
              <img src={item.image} alt="" className=' object-cover rounded-lg' />
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

      <div className='bg-white md:py-20 py-8 text-center shadow-xl'>
          <h1 className='md:text-3xl text-2xl font-semibold text-gray-700'>What We Offer!</h1>
          <p className='text-gray-500'>The purpose of lorem ipsum</p>
        <div className='grid md:grid-cols-4 grid-cols-1 gap-4 md:w-8/12 w-11/12 m-auto mt-3'>
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
      <hr />
      <div className="bg-white md:py-20 py-8 text-center shadow-xl">
        <h1 className='md:text-3xl text-2xl font-semibold text-gray-700'>Shop By Brands</h1>
        <p className='text-gray-500'>Select Your Favorite Brands And Purchase</p>
        <div className="grid md:grid-cols-5 grid-cols-2 gap-4 md:w-8/12 w-11/12 m-auto mt-3">
            {
              brands.map((item, index) => (
                <div key={index} className='border py-2 px-4 rounded-lg'>
                  <img src={item.url}  />
                </div>
                
              ))
            }
        </div>
      </div>     
    </Layout>
  )
}

export default Home
