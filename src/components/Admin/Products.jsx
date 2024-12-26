import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import firebaseAppConfig from '../../util/firebase-config'
import { getFirestore, addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import Swal from 'sweetalert2'
import Loader from '../Loader'
import { getId } from 'firebase/installations'

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
  const [loader, setLoader] = useState(false)
  const [updateUI, setUpdateUI] = useState(false)

  useEffect(()=>{
    const req = async () => {
      const snapshot = await getDocs(collection(db, "products"))
      const tmp = []
      snapshot.forEach((doc)=>{
        const allProducts = doc.data()
        allProducts.imageId = doc.id
        tmp.push(allProducts)
      })
      setProducts(tmp)
    }
    req()
  }, [updateUI])


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
    }finally{
      setUpdateUI(!updateUI)
    }    
  }

  const handleFileUpload = async (e, id) => {
    try {
      const input = e.target
      const file = input.files[0]
      if(!file) return
      setLoader(true)
      const formData = new FormData()
      formData.append('file', file)
      formData.append("upload_preset", 'ecomerce')
      formData.append("cloud_name", 'dq6m3j3jf')
      const res = await fetch("https://api.cloudinary.com/v1_1/dq6m3j3jf/image/upload", {
        method: "POST",
        body: formData
      })
      const uploadedImageURL = await res.json()
      const imageURL = uploadedImageURL.url
      await addDoc(collection(db, 'images'), {
        image: imageURL,
        createdAt: new Date()
      })
      const ref = doc(db, 'products', id)
      await updateDoc(ref, { image: imageURL })      
    } catch (error) {
      new Swal({
        title: 'Error',
        text: error.message,
        icon: 'error',
      })
    }finally{
      setLoader(false)
      setUpdateUI(!updateUI)
    }
  }
  return (
    <Layout>
      <div className="min-h-screen">
        <div className="flex justify-between">
          <h1 className='text-xl font-semibold mb-4'>Product`s</h1>
          <button className='border px-2 py-3 text-white bg-[dodgerblue] rounded hover:bg-[deeppink]' onClick={()=>setProductModel(true)}>
            <i className='ri-sticky-note-add-line mr-1'></i>
            New Product
          </button>
        </div>

        {
          loader
          ?
          <Loader />
          :
          <div className=' grid md:grid-cols-5 grid-cols-1 gap-8 mt-3'>
            {
              products.map((item, index)=>(
                <div key={index} className='bg-white rounded-md shadow-xl border m-auto'>
                  <div className="relative overflow-hidden ">
                    <img src={item.image ? item.image : '/products/a.jpg'} className='object-cover'/>
                    <input type="file" className='opacity-0 w-full h-full absolute top-0 left-0' onChange={(e)=>handleFileUpload(e, item.imageId)}/>
                  </div>
                  <div className='px-2 py-4 '>
                    <h1 className='font-base text-left capitalize font-semibold'>{item.title}</h1>
                    <p className='text-gray-600 capitalize text-sm'>{item.description.slice(0,50)}...</p>
                    <div className='flex gap-1 mt-1'>
                      <label className='text-sm'>₹{item.price-(item.price*item.discount)/100}</label>
                      <del className='text-sm text-red-600'>₹{item.price}</del>
                      <label className='text-sm text-green-600'>({item.discount}% off)</label>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        }

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
