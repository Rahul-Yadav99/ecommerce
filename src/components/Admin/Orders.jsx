import React, { useState } from 'react'
import Layout from './Layout'

const Orders = () => {

  const [orders, setOrders] = useState([
    {
      orderID : '#abc123',
      customerName : 'Rahul',
      email : 'rahul@gmail.com',
      mobile : '9910453106',
      product : 'iphone',
      amount: 50000,
      date : '12-10-2024'
    },
    {
      orderID : '#abc123',
      customerName : 'Rahul',
      email : 'rahul@gmail.com',
      mobile : '9910453106',
      product : 'iphone',
      amount: 50000,
      date : '12-10-2024'
    },
    {
      orderID : '#abc123',
      customerName : 'Rahul',
      email : 'rahul@gmail.com',
      mobile : '9910453106',
      product : 'iphone',
      amount: 50000,
      date : '12-10-2024'
    },
    {
      orderID : '#abc123',
      customerName : 'Rahul',
      email : 'rahul@gmail.com',
      mobile : '9910453106',
      product : 'iphone',
      amount: 50000,
      date : '12-10-2024'
    },
    {
      orderID : '#abc123',
      customerName : 'Rahul',
      email : 'rahul@gmail.com',
      mobile : '9910453106',
      product : 'iphone',
      amount: 50000,
      date : '12-10-2024'
    },
    {
      orderID : '#abc123',
      customerName : 'Rahul',
      email : 'rahul@gmail.com',
      mobile : '9910453106',
      product : 'iphone',
      amount: 50000,
      date : '12-10-2024'
    },
    {
      orderID : '#abc123',
      customerName : 'Rahul',
      email : 'rahul@gmail.com',
      mobile : '9910453106',
      product : 'iphone',
      amount: 50000,
      date : '12-10-2024'
    },
    {
      orderID : '#abc123',
      customerName : 'Rahul',
      email : 'rahul@gmail.com',
      mobile : '9910453106',
      product : 'iphone',
      amount: 50000,
      date : '12-10-2024'
    },
    {
      orderID : '#abc123',
      customerName : 'Rahul',
      email : 'rahul@gmail.com',
      mobile : '9910453106',
      product : 'iphone',
      amount: 50000,
      date : '12-10-2024'
    },
    {
      orderID : '#abc123',
      customerName : 'Rahul',
      email : 'rahul@gmail.com',
      mobile : '9910453106',
      product : 'iphone',
      amount: 50000,
      date : '12-10-2024'
    },
    {
      orderID : '#abc123',
      customerName : 'Rahul',
      email : 'rahul@gmail.com',
      mobile : '9910453106',
      product : 'iphone',
      amount: 50000,
      date : '12-10-2024'
    },
    {
      orderID : '#abc123',
      customerName : 'Rahul',
      email : 'rahul@gmail.com',
      mobile : '9910453106',
      product : 'iphone',
      amount: 50000,
      date : '12-10-2024'
    },
    {
      orderID : '#abc123',
      customerName : 'Rahul',
      email : 'rahul@gmail.com',
      mobile : '9910453106',
      product : 'iphone',
      amount: 50000,
      date : '12-10-2024'
    },
    {
      orderID : '#abc123',
      customerName : 'Rahul',
      email : 'rahul@gmail.com',
      mobile : '9910453106',
      product : 'iphone',
      amount: 50000,
      date : '12-10-2024'
    },
    {
      orderID : '#abc123',
      customerName : 'Rahul',
      email : 'rahul@gmail.com',
      mobile : '9910453106',
      product : 'iphone',
      amount: 50000,
      date : '12-10-2024'
    },
    {
      orderID : '#abc123',
      customerName : 'Rahul',
      email : 'rahul@gmail.com',
      mobile : '9910453106',
      product : 'iphone',
      amount: 50000,
      date : '12-10-2024'
    },
    {
      orderID : '#abc123',
      customerName : 'Rahul',
      email : 'rahul@gmail.com',
      mobile : '9910453106',
      product : 'iphone',
      amount: 50000,
      date : '12-10-2024'
    },
    {
      orderID : '#abc123',
      customerName : 'Rahul',
      email : 'rahul@gmail.com',
      mobile : '9910453106',
      product : 'iphone',
      amount: 50000,
      date : '12-10-2024'
    }
  ])

  return (
    <Layout>
      <div>
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
                      <td className='py-4'>{item.orderID}</td>
                      <td className='capitalize'>{item.customerName}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td className='capitalize'>{item.product}</td>
                      <td>₹{item.amount.toLocaleString()}</td>
                      <td>{item.date}</td>
                      <td className='capitalize'>
                        <select className='p-2 border border-gray-200'>
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="dispatched">Dispatched</option>
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
