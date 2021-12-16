import React,{useState} from 'react'
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Link } from 'react-router-dom';
import { useStateValue } from "../StateProvider";
import axios from 'axios';
import { auth } from "../firebase";

export default function Header() {
    const[{basket,user,address},dispatch] =useStateValue();
    const [searchProduct, setsearchProduct] = useState("")
    const searchProducts= async (event)=>{
        event.preventDefault()
        await axios.get('https://amazon-india-product-api.herokuapp.com/search/?q='+searchProduct)
        .then((response)=> {
            dispatch({
                type:"CLEAR_HOME",
            });
            console.log(response)
            for (let prod of  response.data){
                dispatch({
                    type:"ADD_TO_HOME",
                    item: {
                        id: prod.id,
                        title: prod.name,
                        image: prod.image,
                        price: prod.price,
                        rating: prod.review.split(" ")[0],
                      },
                });
            }
        })     
    }
    const handleAuthenticaton = () => {
        if (user) {
            console.log("signout.....")
          auth.signOut();
        }
      }
    return (
        <div className='header'>
            <Link to='/'>
            <img className='header__logo' src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"></img>
            </Link>
            <div className="header__location">
                <LocationOnOutlinedIcon/>
                <div className='header__option'>
                    <span className='header__line1'>
                    Deliver to {address?.name}
                    </span>
                    <span className='header__line2'>
                    {address?.city} {address?.pin}
                    </span>
                </div>
            </div>
            <form className='header__search' onSubmit={searchProducts}>
      
                <input className='header__searchInput' type='text' onChange={e=> setsearchProduct(e.target.value)}/>
                <button className='header__searchButton' type="submit" >
                <SearchIcon className='header__searchIcon'/>                
                </button>
            </form>
            <div className='header__nav'>
                <Link to='/'>
                    <img className='header__logo_mobile' src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"></img>
                </Link>
                <Link to= { !user && '/login'} style={{ textDecoration: 'none' }}>
                <div className='header__option' onClick={handleAuthenticaton}>
                    
                    <span className='header__line1'>Hello, {!user ? 'Guest' : ( !user.displayName ? user.email : user.displayName ) }</span>
                    <span className='header__line2'>{user ? 'Sign Out' : 'Sign In'}</span>
                </div>
                </Link>
                <Link to='/orders' style={{ textDecoration: 'none' }}>
                <div className='header__option'>
                    <span className='header__line1'>Returns</span>
                    <span className='header__line2'>& Orders</span>
                </div>
                </Link>
                <Link to='/checkout' style={{ textDecoration: 'none' }}>
                <div className='header__optionBasket'>
                <ShoppingCartOutlinedIcon/>
                    <span className='header__basketCount'>{basket.length} </span>
                </div>
                </Link>
            </div>
        </div>
    )
}
