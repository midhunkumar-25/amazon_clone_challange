import React,{useState} from 'react'
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { Link } from 'react-router-dom';
import { useStateValue } from "../StateProvider";
import axios from 'axios';
import { auth } from "../firebase";
import { useSelector, useDispatch } from 'react-redux';
import {adduser,clearuser } from '../userSlice';
import {addaddress,clearaddress } from '../addressSlice';
import {addtobasket,removefrombasket,emptybasket} from '../basketSlice';
import {addtohome,clearhome} from '../homeproductSlice';

export default function Header() {
    //const[{basket,user,address},dispatch] =useStateValue();
    const basket = useSelector((state) => state.basket.basket)
    const user = useSelector((state) => state.user.user)
    const address = useSelector((state) => state.address.address)
    const dispatch = useDispatch()

    const [searchProduct, setsearchProduct] = useState("")
    const [suggestions, setSuggestions] = useState([])

    const getSuggestions= async(event)=>{
        await axios.get("https://completion.amazon.in/api/2017/suggestions?limit=11&prefix="+event.target.value+"&alias=aps&mid=A21TJRUUN4KGV")
        .then((response)=>{
            setSuggestions(response.data.suggestions)
            setsearchProduct(event.target.value)
        })
    }

    const debounce=(fn,delay)=>{
        let timeout;
        return function (...args){
            if(timeout){
                clearTimeout(timeout)
            }
            timeout =  setTimeout(()=>{fn(...args)},delay);
        }
    }

    const searchProducts= async (event)=>{
        if(typeof event !== typeof undefined)
            event.preventDefault()
        await axios.get('https://amazon-india-product-api.herokuapp.com/search/?q='+searchProduct)
        .then((response)=> {
            dispatch(clearhome());
            for (let prod of  response.data){
                dispatch(addtohome({
                    id: prod.id,
                    title: prod.name,
                    image: prod.image,
                    price: prod.price,
                    rating: prod.review.split(" ")[0],
                  }));
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

            <div className='header__search'>
                <form  className='header__searchForm' onSubmit={searchProducts}>
                    <input className='header__searchInput' type='text' onChange={debounce((event) =>{getSuggestions(event)},700)}/>
                    <button className='header__searchButton' type="submit" >
                    <SearchIcon className='header__searchIcon'/>                
                    </button>
                </form>
                {
                   suggestions &&  
                   <div className='header__search_result'>
                {
                    suggestions.map((item,index)=>{
                        return(
                            <div className='header__search_item' key={index} onClick={()=>{ setSuggestions([]);setsearchProduct(item.value);searchProducts()}}>
                                {item.value}
                            </div>
                        )
                    })
                }
                </div>
                }
                
                
            </div>
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
