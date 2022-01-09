import React from 'react'
import Subtotal from './Subtotal'
import './Checkout.css';
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {  useNavigate } from "react-router-dom";

export default function Checkout() {
    //const [{ basket, user }, dispatch] = useStateValue();
    const basket = useSelector((state) => state.basket.basket)
    const navigate=useNavigate();
    const user=useSelector(state => state.user.user)
    useEffect(() => {
        if(user === null) {
            navigate('/login')
            return
            }
    }, [])
    return (
        <div className='checkout'>
            <div className='checkout_left'>
                <h2 className='checkout__title'>Shopping Cart</h2>
                {basket.map((item,index) => (
                    <CheckoutProduct
                    key={index}
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    />
                ))}
            </div>
            <div className='checkout_right'>
                <Subtotal/>
            </div>
        </div>
    )
}
