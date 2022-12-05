require('dotenv').config();
const { urlencoded } = require('express');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const tripsRouter = require('./routes/tripsRouter');
const MONGO_URL = process.env.MONGO_CONNECTION_URL;
const whiteList = { origin: "*"};

// mongoose
mongoose.connect(MONGO_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true},
    (err)=>{
        if (!err)  console.log("MongoDB Connected");
        else  console.log(err);
    })
// cors
app.use(cors(whiteList));

// trips 
app.use('/viagens',express.urlencoded({extended: true}), tripsRouter);

// user
app.use('/user',express.json(), userRouter);

app.listen(PORT,()=>{
    console.log(`Backend started in port ${PORT}`)
})