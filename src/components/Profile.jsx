import { useEffect, useState } from 'react'
import firebaseAppConfig from '../util/firebase-config'
import { onAuthStateChanged, getAuth, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { getFirestore, addDoc, collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore'
import Layout from './Layout'
import uploadFile from '../util/storage'
import Loader from './Loader'
import { toast } from 'react-toastify'

const auth = getAuth(firebaseAppConfig)
const db = getFirestore(firebaseAppConfig)

const Profile = ()=>{
    const [orders, setOrders] = useState([])
    const [uploading, setUploading] = useState(false)
    const navigate = useNavigate()
    const [session, setSession] = useState(null)
    const [formValue, setFormValue] = useState({
        fullname: '',
        email: '',
        mobile: ''
    })
    const [isAddress, setIsAddress] = useState(false)
    const [docId, setDocId] = useState(null)
    const [isUpdated, setIsUpdated] = useState(false)

    const [addressForm, setAddressForm] = useState({
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        userId: '',
        mobile: ''
    })

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user)
            {
                setSession(user)
            }
            else {
                setSession(false)
                navigate('/login')
            }
        })
    }, [])

    useEffect(()=>{
        const req = async ()=>{
            if(session)
            {
                setFormValue({
                    ...formValue,
                    fullname: session.displayName,
                    mobile: (session.phoneNumber ? session.phoneNumber : '')
                })
    
                setAddressForm({
                    ...addressForm,
                    userId: session.uid
                })
    
                // fetch address
                const col = collection(db, "addresses")
                const q = query(col, where("userId", "==", session.uid))
                const snapshot = await getDocs(q)
                
                setIsAddress(!snapshot.empty)

                snapshot.forEach((doc)=>{
                    setDocId(doc.id)
                    const address = doc.data()
                    setAddressForm({
                        ...addressForm,
                        ...address
                    })
                })
            }
        }
        req()
    }, [session, isUpdated])

    useEffect(()=>{
        const req = async ()=>{
            if(session)
            {
                const col = collection(db, "orders")
                const q = query(col, where("userId", "==", session.uid))
                const snapshot = await getDocs(q)
                const tmp = []
                snapshot.forEach((doc)=>{
                    tmp.push(doc.data())
                })
                setOrders(tmp)
            }
        }

        req()
    }, [session])

    const setProfilePicture = async (e)=>{
        const input = e.target
        const file = input.files[0]
        const filenameArray = file.name.split(".")
        const ext = filenameArray[filenameArray.length-1]
        const filename = Date.now()+'.'+ext
        const path = `pictures/${filename}`
        setUploading(true)
        const url = await uploadFile(file, path)
        await updateProfile(auth.currentUser,{
            photoURL: url
        })
        setUploading(false)
        setSession({
            ...session,
            photoURL: url
        })
    }

    const handleFormValue = (e)=>{
        const input = e.target
        const name = input.name
        const value = input.value
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    const saveProfileInfo = async (e)=>{
        e.preventDefault()
        
        await updateProfile(auth.currentUser, {
            displayName: formValue.fullname,
            phoneNumber: formValue.mobile
        })
        toast.success('Profile Saved !')
    }

    const setAddress = async (e)=>{
        try {
            e.preventDefault()
            await addDoc(collection(db, "addresses"), addressForm)
            setIsAddress(true)
            setIsUpdated(!isUpdated)
            toast.success('Address Saved !')
        }
        catch(err)
        {
            toast.error(err.message + 'Failed !')
        }
    }

    const updateAddress = async (e)=>{
        try {
            e.preventDefault()
            const ref = doc(db, "addresses", docId)
            await updateDoc(ref, addressForm)
            toast.success('Address Updated !')

        }
        catch(err)
        {
            toast.error(err.message)
        }
    }

    const handleAddressForm = (e)=>{
        const input = e.target
        const name = input.name
        const value = input.value
        setAddressForm({
            ...addressForm,
            [name]: value
        })
    }

    const getStatusColor = (status)=>{
        if(status === "processing")
            return "bg-blue-600"

        else if(status === "pending")
            return "bg-indigo-600"

        else if(status === "dispatched")
            return "bg-rose-600"

        else if(status === "return")
            return "bg-red-600"
        else if(status === 'delivered')
            return "bg-green-600"
        else 
            return "bg-cyan-600"
    }

    if(session === null)
    return (
      <Loader />
    )
    

    return (
        <Layout>
            <div className='mx-auto md:my-16 shadow-lg rounded-md p-4 md:w-7/12 border mt-4'>
                <div className='flex gap-3'>
                    <i className="ri-shopping-cart-line text-4xl"></i>
                    <h1 className="text-3xl font-semibold">Orders</h1>
                </div>

                <hr className='my-6' />

                {
                    orders.map((item, index)=>(
                        <div className='flex gap-3 mb-8' key={index}>
                            <img src={item.image} className='w-[100px]' />
                            <div>
                                <h1 className='capitalize font-semibold'>{item.title}</h1>
                                <p className='text-gray-600 text-xs capitalize'>{item.description.slice(0,50)}</p>
                                <div className='space-x-1'>
                                    <label className='font-semibold'>
                                    ₹{Math.round(item.price-(item.price*item.discount)/100)}
                                    </label>
                                    <del className='text-xs text-red-500'>₹{item.price}</del>
                                    <label className='text-xs text-green-500'>({item.discount} Off)%</label>
                                </div>
                                <button className={`mt-2 ${getStatusColor(item.status)} rounded px-5 py-2 text-sm text-white capitalize`}>
                                    {item.status ? item.status : 'pending'}
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='mx-auto md:my-16 shadow-lg rounded-md p-4 md:w-7/12 border mt-4'>
                <div className='flex gap-3'>
                    <i className="ri-user-line text-4xl"></i>
                    <h1 className="text-3xl font-semibold">Profile</h1>
                </div>

                <hr className='my-6' />

                <div className='w-24 h-24 mx-auto relative mb-6'>
                    {
                        uploading ? 
                        <img src="/images/loader.gif" />
                        :
                        <img src={session.photoURL ? session.photoURL : "/img/avtar.png"} className='rounded-full w-24 h-24 bg-gray-600'/>
                    }
                    <input type="file" accept="image/*" className='opacity-0 absolute top-0 left-0 w-full h-full' onChange={setProfilePicture} />
                </div>

                <form className='grid grid-cols-2 gap-6' onSubmit={saveProfileInfo}>
                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>Fullname</label>

                        <input 
                            onChange={handleFormValue}
                            required
                            name="fullname"
                            className='p-2 rounded border border-gray-300'
                            value={formValue.fullname}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>Email</label>
                        <input 
                            disabled
                            onChange={handleFormValue}
                            required
                            name="email"
                            type="email"
                            className='p-2 rounded border border-gray-300'
                            value={session.email}
                        />
                    </div>

                    <div />
                    <div className='col-span-2'>
                    <button className='px-4 py-2 bg-[dodgerblue] text-white rounded w-fit'>
                        <i className="ri-save-line mr-2"></i>
                        Save
                    </button>
                    </div>
                </form>
            </div>

            <div className='mx-auto md:my-16 shadow-lg rounded-md p-4 md:w-7/12 border mt-4'>
                <div className='flex gap-3'>
                    <i className="ri-link-unlink-m text-4xl"></i>
                    <h1 className="text-3xl font-semibold">Delivery Address</h1>
                </div>

                <hr className='my-6' />

                <form className='grid grid-cols-2 gap-6' onSubmit={isAddress ? updateAddress : setAddress}>
                    <div className='flex flex-col gap-2 col-span-2'>
                        <label className='text-lg font-semibold'>Area/Street/Vill</label>
                        <input
                            onChange={handleAddressForm} 
                            required
                            name="address"
                            type="text"
                            className='p-2 rounded border border-gray-300'
                            value={addressForm.address}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>City</label>
                        <input 
                            onChange={handleAddressForm} 
                            required
                            name="city"
                            type="text"
                            className='p-2 rounded border border-gray-300'
                            value={addressForm.city}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>State</label>
                        <input 
                            onChange={handleAddressForm} 
                            required
                            name="state"
                            type="text"
                            className='p-2 rounded border border-gray-300'
                            value={addressForm.state}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>Country</label>
                        <input 
                            onChange={handleAddressForm} 
                            required
                            name="country"
                            type="text"
                            className='p-2 rounded border border-gray-300'
                            value={addressForm.country}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-lg font-semibold'>Pincode</label>
                        <input 
                            onChange={handleAddressForm} 
                            required
                            name="pincode"
                            type="number"
                            className='p-2 rounded border border-gray-300'
                            value={addressForm.pincode}
                        />
                    </div>

                    <div className='flex flex-col gap-2' id="address">
                        <label className='text-lg font-semibold'>Mobile</label>
                        <input 
                            onChange={handleAddressForm}
                            required
                            name="mobile"
                            type="number"
                            className='p-2 rounded border border-gray-300'
                            value={addressForm.mobile}
                        />
                    </div>
                    <div className='col-span-2'>
                    {
                        isAddress ? 
                        <button className='px-4 py-2 bg-[dodgerblue] text-white rounded w-fit '>
                            <i className="ri-save-line mr-2"></i>
                            Save
                        </button>
                        :
                        <button className='px-4 py-2 bg-[dodgerblue] text-white rounded w-fit '>
                            <i className="ri-save-line mr-2"></i>
                            Submit
                        </button>
                    }

</div>
                </form>
            </div>
        </Layout>
    )
}

export default Profile