import React from 'react'
import './Footer.css';
export default function Footer() {
    return (
        <div className='footer' onClick={()=>{window.scrollTo(0,0)}}> 
            Back to top
        </div>
    )
}
