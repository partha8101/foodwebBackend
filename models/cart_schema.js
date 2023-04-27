const schema_mongoose=require('mongoose');


const CartSchema = schema_mongoose.Schema(
    {
    productname: { type: String },
    producturl: { type: String },
    productprice: { type: String },
    productquantity:{type:Number},
    useremail: {type:String},
    resemail:{type:String},
    resname:{type:String}
    },
    {
       timestamps: true
    }
    );

module.exports=schema_mongoose.model('cart_details_collection',CartSchema);