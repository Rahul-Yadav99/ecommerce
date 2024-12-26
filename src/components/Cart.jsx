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
  
  const [updateUi, setUpdateUi] = useState(false)

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

    const removeProduct = async (id) => {
      const ref = doc(db, "carts", id);
      await deleteDoc(ref);
      setUpdateUi(!updateUi)
    }


  return (
    <Layout>
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
                <img src={item.image ? item.image : "https://via.placeholder.com/300x300"} alt="" className='w-[300px] h-[300px] object-cover rounded-lg' />
                <div className='flex flex-col items-start justify-start gap-y-1 mt-2 pl-2'>
                    <h1 className='text-gray-600 text-base capitalize'>{item.title}</h1>
                    <p className='text-gray-600 capitalize text-sm'>{item.description.slice(0,50)}...</p>
                    <div className='space-x-2'>
                      <label className='text-gray-600 font-semibold'>₹{item.price-(item.price*item.discount)/100}</label>
                      <del className='text-red-600'>₹{item.price}</del>
                      <label className='text-green-600'>({item.discount}% off)</label>
                    </div>
                    <button onClick={()=>removeProduct(item.cartId)} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700'>
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
