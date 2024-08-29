const mongoose = require('mongoose');



const orderSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId,ref:'User'},
    products:[{product:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},quantity:Number}],
    price:{type:Number,required:false},
    totalAmount:{type:Number,required:true},
    status:{type:String,default:'pending'}
    
});
const order = mongoose.model('order',orderSchema);

module.exports=order;