import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import firebaseAppConfig from '../util/firebase-config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, getDocs, collection, query, where, doc, deleteDoc, serverTimestamp, addDoc } from 'firebase/firestore';
import { useRazorpay } from 'react-razorpay';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(firebaseAppConfig)
const db = getFirestore(firebaseAppConfig)

const Cart = () => {

  const navigate = useNavigate()

  const { error, isLoading, Razorpay } = useRazorpay();
  
  const [products, setProducts] = useState([
  ])
  const [session, setSession] = useState(null)
  
  const [updateUi, setUpdateUi] = useState(false)

  const [address, setAddress] = useState(null)

  useEffect(()=>{
      onAuthStateChanged(auth, (user)=>{
        if(user){
          setSession(user)
        }else{
          setSession(null)
        }
      })
    }, [])

    useEffect(()=>{
      const res = async () => {
        if(session){
          const col = collection(db, 'carts')
          const q = query(col, where('userId', '==', session.uid))
          const snapshot = await getDocs(q)
          const tmp = []
          snapshot.forEach((doc)=>{
            const document = doc.data()
            document.cartId = doc.id
            tmp.push(document)
          })
          setProducts(tmp)
        }
      }
      res()
    }, [session, updateUi])

    useEffect(()=>{
        const req = async ()=>{
            if(session)
            {
                const col = collection(db, "addresses")
                const q = query(col, where("userId", "==", session.uid))
                const snapshot = await getDocs(q)
                snapshot.forEach((doc)=>{
                    const document = doc.data()
                    setAddress(document)
                })
            }
        }
    
        req()
    }, [session])

    const removeProduct = async (id) => {
      const ref = doc(db, "carts", id);
      await deleteDoc(ref);
      setUpdateUi(!updateUi)
    }

    const getPrice = (products) => {
      let sum = 0
      for(let item of products){
        let amount = item.price-(item.price*item.discount)/100
        sum = sum + amount
      }
      return sum
    }

    const buyNow = async ()=>{
      try {
          const amount = getPrice(products)
          const {data} = await axios.post('https://ecompayment.vercel.app/order', {amount: amount})
          const options = {
              key: 'rzp_test_W1As5WgUmla9nV',
              amount: data.amount,
              order_id: data.orderId,
              name: 'VibeNest',
              description: 'Bulk products',
              image: 'https://cdn-icons-png.freepik.com/512/7835/7835563.png',
              handler: async function(response) {
                  for(let item of products)
                  {
                      let product = {
                          ...item,
                          userId: session.uid,
                          status: 'pending',
                          email: session.email,
                          customerName: session.displayName,
                          createdAt: serverTimestamp(),
                          address: address
                      }
                      await addDoc(collection(db, "orders"), product)
                      await removeProduct(item.cartId)
                  }
                  navigate('/profile')
              },
              notes: {
                  name: session.displayName
              }
          }
          const rzp = new Razorpay(options)

          rzp.open()

          rzp.on("payment.failed", function(response) {
              navigate('/failed')
          })
      }
      catch(err)
      {
          console.log(err)
      }
  }

  return (
    <Layout update={updateUi}>
      <div className='md:w-8/12 w-9/12 m-auto py-8'>
        <div className='flex items-center gap-4'>
          <i className="ri-shopping-cart-line text-2xl font-bold"></i>
          <h1 className='text-2xl font-bold'>Cart</h1>
        </div>
        <hr className='my-6'/>
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-x-8 md:gap-y-8 gap-x-1 gap-y-3">
          {
            products.map((item, index) => (
              <div key={index} className='m-auto pb-2 rounded-lg shadow-xl'>
                <img src={item.image ? item.image : "https://via.placeholder.com/300x300"} alt="" className='w-72 h-72 object-cover rounded-lg' />
                <div className="flex justify-between">
                  <div className='flex flex-col items-start justify-start gap-y-1 mt-2 pl-2'>
                      <h1 className='text-base font-semibold capitalize'>{item.title}</h1>
                      <p className='text-gray-600 capitalize text-xs'>{item.description.slice(0,20)}...</p>
                      <div className='space-x-2 '>
                        <label className='text-gray-600 font-semibold text-sm'>₹{item.price-(item.price*item.discount)/100}</label>
                        <del className='text-red-600 text-xs'>₹{item.price}</del>
                        <label className='text-green-600 text-xs'>({item.discount}% off)</label>
                      </div>
                  </div>
                  <div className="flex justify-center items-center mt-2 pr-2">
                    <button onClick={()=>removeProduct(item.cartId)} className=''>
                      <i className="ri-delete-bin-6-line rounded-full p-3 bg-gray-500 hover:bg-gray-800 text-white"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <hr className='my-6'/>
        <div className='flex justify-between items-center'>
          <h1 className='text-lg font-semibold'>Total : ₹{Math.round(getPrice(products))}</h1>  
          <button className=' bg-[dodgerblue] text-white px-4 py-2 rounded hover:bg-[#3e82ff]' onClick={buyNow}>
          <i className="ri-shopping-bag-line mr-3"></i>
            Buy Now
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Cart
