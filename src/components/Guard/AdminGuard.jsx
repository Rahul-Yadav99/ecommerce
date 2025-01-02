import React, { useEffect, useState } from 'react'
import firebaseAppConfig from '../../util/firebase-config'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate, Outlet, Navigate } from 'react-router-dom'
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore'
import Loader from '../Loader'

const auth = getAuth(firebaseAppConfig)
const db = getFirestore(firebaseAppConfig)

const AdminGuard = () => {
    
    const navigate = useNavigate()
    const [session, setSession] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setSession(user);
                
            }else{
                navigate('/')
                return false
            }
        })
    }, [])

    useEffect(()=>{
        const req = async () => {
            if(session){
                const col = collection(db, 'customers')
                const q = query(col, where('customerId', '==', session.uid)) 
                const snapshot = await getDocs(q)
                let role = null
                snapshot.forEach((doc)=>{
                    const customer = doc.data()
                    role = customer.role
                });
                if(role === 'user'){
                    navigate('/')
                    return false
                }else{
                    setIsAdmin(true)
                }

            }
        }
        req()
    }, [session])

    if(location.pathname === "/admin")
        return <Navigate to="/admin/dashboard" />


    if(isAdmin) return <Outlet />

  return (
    <div>
      <Loader />
    </div>
  )
}

export default AdminGuard
