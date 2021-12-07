const functions = require("firebase-functions");

const express = require("express")
const cors = require("cors")
const stripe = require("stripe")("sk_test_51K0LO4SGz5bkUNbUtWXGDlbq3vncFkRuACjVIaV3BF1mv6YZ1jgEPZK7JqZZdnkPEI15or9tytgNnDHjRymfJLRm00Sr67QUuI")

//API

//config
const app =express()
//Middleware
app.use(cors({origin:true}))
app.use(express.json())
//Api routes
app.get('/',(req,res)=>{
res.status(200).send("hello")
})
app.post('/payments/create',async (req,res)=>{
    const total = req.query.total
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "inr",
  });
    res.status(200).send({
        clientSecret: paymentIntent.client_secret,
      })
    })
//Listen
exports.api=functions.https.onRequest(app)