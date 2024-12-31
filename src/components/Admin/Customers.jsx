import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import firebaseAppConfig from '../../util/firebase-config'
import moment from 'moment'

const db = getFirestore(firebaseAppConfig)

const Customers = () => {

  const [customers, setCustomers] = useState([])

  useEffect(()=>{
    const req = async () => {
      const snapshot = await getDocs(collection(db, 'customers'))
      const tmp = []
      snapshot.forEach((doc)=>{
        const document = doc.data()
        tmp.push(document)
      })
      setCustomers(tmp)
    }
    req()
  }, [])
  return (
    <Layout>
      <div className='min-h-screen'>
        <h1 className='text-xl font-semibold'>Customer`s</h1>
        <div className='mt-6'>
          <table className='w-full'>
            <thead>
              <tr className='bg-[dodgerblue] text-white'>
                <th className='py-4'>Customer`s Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Date</th>
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
                      <td>{item.customerEmail}</td>
                      <td>{item.customerMobile}</td>
                      <td>{moment(item.createAt.toDate()).format('DD MMM YYYY')}</td>
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
