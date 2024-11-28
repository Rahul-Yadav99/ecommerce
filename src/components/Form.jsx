import React, { useEffect } from 'react'
import { useState } from 'react'
import firebaseAppConfig from '../util/firebase-config'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { addDoc, collection, getFirestore, getDoc } from 'firebase/firestore'
import { doc } from 'firebase/firestore'
import Swal from 'sweetalert2'

const Form = () => {

    const auth = getAuth(firebaseAppConfig)
    const db = getFirestore(firebaseAppConfig)

    const [session, setSession] = useState(null)

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if(user){
                setSession(user)
            }else{
                setSession(null)
            }
        })
    },[])

    

    const model = {
        area : '',
        city : '',
        state : '',
        country : '',
        pincode : '',
        mobile : '',
    }

    const [form, setForm] = useState(model)

    const getFormValue = (e) => {
        const input = e.target;
        const value = input.value;
        const name = input.name;
        setForm({
            ...form,
            [name] : value
        })
    }

    const addressSave = async (e) => {
        try{
            e.preventDefault()
            await addDoc(collection(db, 'addresses'), form);
            new Swal({
                title: 'Address Saved',
                text: 'Your address has been saved successfully',
                icon: 'success',
                confirmButtonText: 'OK',
            })
        }catch(err){
            new Swal({
                title: 'Error',
                text: 'Error saving address',
                icon: 'error',
                confirmButtonText: 'OK',
            })
        }
    }

    useEffect(()=>{

        const req = async () => {
            if(session){
                const userId = session.uid;
                console.log(userId)
                const ref = doc(db, 'addresses', userId);
                const docSnap = await getDoc(ref);
                console.log(docSnap.data())
    
            }
            else{
                console.log('no user')
            }
        }
        
        req()
    },[session])
  return (
        <section className="md:w-8/12  m-auto py-8 shadow-xl px-4 md:mt-4 border rounded-lg relative">
            <h1 className="text-gray-600 font-semibold md:text-xl text-lg">Delivery Address</h1>
            {/* <h1>{session.displayName}</h1> */}
            <form className="grid grid-cols-2 md:gap-6 gap-2 py-4" onSubmit={addressSave}>
            <div className="flex flex-col gap-2 col-span-2">
                <label className="text-gray-600">Area/Street/Vill:</label>
                <input type="text" name="area" className="border border-gray-300 rounded-md p-2" onChange={getFormValue} />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-gray-600">City:</label>
                <input type="text" name="city" className="border border-gray-300 rounded-md p-2" onChange={getFormValue}  />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-gray-600">State:</label>
                <input type="text" name="state" className="border border-gray-300 rounded-md p-2" onChange={getFormValue}  />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-gray-600">Country:</label>
                <input type="text" name="country" className="border border-gray-300 rounded-md p-2" onChange={getFormValue}  />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-gray-600">Pincode:</label>
                <input type="number" name="pincode" className="border border-gray-300 rounded-md p-2" onChange={getFormValue}  />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-gray-600">Mobile:</label>
                <input type="number" name="mobile" className="border border-gray-300 rounded-md p-2" onChange={getFormValue}  />
            </div>

            <div className="col-span-2 mt-2">
                <button className="px-4 py-2 bg-[dodgerblue] text-white rounded w-fit">
                <i className="ri-save-line mr-2"></i>
                Save
                </button>
            </div>
            </form>
        </section>
  )
}

export default Form
