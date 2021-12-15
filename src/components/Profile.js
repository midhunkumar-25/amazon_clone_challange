import React,{useState,useEffect} from 'react'
import { auth } from "../firebase";
import { updateProfile  } from "firebase/auth";
import "./Profile.css";
import {useStateValue} from "../StateProvider";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc ,getDoc  } from "firebase/firestore"; 
const db = getFirestore();
export default function Profile() {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [name, setName] = useState("")
    const[{user},dispatch] =useStateValue();
    //const user = auth.currentUser;
    //console.log(user.displayName,user.email,user.phoneNumber,)
    const editMail=(event)=>{
        let user = auth.currentUser;
        event.preventDefault();
        updateProfile(user, {
            email: email
          }).then(() => {
            // Profile updated!
            console.log("Profile updated!")
          }).catch((error) => {
            console.log(error)
          });      
    }
    const editPhone= (event)=>{
        event.preventDefault();
        setDoc(doc(db,"users",user?.uid),{phoneNumber : phone}, { merge: true })
    }
    const editName=(event)=>{
        event.preventDefault();
        let user = auth.currentUser;
        updateProfile(user, {
            displayName: name
          }).then(() => {
            // Profile updated!
            console.log("Profile updated!")
          }).catch((error) => {
            console.log(error)
          });      
    }
    useEffect(() => {
      async function get_phone(){
        let docref = doc(db,"users",user?.uid)
        const docSnap =  await getDoc(docref);
        if (docSnap.exists()) {
          setPhone(docSnap.data().phoneNumber) ;
        } else {
          console.log("No such document!");
        }
      }
      get_phone()

      
    }, [])
    return (
        <div className="profile">
            <div className='profile__title'>           
                <h1>Login & security</h1> 
            </div>
            <div className="profile__container">
            <div className="profile__form">
                <h4>Name:</h4>
                <form onSubmit={editName}>
                    <input type='text' placeholder={user?.displayName} onChange={e => setName(e.target.value)} />
                    <button type='submit' className='profile__edit'>edit</button>
                </form>
            </div>
            <div className="profile__form">
                <h4>E-mail:</h4>
                <form onSubmit={editMail}>
                    <input type='text' placeholder={user?.email} onChange={e => setEmail(e.target.value)} />
                    <button type='submit' className='profile__edit'>edit</button>
                </form>
            </div>
            <div className="profile__form">
                <h4>Mobile Phone Number:</h4>
                <form onSubmit={editPhone}>
                    <input type='text' placeholder={phone} onChange={e => setPhone(e.target.value)} />
                    <button type='submit' className='profile__edit'>edit</button>
                </form>
            </div>
            </div>
        </div>
    )
}
