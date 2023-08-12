
const cors = require("cors")

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const express = require("express");

const app = express();
//middlewere
app.use(express.json())
app.use(cors())
app.post("/",(req,res)=>{
    res.send("hfgd")
})
app.post("/api/createcheckoutsession", async (req, res) => {
    const { product } = req.body;
    console.log(req.body)
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product.name,
                    },
                    unit_amount: product.price * 100,
                },
                quantity: product.quantity,
            },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    });
    console.log(session)
    res.json({ id: session.id });
});
app.listen(8000, () => {
    console.log(`listen at port 8000`)
})
