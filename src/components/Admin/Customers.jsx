import React, { useState } from 'react'
import Layout from './Layout'

const Customers = () => {

  const [customers, setCustomers] = useState([
    {
      customerName : 'Rahul',
      email : 'rahul@gmail.com',
      mobile : '9910453106',
      date : '12-10-2024',
      address : 'Sonia Vihar, New Delhi, Delhi-110094'
    }
  ])

  return (
    <Layout>
      <div>
        <h1 className='text-xl font-semibold'>Customer`s</h1>
        <div className='mt-6'>
          <table className='w-full'>
            <thead>
              <tr className='bg-[dodgerblue] text-white'>
                <th className='py-4'>Customer`s Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Date</th>
                <th>Address</th>
              </tr>
            </thead>

            <tbody>
              {
                customers.map((item, index)=>{
                  return (
                    <tr key={index} 
                      className=' text-center'
                      style={{
                        background: (index+1)%2 === 0 ? 'white' : '#e2e8f0' 
                      }}
                    >
                      <td className='capitalize py-4'>{item.customerName}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td>{item.date}</td>
                      <td>{item.address}</td>
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

export default Customers
