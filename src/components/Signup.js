import './Signup.css'
import React,{useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile ,updatePhoneNumber } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc  } from "firebase/firestore"; 
const db = getFirestore();
export default function Signup() {
    const [{ user }, dispatch] = useStateValue();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate();
    const signup = (event)=>{
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            let user_auth = auth.currentUser;
            updateProfile(user_auth, {
                displayName: name
              }).then(() => {
                // Profile name updated!
                console.log("Profile name updated!")
              }).catch((error) => {
                console.log(error)
              });
              setDoc(doc(db,"users",user_auth?.uid),{phoneNumber : phone})
            // Signed up
            let user = userCredential.user;
            dispatch({
                type:"ADD_USER",
                item: user,
            });
            // ...
            setName("")
            setPhone("")
            setEmail("")
            setPassword("")
            navigate('/')
        })
        .catch((error) => {
            setName("")
            setPhone("")
            setEmail("")
            setPassword("")
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        });    
    }
    return (
<div className='signup'>
            <Link to='/'>
                <img
                    className="signup__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                />
            </Link>
            <div className='signup__container'>
                <h1>Create Account</h1>
                <form onSubmit={signup}>
                    <h5>Your name</h5>
                    <input type='text' value={name} onChange={e => setName(e.target.value)} />

                    <h5>Mobile number</h5>
                    <input type='text' value={phone} onChange={e => setPhone(e.target.value)} />
                    <h5>Email</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' className='signup__signInButton'>Create Account</button>
                </form>
            </div>
        </div>
    )
}
