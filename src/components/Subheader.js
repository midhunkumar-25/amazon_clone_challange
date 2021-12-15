import React,{useState} from 'react'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Subheader.css';
import { Link,useNavigate } from 'react-router-dom';
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";
export default function Subheader() {
    const[{user},dispatch] =useStateValue();
    const [menu, setMenu] = useState(false);
    const navigate = useNavigate();
    const handleAuthenticaton = () => {
        if (user) {
            console.log("signout.....")
          auth.signOut();
        }
        else{
            navigate('/login', { replace: true })
        }
      }
    return (
        <div className='sub_header'>
            < MenuOutlinedIcon fontSize="large"  className='subheader__Icon' onClick={()=>{setMenu(!menu)}}/>
            <div className={menu ? "menubar active" : "menubar"}>
            <div className='menuheader'>
                <AccountCircleIcon fontSize="large"  className='subheader__Icon' onClick={()=>{setMenu(!menu)}}/>
                <p>Hello, {!user ? 'Guest' : ( !user.displayName ? user.email : user.displayName ) }</p>
                <CloseOutlinedIcon fontSize="large"  className='subheader__Icon' onClick={()=>{setMenu(!menu)}}/>
            </div>
            <div className='menubody'>
                <ul className="menuitem">
                            <div className="menucontainer">
                            <li className="menutile">Trending</li>
                            </div>
                            <div className="menucontainer">
                            <li className="menutile">digital content and devices</li>
                            </div>
                            <div className="menucontainer">
                            <li className="menutile">shop by department</li>
                            </div>
                            <div className="menucontainer"> 
                            <li className="menutile">programs & features</li>
                            </div>
                            <div className="menucontainer">
                            <li className="menutile">help & settings</li>
                            <Link to="/account" style={{ textDecoration: 'none' }}>
                            <li className="menutext" onClick={()=>{setMenu(!menu)}}>Your Account</li>
                            </Link>
                            <li className="menutext" onClick={handleAuthenticaton}>{user? "Sign Out":"signin"}</li>

                            </div>
                </ul>
            </div>
            </div>
        </div>
    )
}
