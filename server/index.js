require('dotenv').config();
require('./config/connectDB');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/health-check', (req, res)=>{
    res.status(200).send("Server is working");
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})


