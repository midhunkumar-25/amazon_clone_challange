import React from 'react'
import './Home.css'
import Product from './Product'
import { useStateValue } from "../StateProvider";
import { isIndexedDBAvailable } from '@firebase/util';
import { Carousel } from 'react-bootstrap';
export default function Home() {
    const [{ homeProducts }, dispatch] = useStateValue();
    return (
        <>

        <div className='home'>
        <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100"
                className='home__image'
                src="https://m.media-amazon.com/images/I/61y6zWWA-8L._SX3000_.jpg"
                alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img

                className="d-block w-100"
                className='home__image'
                src="https://m.media-amazon.com/images/I/61I0IJWX8kL._SX3000_.jpg"
                alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                className='home__image'
                src="https://m.media-amazon.com/images/I/71bnI7vrM+L._SX3000_.jpg"
                alt="First slide"
                />
            </Carousel.Item>
        </Carousel>
            {/*<img className='home__image' src='https://m.media-amazon.com/images/I/71soUSqwsCL._SX3000_.jpg'/>*/}
            <div className='home__container'>
            {homeProducts.map((item,index) => (
                <div className='home__row'>
                <Product
                key={index}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                />
                </div>
            ))}
            </div>         
        </div>
        </>
    )
}
