const express = require('express');
const router = express.Router(); 

const Order = require('/home/zalo/Desktop/nodejs/ShopApi/models/order.js'); 
const mongoose = require('mongoose');
ObjectId = require('mongodb').ObjectID;
const Product = require('/home/zalo/Desktop/nodejs/ShopApi/models/product.js'); 



router.get('/',(req,res,next)=>{

    Order.find()
    .populate('product')
    .exec()
    .then(result=>{
        res.status(200).json(result);

    }).catch(err=>{
        res.status(500).json(err);

    });
});


router.post('/',(req,res,next)=>{

    //check if product not found
    Product.findById(req.body.productId).then(product=>{

        const order = new Order({
            _id:mongoose.Types.ObjectId(),
            quantity:req.body.quantity,
            product:req.body.productId
    
        });
    
        order.save().then(result=>{
            res.status(200).json(result);
        }).catch(err=>{
            res.status(500).json(err);
    
        });

    }).catch();

   

});


router.get('/:orderId',(req,res,next)=>{
    const id = req.params.orderId;

    Order.findById(id).exec().then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(500).json(err);
    });

});


router.delete('/:orderId',(req,res,nex)=>{
    const id = req.params.orderId;

    Order.remove({_id:id}).exec().then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
    });

    
});

router.patch('/orderId',(req,res,next)=>{

    Order.updateOne({ _id: req.params.orderId }, { $set: req.body })
      .exec()
      .then(doc => {
        res.status(200).json(doc);
      })
      .catch(err => {
        console.log(err);
        error: err;
      });


});



module.exports = router;