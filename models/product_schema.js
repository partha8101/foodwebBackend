const schema_mongoose=require('mongoose');


const ProductSchema = schema_mongoose.Schema(
    {
    productname: { type: String },
    producturl: { type: String },
    productprice: { type: String },
    productdescription: { type: String },
    resname: { type: String },
    resemail: { type: String },
    resaddress:{type:String},
    resaddress:{type:String}
    }, 
    {
       timestamps: true
    }
    );

module.exports=schema_mongoose.model('product_details_collection',ProductSchema);