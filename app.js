const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/order')
const mongoose = require("mongoose");

//connection to mongoDB
mongoose.connect('mongodb+srv://zalocoders:zalo@node-rest-shop-lq9xf.mongodb.net/test?retryWrites=true&w=majority',
{useNewUrlParser : true});


mongoose.Promise = global.Promise;



//request logging
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//adding header ..prevent cors errors
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Header","Origin, X-Request-With, Content-Type,Accept,Authorization");

    if(req.method==='OPTIONS'){
        res.header("Access-Control-Allow-Methods","GET","POST","PUT","DELETE","PATCH");
        return res.status.status(200).json({});
    }
    next();
});


//connecting the classes logic
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

//error handling
app.use((req,res,next)=>{

    const error = new Error('not found');
    error.status = 404;
    next(error);
});

//overall error handling
app.use((error,req,res,next)=>{
    res.status(error.status|| 500);
    res.json({
        error:{
            message:error.message
        }
    });

});


module.exports = app;