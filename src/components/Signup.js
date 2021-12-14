import './Signup.css'
import React,{useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile ,updatePhoneNumber } from "firebase/auth";

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
            // Signed in 
            const user = userCredential.user;
            dispatch({
                type:"ADD_USER",
                item: {
                    uid:user.uid,
                    email: user.email,
                  },
            });
            // ...
        })
        .catch((error) => {
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
                    <input type='text' value={email} onChange={e => setName(e.target.value)} />

                    <h5>Mobile number</h5>
                    <input type='number' value={password} onChange={e => setPhone(e.target.value)} />
                    <h5>Email</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' className='signup__signInButton'>Continue</button>
                </form>
            </div>
        </div>
    )
}
