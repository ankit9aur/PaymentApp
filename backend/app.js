const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")("sk_test_51OtPVTSGVOydwNUpHy05oyxDPeze1WYJK6Plqzc5WtHN2DPBEkJULbCEu0KwtQKQm6tT7lW6igsvwKZUYQpLTfgb005B2dEOXr");

app.use(express.json());
app.use(cors());

// checkout api
app.post("/api/create-checkout-session",async(req,res)=>{
    const {products} = req.body;

    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.dish,
                images:[product.imgdata]
            },
            unit_amount:product.price * 100,
        },
        quantity:product.qnty
    }));

    const session = await stripe.checkout.sessions.create({
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/sucess",
        cancel_url:"http://localhost:3000/cancel",
    });

    res.json({id:session.id})
})


app.listen(8000,()=>{
    console.log("server started at port : " + 8000);
})