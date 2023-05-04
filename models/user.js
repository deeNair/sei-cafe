const mongoose = require('mongoose');

/**mongoose.Schema({ })*/

const Schema = mongoose.Schema;
const bcrypt= require('bcrypt');

const SALT_ROUNDS =6;
const userSchema = new Schema({
    name: {type: String, required: true},
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
    },
},{
    timestamps:true,
    toJSON:function(doc,ret){
        delete ret.password;
        return ret;
    }

});// when doc gets converted from string

//happens befor tojson 
//pre hook , runs before u save document
userSchema.pre('save',async function(next){
    //if pswrd not modified cont to next middleware
     if(!this.isModified('password')) return next();
     //hash password , pass it to bcrypt lib.
    // grab plain pswrd and set it to hash pswrd
    this.password=await bcrypt.hash(this.password,SALT_ROUNDS);
    return next();
})

module.exports = mongoose.model('User', userSchema);