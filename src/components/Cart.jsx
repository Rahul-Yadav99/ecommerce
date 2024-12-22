import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import firebaseAppConfig from '../util/firebase-config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, getDocs, collection, query, where, doc, deleteDoc } from 'firebase/firestore';

const auth = getAuth(firebaseAppConfig)
const db = getFirestore(firebaseAppConfig)

const Cart = () => {

  const [products, setProducts] = useState([
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

    useEffect(()=>{
      const res = async () => {
        if(session){
          const col = collection(db, 'carts')
          const q = query(col, where('userId', '==', session.uid))
          const snapshot = await getDocs(q)
          const tmp = []
          snapshot.forEach((doc)=>{
            const document = doc.data()
            tmp.push(document)
          })
          setProducts(tmp)
        }
      }
      res()
    }, [session])

    const removeProduct = async (index) => {
      const ref = doc(db, 'carts', index);
      await deleteDoc(ref);
    }

  return (
    <Layout>
      <div className='md:w-8/12 w-9/12 m-auto p-8'>
        <div className='flex items-center gap-4'>
          <i className="ri-shopping-cart-line text-3xl font-bold"></i>
          <h1 className='text-3xl font-bold'>Cart</h1>
        </div>
        <hr className='my-6'/>
        <div className="grid md:grid-cols-4 grid-cols-1 md:gap-x-8 md:gap-y-8 gap-x-1 gap-y-3">
          {
            products.map((item, index) => (
              <div key={index} className='m-auto border pb-2 rounded-lg shadow-xl'>
                <img src={item.image} alt="" className='object-cover rounded-lg' />
                <div className='flex flex-col items-start justify-start gap-y-1 mt-2 pl-2'>
                    <h1 className='text-gray-600 text-base capitalize'>{item.title}</h1>
                    <div className='space-x-2'>
                      <label className='text-gray-600 font-semibold'>₹{item.price-(item.price*item.discount)/100}</label>
                      <del className='text-red-600'>₹{item.price}</del>
                      <label className='text-green-600'>({item.discount}% off)</label>
                    </div>
                    <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700'
                      onClick={()=>removeProduct()}
                    >
                      <i className="ri-delete-bin-6-line mr-1"></i>
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
