import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import axios from 'axios'
import moment from 'moment'

const Payments = () => {

  const [payments, setPayments] = useState([])

  useEffect(()=>{
    const req = async () => {
      try{
        const { data } = await axios.get('https://ecompayment.vercel.app/payments')
        setPayments(data.items)
      }catch(err){
        console.log(err)
      }
    }

    req()
  }, [])

  return (
    <Layout>
      <div className='min-h-screen'>
        <h1 className='text-xl font-semibold'>Payment`s</h1>
        <div className='mt-6'>
          <table className='w-full'>
            <thead>
              <tr className='bg-[dodgerblue] text-white'>
                <th className='py-4'>Customer`s Name</th>
                <th>Payment Id</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Date</th>
                <th>Payment</th>
                <th>P. Name</th>
              </tr>
            </thead>

            <tbody>
              {
                payments.map((item, index)=>{
                  return (
                    <tr key={index} 
                      className=' text-center'
                      style={{
                        background: (index+1)%2 === 0 ? 'white' : '#e2e8f0' 
                      }}
                    >
                      <td className='capitalize py-4'>{item.notes.name ? item.notes.name : 'Joh Doe'}</td>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td>{item.contact}</td>
                      <td>{moment.unix(item.created_at).format('DD-MM-YYYY')}</td>
                      <td>₹{item.fee}</td>
                      <td>{item.description}</td>
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

export default Payments
