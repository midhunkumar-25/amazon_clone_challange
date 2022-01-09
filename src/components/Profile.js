import React,{useState,useEffect} from 'react'
import { auth } from "../firebase";
import { updateProfile  } from "firebase/auth";
import "./Profile.css";
import CloseIcon from '@mui/icons-material/Close';
import {useStateValue} from "../StateProvider";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc ,getDoc  } from "firebase/firestore"; 
import { useSelector, useDispatch } from 'react-redux';
import {adduser,clearuser } from '../userSlice';
import {  useNavigate } from "react-router-dom";
const db = getFirestore();
export default function Profile() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false)
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [name, setName] = useState("")
    //const[{user},dispatch] =useStateValue();
    const user = useSelector((state) => state.user.user)
    //const user = auth.currentUser;
    //console.log(user.displayName,user.email,user.phoneNumber,)
    const editMail=(event)=>{
        let user_auth = auth.currentUser;
        event.preventDefault();
        updateProfile(user_auth, {
            email: email
          }).then(() => {
            // Profile updated!
            console.log("Profile updated!")
            setModal(true) 
          }).catch((error) => {
            console.log(error)
          });      
    }
    const editPhone= (event)=>{
        event.preventDefault();
        console.log("phone",user?.uid)
        setDoc(doc(db,"users",user?.uid),{phoneNumber : phone}, { merge: true })
        setModal(true) 
    }
    const editName=(event)=>{
        event.preventDefault();
        let user_auth = auth.currentUser;
        updateProfile(user_auth, {
            displayName: name
          }).then(() => {
            // Profile updated!
            console.log("Profile updated!")
            setModal(true) 
          }).catch((error) => {
            console.log(error)
          }); 
            
    }
    useEffect(() => {
      if(user === null) {
        navigate('/login')
        return
        }
      async function get_phone(){
        if(user === null) return
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
                    <button type='submit' className='profile__edit'>save</button>
                </form>
            </div>
            <div className="profile__form">
                <h4>E-mail:</h4>
                <form onSubmit={editMail}>
                    <input type='text' placeholder={user?.email} onChange={e => setEmail(e.target.value)} />
                    <button type='submit' className='profile__edit'>save</button>
                </form>
            </div>
            <div className="profile__form">
                <h4>Mobile Phone Number:</h4>
                <form onSubmit={editPhone}>
                    <input type='text' placeholder={phone} onChange={e => setPhone(e.target.value)} />
                    <button type='submit' className='profile__edit'>save</button>
                </form>
            </div>
            </div>
            {modal && 
                <div className='profile__modal'>
                  <div className='profile__modal__container'>
                    <div className='profile__modal__close'>
                      <CloseIcon size="large"  onClick={()=>{setModal(!modal)}}/>
                    </div>
                    <div className='profile__modal__content'>
                      user profile updated!!
                    </div>
                  </div>
                </div>
            }

        </div>
    )
}
