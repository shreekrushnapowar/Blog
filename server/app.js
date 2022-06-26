const dotenv=require('dotenv')
const path = require('path');
const express = require('express');
const app = express();
const PORT=8000;
const mongoose=require('mongoose');
var cors = require('cors')
app.use(cors())

const staticpath=path.join(__dirname, '/public');
// express.static(path.join(__dirname, '/public'));
app.use('/public',express.static(staticpath));

dotenv.config({path:'./config.env'});
require('./conn');
app.use(express.json());

app.use(require('./Routes/User'));
app.use(require('./Routes/posts'));
app.listen(PORT,()=>{console.log(`listening at ${PORT}`)})
