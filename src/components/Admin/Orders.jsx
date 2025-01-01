import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import firebaseAppConfig from '../../util/firebase-config';
import { getFirestore, getDocs, collection, doc, updateDoc } from 'firebase/firestore';
import moment from 'moment'
import { toast } from 'react-toastify';

const db = getFirestore(firebaseAppConfig)
const Orders = () => {

  const [orders, setOrders] = useState([])

  useEffect(()=>{
    const req = async () => {
      const snapshot = await getDocs(collection(db, 'orders'))
      const tmp = []
      snapshot.forEach((doc)=>{
        const order = doc.data()
        order.order_id = doc.id
        tmp.push(order)
      })
      setOrders(tmp)
    }
    req()
  }, [])

  const updateOrderStatus = async (e, orderId) => {
    try {
      const status = e.target.value
      const ref = await doc(db, 'orders', orderId)
      await updateDoc(ref, {status : status})   
      toast.success('Order Status Updated')  
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Layout>
      <div className='min-h-screen'>
        <h1 className='text-xl font-semibold'>Orders</h1>
        <div className='mt-6'>
          <table className='w-full'>
            <thead>
              <tr className='bg-[dodgerblue] text-white'>
                <th className='py-4'>Order Id</th>
                <th>Customer`s Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Address</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {
                orders.map((item, index)=>{
                  return (
                    <tr key={index} 
                      className=' text-center'
                      style={{
                        background: (index+1)%2 === 0 ? 'white' : '#e2e8f0' 
                      }}
                    >
                      <td className='py-4'>{item.order_id}</td>
                      <td className='capitalize'>{item.userName}</td>
                      <td>{item.email}</td>
                      <td>{item.address.mobile}</td>
                      <td className='capitalize'>{item.title}</td>
                      <td>₹{item.price}</td>
                      <td>{moment(item.date).format('DD MMM YYYY')}</td>
                      <td>
                        {`${item.address.address}, ${item.address.city}, ${item.address.state}, ${item.address.country}`}
                      </td>
                      <td className='capitalize'>
                        <select className='p-2 border border-gray-200' onChange={(e)=>updateOrderStatus(e, item.order_id)}>
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="return">Return</option>
                        </select>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default Orders
