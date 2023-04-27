const schema_mongoose=require('mongoose');


const OrderSchema = schema_mongoose.Schema(
    {
    productorderid:{type:String},
    productname: { type: String },
    producturl: { type: String },
    productprice: { type: Number },
    productdescription: { type: String },
    productquantity:{type:Number},
    producttotalprice:{type:Number},
    useremail:{type:String},
    username:{type:String},
    resemail:{type:String},
    resname:{type:String},
    orderstatus:{type:Boolean},
    orderdate:{type:String},
    ordertime:{type:String},
    deliveryaddress:{type:String}
    }, 
    {
       timestamps: true
    }
    );

module.exports=schema_mongoose.model('order_details_collection',OrderSchema);