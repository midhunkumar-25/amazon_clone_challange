import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, Typography,CardMedia,Box  } from "@material-ui/core";
import "./Account.css"
export default function Account() {
    return (
        <div className='Account'>
            <div className='Account__title'>           
                <h1>Your Account</h1> 
            </div>
            <div className='Account__card__container'>
                
            <Link to="/orders" style={{ textDecoration: 'none' }}>
            <div className="grid__item">
            <Card sx={{ maxWidth: 30,maxHeight:100,margin: "auto",transition: "0.3s",}}>
                <Box sx={{ display: 'flex', flexDirection: 'row',alignItems: "center" }}>
                    <CardMedia
                        component="img"
                        height="150"
                        image="https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/Box._CB485927553_.png"
                        alt=""
                    />
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="div">
                        Your Orders
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
            </div>
            </Link>
            <Link to="/profile" style={{ textDecoration: 'none' }}>
            <div className="grid__item">
            <Card  sx={{ maxWidth: 300,margin: "auto",transition: "0.3s",}}>
                <Box sx={{ display: 'flex', flexDirection: 'row',alignItems: "center" }}>
                    <CardMedia
                        component="img"
 
                        image="https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/sign-in-lock._CB485931504_.png"
                        alt=""
                    />
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="div">
      
                Login & security
            
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
            </div>
            </Link>
            <Link to="/address" style={{ textDecoration: 'none' }}>
            <div className="grid__item">
            <Card  sx={{ maxWidth: 300,margin: "auto",transition: "0.3s",}}>
                <Box sx={{ display: 'flex', flexDirection: 'row',alignItems: "center" }}>
                    <CardMedia
                        component="img"
 
                        image="https://images-na.ssl-images-amazon.com/images/G/31/x-locale/cs/ya/images/address-map-pin._CB485934183_.png"
                        alt=""
                    />
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="div">
      
                
                        Your Addresses
            
            
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
            </div>
            </Link>
            </div>
        </div>
    )
}
