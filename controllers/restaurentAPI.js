const bcrypt = require('bcrypt');
const express=require('express');
const router=express.Router();
const RestaurentModel=require('../models/restaurent_schema');
const ProductModel=require('../models/product_schema');
const OrderModel=require('../models/order_schema');

router.post('/registration',(req,res)=>{
    bcrypt.hash(req.body.respass,10)
    .then((encpass)=>{
    const Resobj=new RestaurentModel({
        resname: req.body.resname,
        resemail: req.body.resemail,
        resmobile: req.body.resmobile,
        respass: encpass,
        resaddress:req.body.resaddress,
        active:req.body.active
    })
    RestaurentModel.find({$or:[{resemail:req.body.resemail},{resmobile:req.body.resmobile}]})
        .then((result1) => {
            if(result1.length>0){
                res.send([]);
            }
            else{
                Resobj.save()
                .then((result) => {
                    res.send([result]);
                }).catch((err) => {
                    console.log({message:err.message});
                });
            }
        }).catch((err) => {
            console.log({message:err.message});
        });
    
})
})

router.post('/login',(req,res)=>{
    RestaurentModel.find({resemail:req.body.resemail})
    .then((result) => {
        if(result.length>0){
            let collectedpass=req.body.respass;
            let storedpass=result[0].respass;
            bcrypt.compare(collectedpass,storedpass)
            .then((matchingresult) => {
                if(matchingresult==true){
                    res.send(result);
                }
                else{
                    res.send([]);
                }
            })
        }
        else{
            res.send([]);
        }
    }).catch((err) => {
        
    });
})

router.post('/uploadfood',(req,res)=>{
    
    let productobj=new ProductModel({
        productname:req.body.productname,
        producturl:req.body.producturl,
        productprice:req.body.productprice,
        productdescription:req.body.productdescription,
        resemail:req.body.resemail,
        resname:req.body.resname,
        resaddress:req.body.resaddress,

    })

    ProductModel.find({$and:[{resname:req.body.resname},{productname:req.body.productname}]})
    .then((result) => {
        if(result.length==0){
            productobj.save()
            .then(inserteditem=>{
                res.send([inserteditem]);
            })
            .catch(err=>{
                console.log({message:err.message});
            })
        }
        else{
            res.send([]);
        }
    }).catch((err) => {
        console.log({message:err.message});
    });

    
})

router.get('/allfood/:resemail',(req,res)=>{
    ProductModel.find({resemail:req.params.resemail})
        .then((result) => {
            if(result.length>0){
                res.send(result);
            }
            else{
                res.send([]);
            }
            
        }).catch((err) => {
            console.log({message:err.message});
        });
})

router.post('/viewuserorder',(req,res)=>{
    OrderModel.find({$and:[{adminemail:req.body.adminemail},{productname:req.body.productname}]})
        .then((result) => {
            if(result.length>0){
                res.send(result);
            }
            else{
                res.send([]);
            }
            
        }).catch((err) => {
            console.log({message:err.message});
        });
})

router.post('/deleteitem',(req,res)=>{
    ProductModel.findOneAndDelete({$and:[{productname:req.body.productname},{adminemail:req.body.adminemail}]})
        .then((result) => {
            res.send(result);
            CartModel.find({$and:[{productname:req.body.productname},{adminemail:req.body.adminemail}]})
                .then((result1) => {
                    let length=result1.length
                    if(length>0){
                        for(let i=0;i<length;i++){
                            CartModel.findOneAndDelete({$and:[{productname:req.body.productname},{adminemail:req.body.adminemail}]})
                                .then((result2) => {
                                    console.log("All Cart REMOVED");
                                }).catch((err) => {
                                    console.log({message:err.message});
                                });
                        }
                    }
                }).catch((err) => {
                    console.log({message:err.message});
                });
        }).catch((err) => {
            console.log({message:err.message});
        });
})

router.put('/edititem',(req,res)=>{
    let productobj={
        productprice:req.body.productprice,
        producturl:req.body.producturl,
        productprice:req.body.productprice,
        productdescription:req.body.productdescription
    }
    ProductModel.findOneAndUpdate({$and:[{productname:req.body.productname},{adminemail:req.body.adminemail}]},{$set:productobj},{new:true})
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log({message:err.message});
        });

})

router.get('/isactive/:resemail',(req,res)=>{
    RestaurentModel.find({resemail:req.params.resemail})
    .then((result) => {
        res.send(result[0]);
    }).catch((err) => {
        console.log("Error in isActive."+{message:err.message});
    });
})

router.put('/updatepass',(req,res)=>{
    bcrypt.hash(req.body.resnewpass,10)
        .then((encpass) => {
            let resobj={
                respass:encpass
            }
            RestaurentModel.findOneAndUpdate({resemail:req.body.resemail},{$set:resobj},{new:true})
                .then((result) => {
                    res.send([result]);
                }).catch((err) => {
                    console.log({message:err.message});
                });
        })  
})

module.exports=router;