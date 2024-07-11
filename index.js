//import express
const express = require('express');

//import CORS
const cors = require('cors');

//init app
const app = express();

//use cors
app.use(cors());

//define port
const port = 3000;

//route
app.get('/' , (req , res)=>{
   res.send('hello from simple server :)')
})

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})