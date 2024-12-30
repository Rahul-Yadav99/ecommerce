import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import Slider from './Slider';
import firebaseAppConfig from '../util/firebase-config';
import { getFirestore, addDoc, collection, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { useNavigate } from 'react-router-dom';
import Loader from './Loader'

const auth = getAuth(firebaseAppConfig)
const db = getFirestore(firebaseAppConfig)

const Home = ({slider, title='Latest Products'}) => {

  const navigate = useNavigate()

  const { error, isLoading, Razorpay } = useRazorpay();

  const [products, setProducts] = useState([
    // {
    //   title : 'Men`s Shirt blue denim',
    //   description : 'I am related to men`s product',
    //   price: 2000,
    //   discount: 50,
    //   image: '/products/a.jpg'
    // },
    // {
    //   title : 'Men`s Shirt blue denim',
    //   description : 'I am related to men`s product',
    //   price: 2000,
    //   discount: 15,
    //   image: '/products/b.jpg'
    // },
    // {
    //   title : 'Men`s Shirt blue denim',
    //   description : 'I am related to men`s product',
    //   price: 2000,
    //   discount: 15,
    //   image: '/products/c.jpg'
    // },
    // {
    //   title : 'Men`s Shirt blue denim',
    //   description : 'I am related to men`s product',
    //   price: 2000,
    //   discount: 15,
    //   image: '/products/d.jpg'
    // },
    // {
    //   title : 'Men`s Shirt blue denim',
    //   description : 'I am related to men`s product',
    //   price: 2000,
    //   discount: 15,
    //   image: '/products/e.jpg'
    // },
    // {
    //   title : 'Men`s Shirt blue denim',
    //   description : 'I am related to men`s product',
    //   price: 2000,
    //   discount: 15,
    //   image: '/products/a.jpg'
    // },
    // {
    //   title : 'Men`s Shirt blue denim',
    //   description : 'I am related to men`s product',
    //   price: 2000,
    //   discount: 15,
    //   image: '/products/g.jpg'
    // }
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

  const [session, setSession] = useState(null)

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setSession(user)
      }else{
        setSession(null)
      }
    })
  }, [])

  const addToCart = async (item) => {
    try{
      item.userId = session.uid;
      await addDoc(collection(db, "carts"), item)
      new Swal({
        title : 'Item Added',
        text : 'Item has been added to your cart',
        icon : 'success',
      })
    }catch(err){
      new Swal({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
      })
    }
  }

  useEffect(()=>{
    const req = async () => {
      const snapshot = await getDocs(collection(db, 'products'))
      const tmp = []
      snapshot.forEach((doc)=>{
        const allProducts = doc.data()
        allProducts.id = doc.id
        tmp.push(allProducts)
      })
      setProducts(tmp)
    }
    req()
  }, [])

  const buyNow = async (product) => {
    try {
      product.userId = session.uid
      product.status = 'Pending'
      product.userName = session.displayName
      product.email = session.email
      product.date = Date.now()
      const amount = Math.round(product.price-(product.price*product.discount)/100)
      const { data } = await axios.post('https://ecompayment.vercel.app/order', { amount : amount })
      const options = {
        key: 'rzp_test_W1As5WgUmla9nV',
        amount: data.amount,
        order_id : data.orderId,
        name : 'VibeNest',
        description : product.title,
        image : 'https://cdn-icons-png.freepik.com/512/7835/7835563.png',
        handler : async function(response){
          await addDoc(collection(db, 'orders'), product)
          navigate('/profile')
        }
      }
      const rzp = new Razorpay(options)

      rzp.open()

      rap.on('Payment Failed', function(response){
        navigate('/failed')
      })
    } catch (error) {
      console.log(error)
    }
  }

  if(session === null)
    return (
      <Loader />
    )

  return (
    <Layout>
      {
        slider && <Slider />
      }

      <div className="bg-white md:py-20 py-8 text-center">
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

    <hr />
    
      <div className='md:w-8/12 w-9/12 m-auto py-8'>
        <h1 className='md:text-3xl text-2xl font-semibold text-gray-700 text-center'>{title}</h1>
        <p className='text-gray-600 text-sm md:text-base md:mt-3 mb-5 text-center'>Bring home the latest products designed to blend sophistication with practicality.</p>
        <div className='grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-4 '>
          {
            products.map((item, index) => (
              <div key={index} className='m-auto pb-2 shadow-xl rounded-lg'>
              <img src={item.image ? item.image : "https://via.placeholder.com/300x300"} alt="" className='h-72 w-72 object-cover rounded-lg' />
              <div className='flex flex-col items-start justify-start mt-2 p-2'>
                  <h1 className='font-base text-left capitalize font-semibold'>{item.title}</h1>
                  <p className='text-gray-600 capitalize text-xs'>{item.description.slice(0,20)}...</p>
                  <div className='space-x-2'>
                    <label className='text-gray-600 text-sm font-semibold'>₹{item.price-(item.price*item.discount)/100}</label>
                    <del className='text-red-600 text-sm'>₹{item.price}</del>
                    <label className='text-green-600 text-sm'>({item.discount}% off)</label>
                  </div>
                  <button 
                    onClick={()=>buyNow(item)}
                    className='mt-1 rounded-lg bg-green-600 py-2 w-full px-3 text-white hover:bg-green-700' 
                    style={{
                     transition:'0.3s'
                    }}
                   >
                     Buy Now
                  </button>
                 <button 
                  onClick={() => addToCart(item)}
                  className='mt-1 rounded-lg bg-[dodgerblue] py-2 w-full px-3 text-white hover:bg-[#3e82ff]' 
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
          
    </Layout>
  )
}

export default Home
