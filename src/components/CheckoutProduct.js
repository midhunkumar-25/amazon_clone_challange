import React from 'react'
import './CheckoutProduct.css';
import { useStateValue } from "../StateProvider";
import { useSelector, useDispatch } from 'react-redux';
import {removefrombasket } from '../basketSlice';

export default function CheckoutProduct({id,title,image,price,rating,hideButton}) {
    //const [{ basket }, dispatch] = useStateValue();
    const basket = useSelector((state) => state.basket.basket)
    const dispatch = useDispatch()

    const removeFromBasket=()=>{
        dispatch(removefrombasket({ id: id}))
    }
    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct__image' src={image} alt=""/>
            <div className='checkoutProduct__info'>
            <p className='checkoutProduct__title'>{title}</p>
            <p className='checkoutProduct__price'>
                <strong>{price}</strong>
            </p>
            <div className="checkoutProduct__rating">
                {Array(Math.round(parseFloat(rating)))
                    .fill()
                    .map((_, i) => (
                        <p>&#11088;</p>
                    ))}
            </div>
            {
                !hideButton &&
                <button onClick={removeFromBasket}>delete</button>}
            </div>
        </div>
    )
}
