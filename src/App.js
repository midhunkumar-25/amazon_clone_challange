
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Home from './components/Home';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Payment from './components/Payment';
import './App.css';
import React,{useEffect} from 'react';
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from './components/Orders';
import Account from './components/Account';
import Subheader from './components/Subheader';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Address from './components/Address';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc ,getDoc  } from "firebase/firestore"; 
import { useSelector, useDispatch } from 'react-redux';
import {adduser,clearuser } from './userSlice';
import {addaddress,clearaddress } from './addressSlice';
const db = getFirestore();
const promise = loadStripe(
  "pk_test_51K0LO4SGz5bkUNbUWbVdk8EcaeZAaY9l4cBHA5oWzGsCDfZN5YlAML66n7BvJ1pM0yB7J95UqFMJ86VPNUJVjmH000ghcsavBb"
);

function App() {
  //const [{ user }, dispatch] = useStateValue();
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(adduser(user));
      async function get_address(){
        let docref = doc(db,"users",user?.uid)
        const docSnap =  await getDoc(docref);
        if (docSnap.exists()) {
           if(docSnap.data()?.address !== null){
            dispatch(addaddress(docSnap.data()?.address)); 
           } 
           console.log("address added")
        } else {
          console.log("No such document!");
        }
      } 
      
      
      get_address()
      } else {
        
        dispatch(clearuser());
        dispatch(clearaddress());
      }
    });
    
  }, [])
  return (
    <Router>
      <div className="app">
      <Routes>
        <Route  path='/checkout' element={
                    <React.Fragment>
                    <Header/>
                    <Subheader/>
                    <Checkout/>
                  </React.Fragment>}/>

        <Route  path='/' element={                    
                  <React.Fragment>
                    <Header/>
                    <Subheader/>
                    <Home/>
                  </React.Fragment>} />
        <Route path="/login" element={<Login />}/>
        {<Route path="/payment" element={<React.Fragment> <Header /><Subheader/> <Elements stripe={promise}><Payment /></Elements></React.Fragment>}/>}
        {<Route path="/orders" element={<React.Fragment><Header /><Subheader/><Orders /></React.Fragment>}/>}
        {<Route path="/account" element={<React.Fragment><Header /><Subheader/><Account /></React.Fragment>}/>}
        {<Route path="/profile" element={<React.Fragment><Header /><Subheader/><Profile /></React.Fragment>}/>}
        <Route path="/register" element={<Signup />}/>
        {<Route path="/address" element={<React.Fragment><Header /><Address /></React.Fragment>}/>}
      </Routes>
      </div>
    </Router>

  );
}

export default App;
