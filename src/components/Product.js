import React from 'react'
import './Product.css';
import { useStateValue } from "../StateProvider";
import { useSelector, useDispatch } from 'react-redux';
import {addtobasket } from '../basketSlice';
export default function Product({id,title,image,price,rating}) {
    //const [{ basket }, dispatch] = useStateValue();
    //const basket = useSelector((state) => state.basket.basket)
    const dispatch = useDispatch()

    const addToBasket=()=>{
        dispatch(addtobasket({
            id: id,
            title: title,
            image: image,
            price: price,
            rating: rating,
          }))
    };

    return (
        <div className='product'>

            <div className='product__info'>
            <p>{title}</p>
            <p className='product__price'>
                <strong>{price}</strong>
            </p>
            <div className="product__rating">
        {Array(Math.round(parseFloat(rating)))
            .fill()
            .map((_, i) => (
                <p>&#11088;</p>
            ))

            }
        {Array(5 - Math.round(parseFloat(rating)))
            .fill()
            .map((_, i) => (
                <p style={{fontSize:"23px",marginBottom:"8px"}}>&#9734;</p>
            ))

            }
            </div>
            </div>
            <img src={image} alt=""/>
            <button onClick={addToBasket}>Add to Cart</button>
        </div>
    )
}
