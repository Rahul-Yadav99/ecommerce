import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from './Layout'
import { Link } from 'react-router-dom'
import firebaseAppConfig from '../util/firebase-config'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'

const auth = getAuth(firebaseAppConfig)

const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [loader, setLoader] = useState(false)

  const [formValue, setFormValue] = useState({
    email : '',
    password : ''
  })

  const login = async (e) => {
    try{
      e.preventDefault()
      setLoader(true)
      await signInWithEmailAndPassword(auth, formValue.email, formValue.password)
      toast.success('Login Success')
      navigate('/')
    }catch(err){
      setError(err.message)
      toast.error('Error')
    }
    finally{
      setLoader(false)
    }
  }

  const handleChange = (e) => {
    const input = e.target
    const name = input.name
    const value = input.value
    setFormValue({
      ...formValue,
      [name] : value
    })
  }

  return (
    <Layout>
        <div className='w-10/12 m-auto py-8 grid md:grid-cols-2 grid-cols-1'>
            <img src="/img/singup.svg" alt="" className='' />
            <div className='flex flex-col justify-center'>
                <h1 className='text-3xl font-bold'>SignIn</h1>
                <p className='text-lg text-gray-600'>Enter profile details to login</p>
                <form className='mt-5 space-y-5' onSubmit={login}>
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold text-lg'>Email:</label>
                        <input onChange={handleChange} type="email" name="email" placeholder='rahul@gmail.com' required className='p-3 border border-gray-300 rounded'/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold text-lg'>Password:</label>
                        <input onChange={handleChange} type="password" name="password" placeholder='*******' required className='p-3 border border-gray-300 rounded'/>
                    </div>
                    {
                      loader ?
                      <h1 className='text-lg font-semibold text-green-600'>Loading...</h1>
                      :
                      <button 
                        className='mt-2 bg-[dodgerblue] py-3 px-6 rounded-lg w-fit text-white font-semibold hover:bg-[#3e82ff]' 
                        style={{
                          transition:'0.3s'
                        }}
                      >
                      Login
                    </button>
                    }
                </form>
                <div className='mt-3'>
                  Don`t have an account ? <Link to={'/signup'} className='text-blue-600'>Signup</Link>
                </div>
                {
                  error && 
                  <div className="mt-3 p-3 bg-red-600 text-white font-semibold">
                    <p>{error}</p>
                  </div>
                }
            </div>
        </div>
    </Layout>
  )
}

export default Login
