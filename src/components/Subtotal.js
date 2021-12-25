import React from 'react'
import CurrencyFormat from 'react-currency-format';
import './Subtotal.css';
import { getBasketTotal } from "../reducer";
import { useStateValue } from "../StateProvider";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

export default function Subtotal() {
    const basket = useSelector((state) => state.basket.basket)
    const navigate = useNavigate();
    //const [{ basket }, dispatch] = useStateValue();
    return (
    <div className="subtotal">
        <CurrencyFormat
            renderText={(value) => (
            <>
                <p>
                {/* Part of the homework */}
                Subtotal ({basket.length} items): <strong>{value}</strong>
                </p>
                <small className="subtotal__gift">
                <input type="checkbox" /> This order contains a gift
                </small>
            </>
            )}
            decimalScale={2}
            value={getBasketTotal(basket)} 
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₹"}
        />
        <button onClick={(e)=> navigate('/payment')}>Proceed to Buy</button>
        </div>
    )
}
