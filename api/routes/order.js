const express = require('express');
const router = express.Router(); 



router.get('/',(req,res,nex)=>{

    res.status(200).json({

        message:"Orders Fetched"
    });
});


router.post('/',(req,res,nex)=>{
    const order = {
        productId:req.body.productId,
        quantity:req.body.quantity,
    }

    res.status(200).json({

        message:"Orders posted",
        createdOrder:order
    });
});


router.get('/:orderId',(req,res,nex)=>{

    res.status(200).json({

        message:"get Single Order",
        orderId:req.params.orderId
    });
});


router.delete('/:orderId',(req,res,nex)=>{

    res.status(200).json({

        message:"delete Single Order",
        orderId:req.params.orderId
    });
});



module.exports = router;