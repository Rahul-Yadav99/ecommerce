import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import firebaseAppConfig from '../../util/firebase-config'
import { getFirestore, addDoc, collection, getDocs } from 'firebase/firestore'
import Swal from 'sweetalert2'

const db = getFirestore(firebaseAppConfig)

const Products = () => {

  const [products, setProducts] = useState([
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
    //   image: '/products/l.jpg'
    // },
    // {
    //   title : 'Men`s Shirt blue denim',
    //   description : 'I am related to men`s product',
    //   price: 2000,
    //   discount: 15,
    //   image: '/products/g.jpg'
    // },
    // {
    //   title : 'Men`s Shirt blue denim',
    //   description : 'I am related to men`s product',
    //   price: 2000,
    //   discount: 15,
    //   image: '/products/h.jpg'
    // },
    // {
    //   title : 'Men`s Shirt blue denim',
    //   description : 'I am related to men`s product',
    //   price: 2000,
    //   discount: 15,
    //   image: '/products/i.jpg'
    // },
    // {
    //   title : 'Men`s Shirt blue denim',
    //   description : 'I am related to men`s product',
    //   price: 2000,
    //   discount: 15,
    //   image: '/products/j.jpg'
    // },
    // {
    //   title : 'Men`s Shirt blue denim',
    //   description : 'I am related to men`s product',
    //   price: 2000,
    //   discount: 15,
    //   image: '/products/k.jpg'
    // },
    // {
    //   title : 'Men`s Shirt blue denim',
    //   description : 'I am related to men`s product',
    //   price: 2000,
    //   discount: 15,
    //   image: '/products/l.jpg'
    // },
  ])

  const model = {
    title: '',
    description: '',
    price: '',
    discount: '',
  }

  const [productForm, setProductForm] = useState(model)
  const [productModel, setProductModel] = useState(false)

  useEffect(()=>{
    const req = async () => {
      const snapshot = await getDocs(collection(db, "products"))
      const tmp = []
      snapshot.forEach((doc)=>{
        const allProducts = doc.data()
        tmp.push(allProducts)
      })
      setProducts(tmp)
    }
    req()
  }, [products])

  const handleProductForm = (e) => {
    const input = e.target
    const name = input.name
    const value = input.value
    setProductForm({
      ...productForm,
      [name]: value
    })
    
  }

  const createProduct = async (e) => {
    try {
      e.preventDefault()
      await addDoc(collection(db, 'products'), productForm)  
      setProductForm(model)
      new Swal({
        title: 'Product Added',
        text: 'Product Added Successfully',
        icon: 'success',
      })  
    } catch (error) {
      new Swal({
        title: 'Error',
        text: error.message,
        icon: 'error',
      })
    }    
  }
  return (
    <Layout>
      <div className="min-h-screen">
        <div className="flex justify-between">
          <h1 className='text-xl font-semibold mb-4'>Product`s</h1>
          <h1 className='text-xl font-semibold mb-4'>Rahul</h1>
          <button className='border px-2 py-3 text-gray-600 bg-gray-100 rounded hover:bg-gray-50' onClick={()=>setProductModel(true)}>
            <i className='ri-sticky-note-add-line mr-1'></i>
            New Product
          </button>
        </div>

        <div className=' grid md:grid-cols-5 grid-cols-1 gap-8 '>
          {
            products.map((item, index)=>(
              <div key={index} className='bg-white rounded-md shadow-xl'>
                <img src={item.image} alt=""/>
                <div className='p-4'>
                  <h1 className='font-base text-left'>{item.title}</h1>
                  <p className='text-gray-600'>{item.description.slice(0,50)}...</p>
                  <div className='flex gap-2 mt-1'>
                    <label>₹{item.price-(item.price*item.discount)/100}</label>
                    <del className='font-semibold text-red-600'>₹{item.price}</del>
                    <label className='text-green-600'>({item.discount}% off)</label>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        {
          productModel && 
          <div className="bg-gray-800 bg-opacity-80 absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="bg-white w-6/12 py-4 px-6 rounded-md relative">
              <button className='absolute top-3 right-3' onClick={()=>setProductModel(false)}>
                <i className="ri-close-line text-lg font-semibold"></i>
              </button>
              <h1 className='text-lg font-semibold'>New Product</h1>
              <form onSubmit={createProduct} className='grid grid-cols-2 mt-4 gap-4'>
                <input type="text" name="title" placeholder='Enter product title here' required onChange={handleProductForm} value={productForm.title} className='col-span-2 p-2 border border-gray-300 rounded'/>
                <input type="number" name="price" placeholder='Enter product price here' required onChange={handleProductForm} value={productForm.price} className='p-2 border border-gray-300 rounded'/>
                <input type="number" name="discount" placeholder='Enter discount discount here' required onChange={handleProductForm} value={productForm.discount} className='p-2 border border-gray-300 rounded'/>
                <textarea name="description" placeholder='Description' required onChange={handleProductForm} value={productForm.description} className='col-span-2 p-2 border border-gray-300 rounded' rows={10} ></textarea>
                <div>
                  <button className='bg-[dodgerblue] text-white py-2 px-4 rounded hover:bg-[deeppink]'>Submit</button>
                </div>
              </form>
            </div>
          </div>
        }
      </div>
    </Layout>
  )
}

export default Products
