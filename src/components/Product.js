import React from 'react'
import './Product.css';
import { useStateValue } from "../StateProvider";
export default function Product({id,title,image,price,rating}) {
    const [{ basket }, dispatch] = useStateValue();
    const addToBasket=()=>{
        dispatch({
            type:"ADD_TO_BASKET",
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
              },
        });
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
            ))}
            </div>
            </div>
            <img src={image} alt=""/>
            <button onClick={addToBasket}>Add to Cart</button>
        </div>
    )
}
