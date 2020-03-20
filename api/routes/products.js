const express = require('express');
const router = express.Router(); 
//calling the product model
const Product = require('/home/zalo/Desktop/nodejs/ShopApi/models/product.js'); 
const mongoose = require('mongoose');
ObjectId = require('mongodb').ObjectID;

router.get('/',(req,res,next)=>{
   Product.find()
   //specify fields
   .select("name price _id")
   .exec()
   .then(doc=>{

    const response ={
        count:doc.length,
        products:doc.map(doc =>{
                    //adding meta data
            return {
                name:doc.name,
                price:doc.price,
                _id:doc._id,
                request:{
                    type:'GET',
                    url:'http://localhost:3000/products/'+doc._id
                }
            }
        })
    }

    res.status(200).json(response);
})
   .catch(err =>{
       console.log(err);
       res.status(404).json(err);
   });
});




//post doesnt need execute
router.post('/',(req,res,next)=>{

//creating new Object  
    const product = new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price: req.body.price
    });

    product.save().then(result=>{

        res.status(200).json({
            message:"Created product Succesfully",
            createdProduct:{
                name:result.name,
                price:result.price,
                _id:result._id,
                request:{
                    type:'GET',
                    url:'http://localhost:3000/products/'+result._id
                }

            }
        });
    
    }).catch(err => {Console.log(err);
        res.status(500).json(err);


    });

   
});

router.get('/:productId',(req,res,next)=>{
    //getting id from request
const id = req.params.productId;
    Product.findById(id)
    .select('name price _id')
    .exec()
    .then(doc=>{
        if(doc){

            res.status(200).json({
                name:doc.name,
                price:doc.price,
                _id:doc._id,
                decription:"Getting all products",
                request:{
                    type:'GET',
                    url:'http://localhost:3000/products/'+doc._id}

                });

        }else{
            res.status(404).json({message:"No valid message"});

        }
       
    }).
    catch(err=> {
        console.log(err);
        res.status(500).json(err);
     } );

});


router.patch("/:productId", (req, res, next) => {
    Product.updateOne({ _id: req.params.productId }, { $set: req.body })
      .exec()
      .then(doc => {
        res.status(200).json({ 

            name:doc.name,
            price:doc.price,
            _id:doc._id,
            decription:"Updating a product",
            request:{
                type:'GET',
                url:'http://localhost:3000/products/'+doc._id}

        });
      })
      .catch(err => {
        console.log(err);
        error: err;
      });
  });

router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId;
   Product.remove({_id:id}).exec()
   .then(doc => {
       res.status(200).json({
        name:doc.name,
        price:doc.price,
        _id:doc._id,
        decription:"Getting a product",
        request:{
            type:'GET',
            url:'http://localhost:3000/products/'+doc._id}

       });
   })
   .catch(err => {
       console.log(err);
       res.status(500).json(err);
   });
    });

    

module.exports = router;