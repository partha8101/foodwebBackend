const schema_mongoose=require('mongoose');


const UserSchema = schema_mongoose.Schema(
    {
    username: { type: String },
    useremail: { type: String },
    usermobile: { type: String },
    userpass: { type: String },
    useraddress:{type:String}
    },
    {
       timestamps: true
    }
    );

module.exports=schema_mongoose.model('user_details_collection',UserSchema);