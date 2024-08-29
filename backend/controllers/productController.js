const Product= require('../models/Product');

const getProducts =async(req,res)=>{
    try{
        const products = await Product.find();
        res.json(products);
    }catch(error){
        res.status(500).json({error:'Error fetching products'});

        
    }
};

const getProduct =async(req, res)=>{
    try{
        const product = await Product.findById(req.params.id);
        if(!product)return res.status(404).json({error:'Product not found.'});
        res.json(product);
        
    }catch(error){
        res.status(500).json({error:'Error fetching products'});

}
};
const createProduct =async(req, res)=>{
    try{
        const newProduct = await Product(req.body);
        await newProduct.save()
        res.status(201).json(newProduct);
        
        
    }catch(error){
        res.status(500).json({error:'Error create products'});

}
};

const updateProduct =async(req, res)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.params.id,req-ReportBody,{new:true});
        if(!product)return res.status(404).json({error:'Product not found.'});
        res.json(product);
        res.json(products);
    }catch(error){
        res.status(500).json({error:'Error fetching products'});

}
};

const deleteProduct =async(req, res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product)return res.status(404).json({error:'Product not found.'});
        res.json(message,'product Deleted.');
        res.json(products);
    }catch(error){
        res.status(500).json({error:'Error fetching products'});

}
};
module.exports={getProduct,getProducts,createProduct,updateProduct,deleteProduct};
