import React,{useState,useEffect} from 'react'
import "./Address.css";
import {useStateValue} from "../StateProvider";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc ,getDoc  } from "firebase/firestore"; 
const db = getFirestore();
export default function Address() {
    const [details, setDetails] = useState({name:"",phone:"",pin:"",flat:"",street:"",landmark:"",city:""})
    const[{user},dispatch] =useStateValue();
    const saveAddress=(event)=>{
        event.preventDefault();
       setDoc(doc(db,"users",user.uid),{address:details}, { merge: true }) 
    }
    useEffect(() => {
        async function get_address(){
            let docref = doc(db,"users",user?.uid)
            const docSnap =  await getDoc(docref);
            if (docSnap.exists()) {
                docSnap.data()?.address && setDetails(docSnap.data()?.address) ;
            } else {
              console.log("No such document!");
            }
          }
          get_address()
    }, [])
    return (
        <div className="address">
            <div className='address__title'>           
                <h1>Your Addresses</h1> 
            </div>
            <div className="address__container">
            <form onSubmit={saveAddress}>
                <h5>Full name</h5>
                    <input type='text' placeholder={details?.name} onChange={e => setDetails({...details,name:e.target.value})} />            
                <h5>Mobile number</h5>
                    <input type='text' placeholder={details?.phone} onChange={e => setDetails({...details,phone:e.target.value})} />           
                <h5>Pincode</h5>
                    <input type='text' placeholder={details?.pin} onChange={e => setDetails({...details,pin:e.target.value})} />
                <h5>Flat, House no., Building, Company, Apartment</h5>
                    <input type='text' placeholder={details?.flat} onChange={e => setDetails({...details,flat:e.target.value})} />
                <h5>Area, Street, Sector, Village</h5>
                    <input type='text' placeholder={details?.Street} onChange={e => setDetails({...details,street:e.target.value})} />
                <h5>Landmark</h5>
                    <input type='text' placeholder={details?.landmark} onChange={e => setDetails({...details,landmark:e.target.value})} />
                <h5>Town/City</h5>
                    <input type='text' placeholder={details?.city} onChange={e => setDetails({...details,city:e.target.value})} />              
                <button className='address__edit' type='submit'>save address</button>
            </form>
            </div>
        </div>
    )
}
