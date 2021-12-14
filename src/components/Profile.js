import React,{useState} from 'react'
import { auth } from "../firebase";
import { updateProfile ,updatePhoneNumber } from "firebase/auth";
import "./Profile.css";
export default function Profile() {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [name, setName] = useState("")
    const user = auth.currentUser;
    //console.log(user.displayName,user.email,user.phoneNumber,)
    const editMail=(event)=>{
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
        updatePhoneNumber(user, 
            phone
          ).then(() => {
            // Profile updated!
            console.log("Profile updated!")
          }).catch((error) => {
            console.log(error)
          });      
    }
    const editName=(event)=>{
        event.preventDefault();
        updateProfile(user, {
            displayName: name
          }).then(() => {
            // Profile updated!
            console.log("Profile updated!")
          }).catch((error) => {
            console.log(error)
          });      
    }
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
                    <input type='text' placeholder={user?.phoneNumber} onChange={e => setPhone(e.target.value)} />
                    <button type='submit' className='profile__edit'>edit</button>
                </form>
            </div>


            </div>
        </div>
    )
}
