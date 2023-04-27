const express=require('express');
var app=express();

const bodyParser=require('body-parser');
app.use(bodyParser.json());

const cors=require('cors');
app.use(cors());


const my_mongoose=require('./dbconnect_promise');


const adminAPI=require('./controllers/adminAPI');
app.use('/admin',adminAPI);

const userAPI=require('./controllers/userAPI');
app.use('/user',userAPI);

const restaurentAPI=require('./controllers/restaurentAPI');
app.use('/restaurent',restaurentAPI);

app.listen(5000,()=>{console.log("EXPRESS SERVER STARTED AT PORT NO 5000....")});