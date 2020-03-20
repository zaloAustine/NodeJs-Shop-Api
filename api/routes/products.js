const express = require('express');
const router = express.Router(); 
const Product = require('/home/zalo/Desktop/nodejs/ShopApi/models/product.js'); 
const mongoose = require('mongoose');


router.get('/',(req,res,next)=>{

   Product.find()
   .exec()
   .then(doc=>{
    console.log(doc);
    res.status(200).json(doc);
})
   .catch(err =>{
       console.log(err);
       res.status(404).json(err);
   });
});

router.post('/',(req,res,next)=>{

  
    const product = new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price: req.body.price
    });

    product.save().then(result=>{
        console.log(result);

        res.status(200).json({
            message:"handling post",
            createdProduct:product
        });
    
    }).catch(err => {Console.log(err);
        res.status(500).json(err);


    });

   
});

router.get('/:productId',(req,res,next)=>{
const id = req.params.productId;
    Product.findById(id).exec()
    .then(doc=>{
        if(doc){
            console.log(doc);
            res.status(200).json(doc);
        }else{
            res.status(404).json({message:"No valid message"});

        }
       
    }).
    catch(err=> {
        console.log(err);
        res.status(500).json(err);
     } );

});

router.post('/',(req,res,next)=>{


    res.status(200).json({
        message:"handling post"
    });
});

router.patch('/:productId',(req,res,next)=>{
const id = req.params.productId;

res.status(200).json({
    message:"Update Product",
    id:id
    });


});

router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId;
   Product.remove({_id:id}).exec()
   .then(result => {
       res.status(200).json(result);
   })
   .catch(err => {
       console.log(err);
       res.status(500).json(err);
   });
    });


module.exports = router;