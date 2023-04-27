const bcrypt = require('bcrypt');
const express=require('express');
const router=express.Router();
const UserModel=require('../models/user_schema');
const ProductModel=require('../models/product_schema');
const CartModel= require('../models/cart_schema');
const OrderModel=require('../models/order_schema');
const uuid=require('uuid');

router.post('/userreg',(req,res)=>{
    bcrypt.hash(req.body.userpass,10)
    .then((encpass)=>{
    const Userobj=new UserModel({
        username: req.body.username,
        useremail: req.body.useremail,
        usermobile: req.body.usermobile,
        userpass: encpass,
        useraddress:req.body.useraddress,
    })
    UserModel.find({$or:[{useremail:req.body.useremail},{usermobile:req.body.usermobile}]})
        .then((result1) => {
            if(result1.length>0){
                res.send([]);
            }
            else{
                Userobj.save()
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



router.post('/userlogin',(req,res)=>{
    UserModel.find({useremail:req.body.useremail})
        .then((result) => {
            if(result.length>0){
                let collectedpass=req.body.userpass;
                let storedpass=result[0].userpass;
                bcrypt.compare(collectedpass,storedpass)
                .then((result1) => {
                    if(result1==true){
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
            console.log({message:err.message});
        });
})


router.put('/updatepass',(req,res)=>{
    bcrypt.hash(req.body.usernewpass,10)
        .then((encpass) => {
            let userobj={
                userpass:encpass
            }
            UserModel.findOneAndUpdate({useremail:req.body.useremail},{$set:userobj},{new:true})
                .then((result) => {
                    res.send([result]);
                }).catch((err) => {
                    console.log({message:err.message});
                });
        })  
})



router.put('/userupdate',(req,res)=>{
    let userobj={
        username:req.body.username,
        useraddress:req.body.useraddress
    }
    UserModel.findOneAndUpdate({useremail:req.body.useremail},{$set:userobj},{new:true})
        .then((result) => {
            res.send([result]);
        }).catch((err) => {
            console.log({message:err.message});
        });
})

router.get('/allfood',(req,res)=>{
    ProductModel.find()
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
router.get('/searchitem/:productname',(req,res)=>{
    ProductModel.find({productname:req.params.productname})
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

router.post('/addcartitem',(req,res)=>{
    let cartobj=new CartModel({
        productname: req.body.productname,
        producturl: req.body.producturl,
        productprice:req.body.productprice,
        useremail:req.body.useremail,
        resemail:req.body.resemail,
        resname:req.body.resname,
        productquantity:req.body.productquantity,

    })
    CartModel.find({$and:[{productname:req.body.productname},{useremail:req.body.useremail},{resemail:req.body.resemail}]})
    .then((result) => {
        console.log(result);
        if(result.length==0){
            cartobj.save()
            .then((result1) => {
                res.send([result1]);
            }).catch((err) => {
                console.log({message:err.message});
            });
        }
        else{
            res.send([]);
        }
    }).catch((err) => {
        console.log({message:err.message});
    });
    
    })

router.post('/checkcart/:useremail',(req,res)=>{
    CartModel.find({$and:[{resemail:req.body.resemail},{useremail:req.params.useremail},{productname:req.body.productname}]})
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

router.get('/viewallcart/:useremail',(req,res)=>{
    CartModel.find({useremail:req.params.useremail})
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

router.post('/removecart',(req,res)=>{
    CartModel.findOneAndDelete({$and:[{productname:req.body.productname},{useremail:req.body.useremail},{resemail:req.body.resemail}]})
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log({message:err.message});
        });
})

router.post('/buyitem',(req,res)=>{
    var uniqeId=uuid.v4();
    var today=new Date();
    let orderobj=new OrderModel({
        useremail:req.body.useremail,
        username:req.body.username,
        resemail:req.body.resemail,
        resname:req.body.resname,
        productorderid:uniqeId,
        productname: req.body.productname,
        producturl: req.body.producturl,
        productprice: req.body.productprice,
        productdescription: req.body.productdescription,
        productquantity:req.body.productquantity,
        producttotalprice:req.body.producttotalprice,
        orderstatus:req.body.orderstatus,
        orderdate:today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear(),
        ordertime:today.getHours()+':'+today.getMinutes()+':'+today.getSeconds(),
        deliveryaddress:req.body.deliveryaddress
    })
    orderobj.save()
        .then((result) => {
            res.send([result]);
        }).catch((err) => {
            console.log({message:err.message});
        });
})

router.get('/vieworder/:useremail',(req,res)=>{
    OrderModel.find({useremail:req.params.useremail})
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

router.put('/cancelorder',(req,res)=>{
    let updateorder={
        orderstatus:false
    }
    OrderModel.findOneAndUpdate({productorderid:req.body.productorderid},{$set:updateorder},{new:true})
        .then((result) => {
            res.send([result]);
        }).catch((err) => {
            console.log({message:err.message});
        });
})

module.exports=router;