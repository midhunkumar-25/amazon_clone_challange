import React, { useState } from 'react';
import './Login.css'
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";
import { signInWithEmailAndPassword ,createUserWithEmailAndPassword } from "firebase/auth";

function Login() {
    const [{ user }, dispatch] = useStateValue();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const signin = (event)=>{
        event.preventDefault();
        signInWithEmailAndPassword(auth,email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            dispatch({
                type:"ADD_USER",
                item:user
                /*item: {
                    uid:user.uid,
                    email: user.email,
                  },*/
            });
            navigate('/')
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
          });
    }

    return(
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                />
            </Link>
            <div className='login__container'>
                <h1>Sign-in</h1>
                <form onSubmit={signin}>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' className='login__signInButton'>Sign In</button>
                </form>
                <div className="login__divider">
                    <h5>New to Amazon?</h5>
                </div>
                <Link to='/register' style={{ textDecoration: 'none' }}>
                    <button  className='login__registerButton'>Create your Amazon Account</button>
                </Link>
                
            </div>
        </div>
    )
}
export default Login;