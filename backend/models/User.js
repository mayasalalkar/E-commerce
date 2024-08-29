const mongoose = require('mongoose');


const userSchema = new mongoose.Schema ({
    name:{type:String,required:true},
   email:{type:String,required:true,uniuqe:true},
   password:{type:String,require:true},
   role:{type:String,default:"customer"}

});
const User= mongoose.model('User',userSchema);

module.exports=User;

