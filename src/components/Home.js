import React,{useEffect,useState} from 'react'
import './Home.css'
import Product from './Product'
import { useStateValue } from "../StateProvider";
import { isIndexedDBAvailable } from '@firebase/util';
import { Carousel,Spinner } from 'react-bootstrap';
import axios from './axios';
export default function Home() {
    const [{ homeProducts }, dispatch] = useStateValue();
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function getDefaultProducts(){
            await axios.get('https://amazon-india-product-api.herokuapp.com/search/?q=samsung')
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
                setLoading(false)
            })
        }
        getDefaultProducts()
    }, [])
    return (
        <>

        <div className='home'>
        <div className="home__image">
        <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://m.media-amazon.com/images/I/61y6zWWA-8L._SX3000_.jpg"
                alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://m.media-amazon.com/images/I/61I0IJWX8kL._SX3000_.jpg"
                alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src="https://m.media-amazon.com/images/I/71bnI7vrM+L._SX3000_.jpg"
                alt="First slide"
                />
            </Carousel.Item>
        </Carousel>
        </div>
            {/*<img className='home__image' src='https://m.media-amazon.com/images/I/71soUSqwsCL._SX3000_.jpg'/>*/}
            <div className='home__container'>
                {
                    loading && (<div className='home__load'><Spinner animation="border" variant="warning" /></div>)
                }
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
