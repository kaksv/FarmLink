const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/',(req,res)=>{
    res.send("working")
})

app.post('/ussd', (req, res) => {
    // Read the variables sent via POST from our API
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
    } = req.body;

    let response = '';

    if (text == '') {
        // This is the first request. Note how we start the response with CON
        response = `CON Welcome to Genuine
        Buy
        1. Seeds
        2. Fertilizers
        3. Pesticides`;
    } else if ( text == '1') {
        // Business logic for first level response
        response = `CON Choose crop
        1. Beans
        2. Maize
        3. Groundnuts
        4. Rice
        5. Millet`;
    } else if ( text == '2') {
        response = `CON Choose crop
        1. Urea
        2. NPK
        3. DAP
        4. CAN`;
    }else if(text == '3'){
        response = `CON Choose crop
        1. AuxoEC
        2. Stomp455
        3. Fragon
        4. Fennut/Meton`;
    }else if (/^(1|2|3)\*(1|2|3|4|5)$/.test(text)) {
        console.log(text)
        response = `CON Enter your Quantity in kgs`;
    }
    else if(/^(1|2|3)\*(1|2|3|4|5)\*\d+\*(1|2|3|4)$/.test(text)
    ){
        response = `CON Choose your Delivery district
        1. Kapchorwa
        2. Mpigi
        3. Nebbi 
        4. Lira`;
    }
    else if(/^(1|2|3)\*(1|2|3|4|5)\*\d+$/.test(text)){
        response = `CON Choose from a pool of our Authentic Suppliers.

        1. MUKASA SUPPLIERS
        2. OMULIMI STORES
        3. LETS FARM SHOP
        4. MOMO AGRO`;
    }else if(/^(1|2|3)\*(1|2|3|4|5)\*\d+\*(1|2|3|4)\*1$/.test(text)){
        response = `CON Choose your Delivery point
        1. Kapchorwa Taxi Park
        2. Kapchorwa Bus Park`;
    }
    else if(/^(1|2|3)\*(1|2|3|4|5)\*\d+\*(1|2|3|4)\*2$/.test(text)){
        response = `CON Choose your Delivery point
        1. Mpigi Taxi Park`;
    }else if(/^(1|2|3)\*(1|2|3|4|5)\*\d+\*(1|2|3|4)\*3$/.test(text)){
        response = `CON Choose your Delivery point
        1. Nebbi Taxi Park
        2. Nebbi Bus Park`;
    }else if(/^(1|2|3)\*(1|2|3|4|5)\*\d+\*(1|2|3|4)\*4$/.test(text)){
        response = `CON Choose your Delivery point
        1. Lira Taxi Park
        2. Lira Bus Park`;
    }else if(/^(1|2|3)\*(1|2|3|4|5)\*\d+\*(1|2|3|4)\*(1|2|3|4)\*(1|2)$/.test(text)){
        response = `CON Proceed to Make payment of sh.340000
        1. Pay
        2. Pay with another number`;
    }else if(/^(1|2|3)\*(1|2|3|4|5)\*\d+\*(1|2|3|4)\*(1|2|3|4)\*(1|2)\*2$/.test(text)){
        response = `CON Enter Phone number`
    }else if(/^(1|2|3)\*(1|2|3|4|5)\*\d+\*(1|2|3|4)\*(1|2|3|4)\*(1|2)\*1$/.test(text)){
        response = `END Thank you for ordering with us. Your order is being processed.
        For any inquiries, contact +256703806580.`
    }
    else if(/^(1|2|3)\*(1|2|3|4|5)\*\d+\*(1|2|3|4)\*(1|2|3|4)\*(1|2)\*2\d+$/.test(text)){
        response = `END Thank you for ordering with us. Your order is being processed.
        For any inquiries, contact +256703806580.`
    }

    else{
        response =`END Sorry invalid input!`
    }


    // Send the response back to the API
    res.set('Content-Type: text/plain');
    res.send(response);
});

const PORT= 6008 || process.env.PORT
app.listen(PORT,(req,res)=>{
console.log(`App listening on ${PORT}`)
})
