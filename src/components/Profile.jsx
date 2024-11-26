import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import firebaseAppConfig from "../util/firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { json, useNavigate } from "react-router-dom";
import { getFirestore, addDoc, collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore'

import Swal from "sweetalert2";

const auth = getAuth(firebaseAppConfig);
const db = getFirestore(firebaseAppConfig);

const Profile = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  const [formValue, setFormValue] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    mobile: "",
    userId: "",
    userName: "",
    userEmail: "",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession(user);

        // setFormValue({
        //   ...formValue,
        //   userId: user.uid,
        //   userName: user.displayName,
        //   userEmail: user.email
        // })
      } else {
        setSession(null);
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    const req = async () => {
      if (session) {
        setFormValue({
          ...formValue,
          userId: session.uid,
          userName: session.displayName,
          userEmail: session.email,
        });
        const col = collection(db, "addresses");
        const q = query(col, where("userId", "==", session.uid))
        const snapshot = await getDocs(q);
        
        snapshot.forEach((doc) => {
          const address = doc.data()
          setFormValue({
            ...formValue,
            ...address
          })
          console.log(address);
          
        });
      }
    };
    req();
  }, [session]);
  // console.log(formValue)

  const handleOnChange = (e) => {
    const input = e.target;
    const name = input.name;
    const value = input.value;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const saveAddressInfo = async (e) => {
    try {
      e.preventDefault();
      await addDoc(collection(db, "addresses"), formValue);
      new Swal({
        icon: "success",
        title: "Address Saved",
      });
    } catch (err) {
      new Swal({
        icon: "error",
        title: "Failed",
        text: err.message,
      });
    }
  };
  return (
    <Layout>
      <div className="w-11/12 md:w-8/12 m-auto py-8">
        <div className="bg-white rounded shadow-lg md:p-8 p-2 border">
          <div className="flex gap-3">
            <i className="ri-user-line text-gray-600 md:text-3xl text-xl font-bold"></i>
            <h1 className="text-gray-600 md:text-3xl text-xl font-bold">Profile</h1>
          </div>
          <div className="h-[1px] mt-3 bg-[dodgerblue]" />
          <div className="grid md:grid-cols-3 grid-cols-1 md:gap-8">
            <div className="bg-white rounded mt-8 shadow-lg md:p-8 p-2 border md:col-span-2">
              <div className="flex gap-3">
                <i className="ri-link-unlink-m text-gray-600 md:text-3xl text-xl font-bold"></i>
                <h1 className="text-gray-600 md:text-3xl text-xl font-bold">
                  Delivery Address
                </h1>
              </div>
              <div className="h-[1px] mt-3 bg-[dodgerblue] mb-3" />
              <form
                className="grid grid-cols-2 md:gap-6 gap-2"
                onSubmit={saveAddressInfo}
              >
                <div className="flex flex-col gap-2 col-span-2">
                  <label className="font-semibold text-lg">
                    Area/Street/Vill:
                  </label>
                  <input
                    onChange={handleOnChange}
                    name="address"
                    type="text"
                    className="p-3 border border-gray-300 rounded"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-lg">City:</label>
                  <input
                    onChange={handleOnChange}
                    name="city"
                    type="text"
                    className="p-3 border border-gray-300 rounded"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-lg">State:</label>
                  <input
                    onChange={handleOnChange}
                    name="state"
                    type="text"
                    className="p-3 border border-gray-300 rounded"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-lg">Country:</label>
                  <input
                    onChange={handleOnChange}
                    name="country"
                    type="text"
                    className="p-3 border border-gray-300 rounded"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-lg">Pincode:</label>
                  <input
                    onChange={handleOnChange}
                    name="pincode"
                    type="number"
                    className="p-3 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-lg">Mobile:</label>
                  <input
                    onChange={handleOnChange}
                    name="mobile"
                    type="number"
                    className="p-3 border border-gray-300 rounded"
                  />
                </div>
                <div className="col-span-2">
                  <button className="px-4 py-2 bg-[dodgerblue] text-white rounded w-fit hover:bg-[#3e82ff]">
                    <i className="ri-save-line mr-2"></i>
                    Save
                  </button>

                  {/* <button className='px-4 py-2 bg-[#d1221d] text-white rounded w-fit hover:bg-[#f72822]'>
                    <i className="ri-save-line mr-2"></i>
                    Submit
                    </button> */}
                </div>
              </form>
            </div>
            <div className="bg-white rounded mt-8 shadow-lg p-8 border">
              <img
                src="/img/avtar.png"
                alt=""
                className="w-14 h-14 bg-gray-600 rounded-full mb-3 mt-3"
              />
              <h1 className="font-semibold text-lg mt-4">
                 Name: <span className="text-gray-600">{formValue.userName}</span>
              </h1>
              <h1 className="font-semibold text-lg mt-4">
                 Email: <span className="text-gray-600">{formValue.userEmail}</span>
              </h1>
              <h1 className="font-semibold text-lg mt-4">
                 Area: <span className="text-gray-600">{formValue.address}</span>
              </h1>
              <h1 className="font-semibold text-lg mt-4">
                 City: <span className="text-gray-600">{formValue.city}</span>
              </h1>
              <h1 className="font-semibold text-lg mt-4">
                 State: <span className="text-gray-600">{formValue.state}</span>
              </h1>
              <h1 className="font-semibold text-lg mt-4">
                 Country: <span className="text-gray-600">{formValue.country}</span>
              </h1>
              <h1 className="font-semibold text-lg mt-4">
                 Pincode: <span className="text-gray-600">{formValue.pincode}</span>
              </h1>
              <h1 className="font-semibold text-lg mt-4">
                 Mobile: <span className="text-gray-600">{formValue.mobile}</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
