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
            <Card sx={{ display: 'flex' ,width:"50%"}}>
                <Box sx={{ display: 'flex', flexDirection: 'row',alignItems: "center" }}>
                    <CardMedia
                        component="img"
                        height="200"
                        width="40"
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
            </Link>
            <Link to="/profile" style={{ textDecoration: 'none' }}>
            <Card sx={{ display: 'flex' ,width:"50%"}}>
                <Box sx={{ display: 'flex', flexDirection: 'row',alignItems: "center" }}>
                    <CardMedia
                        component="img"
                        height="200"
                        width="10"
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
            </Link>
            </div>
        </div>
    )
}
