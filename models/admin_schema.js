const schema_mongoose=require('mongoose');


const AdminSchema = schema_mongoose.Schema(
    {
    adminname: { type: String },
    adminemail: { type: String },
    adminmobile: { type: String },
    adminpass: { type: String },
    adminaddress:{type:String}
    },
    {
       timestamps: true
    }
    );

module.exports=schema_mongoose.model('admin_details_collection',AdminSchema);