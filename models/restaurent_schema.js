const schema_mongoose=require('mongoose');


const RestaurentSchema = schema_mongoose.Schema(
    {
    resname: { type: String },
    resemail: { type: String },
    resmobile: { type: String },
    respass: { type: String },
    resaddress:{type:String},
    active:{type:Boolean}
    },
    {
       timestamps: true
    }
    );

module.exports=schema_mongoose.model('restaurent_details_collection',RestaurentSchema);