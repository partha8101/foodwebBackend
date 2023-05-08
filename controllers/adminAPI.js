const bcrypt = require('bcrypt');
const express=require('express');
const router=express.Router();
const AdminModel=require('../models/admin_schema');
const UserModel=require('../models/user_schema');
const ProductModel=require('../models/product_schema');
const OrderModel=require('../models/order_schema');
const cloudinary=require('cloudinary').v2;
const CartModel=require('../models/cart_schema');
const RestaurentModel=require('../models/restaurent_schema');


router.post('/reg',(req,res)=>{
    bcrypt.hash(req.body.adminpass,10)
    .then((encpass)=>{
    const Adminobj=new AdminModel({
        adminname: req.body.adminname,
        adminemail: req.body.adminemail,
        adminmobile: req.body.adminmobile,
        adminpass:encpass,
        adminaddress:req.body.adminaddress
    })
    AdminModel.find({$or:[{adminemail:req.body.adminemail},{adminmobile:req.body.adminmobile}]})
        .then((result1) => {
            if(result1.length>0){
                res.send([]);
            }
            else{
                Adminobj.save()
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
    AdminModel.find({adminemail:req.body.adminemail})
        .then((result) => {
            if(result.length>0){
                let collectedpass=req.body.adminpass;
                let storedpass=result[0].adminpass;
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

router.get('/viewuser',(req,res)=>{
    UserModel.find()
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

router.get('/viewres',(req,res)=>{
    RestaurentModel.find()
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
router.delete('/deleteuser/:useremail',(req,res)=>{
    UserModel.findOneAndDelete({useremail:req.params.useremail})
        .then((result) => {
            res.send([result]);
        }).catch((err) => {
            console.log({message:err.message});
        });
})

router.delete('/deleteres/:resemail',(req,res)=>{
    RestaurentModel.findOneAndDelete({resemail:req.params.resemail})
        .then((result) => {
            res.send([result]);
        }).catch((err) => {
            console.log({message:err.message});
        });
})

router.put('/userupdate',(req,res)=>{
    let userobj={
        username:req.body.username
    }
    UserModel.findOneAndUpdate({useremail:req.body.useremail},{$set:userobj},{new:true})
        .then((result) => {
            res.send([result]);
        }).catch((err) => {
            console.log({message:err.message});
        });
})

router.put('/resupdate',(req,res)=>{
    let resobj={
        resname:req.body.resname,
        resaddress:req.body.resaddress,
        active:req.body.active
    }
    RestaurentModel.findOneAndUpdate({resemail:req.body.resemail},{$set:resobj},{new:true})
        .then((result) => {
            res.send([result]);
        }).catch((err) => {
            console.log({message:err.message});
        });
})

router.put('/updatepass',(req,res)=>{
    bcrypt.hash(req.body.adminnewpass,10)
        .then((encpass) => {
            let adminobj={
                adminpass:encpass
            }
            AdminModel.findOneAndUpdate({adminemail:req.body.adminemail},{$set:adminobj},{new:true})
                .then((result) => {
                    res.send([result]);
                }).catch((err) => {
                    console.log({message:err.message});
                });
        })  
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


router.get('/vieworderofres/:resemail',(req,res)=>{
    OrderModel.find({resemail:req.params.resemail})
    
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


module.exports=router;