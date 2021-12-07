import React, { useState, useEffect } from 'react';
//import { db } from "../firebase";
import './Orders.css'
import { useStateValue } from "../StateProvider";
import Order from './Order'
import { doc, getDoc ,collection,query,getDocs,onSnapshot } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
const db = getFirestore();

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
  //const user = JSON.parse(localStorage.getItem("user")); 


  useEffect(() => {

    if(user) {
        console.log("user id",user?.uid)
        onSnapshot(collection(doc(db, 'users', user?.uid),"orders"),(snapshot)=>{ 
            console.log(snapshot.docs.map((doc)=>doc.data().created))
            setOrders(snapshot.docs.map((doc)=>doc.data()).sort((a,b)=> a.created > b.created ? -1 : 1))
        })
            
        console.log('userdoc ....');

    } else {
        setOrders([])
    }

  }, [])


    return (
        <div className='orders'>
            <h1>Your Orders</h1>

            <div className='orders__order'>
                {orders?.map((order,index) => (
                    <Order order={order} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Orders