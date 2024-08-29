
const User = require('../models/User');




const register = async(req,res)=>{
    try{
        const{name,email,password}=req.body;

        const newUser =new User({name,email,password})
        await newUser.save();

        res.status(201).json({message:'user registered Successfully.'});
    }catch(error){
        res.status(500).json({message:'error while restrating user.',error});
    }
};
const login = async(req,res)=>{
    try{
        const{email,password}= req.body;
        const user=await User.findOne({email});

        if(!user||user.password!==password){
            return res.status(401).json({message:'invalid credential',error});
        }
        res.json({message:"logged in successfuly",user})
    }catch(error){
        return res.status(401).json({message:"error occure while logging in",error});
    }
        };
        const updateUser = async (req, res) => {
            try {
                const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!user) return res.status(404).json({ error: 'User Not Found.' });
                res.json(user);
            } catch (error) {
                res.status(500).json({ error: 'Error updating user' });
            }
        };
        
        const getUser = async (req, res) => {
            try {
                const user = await User.findById(req.params.id);
                if (!user) return res.status(404).json({ error: 'User Not Found.' });
                res.json(user);
            } catch (error) {
                res.status(500).json({ error: 'Error fetching user' });
            }
        };
        
        module.exports = { register, login, updateUser, getUser };
        
    