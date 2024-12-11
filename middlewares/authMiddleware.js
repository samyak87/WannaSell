import JWT from 'jsonwebtoken';
import userModel from "../models/userModel.js";

export const requireSignIn = async (req,res,next) =>{
    try {
        const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET);

        // check it
        req.user=decode;
        
        next();
    } catch (error) {
        console.log(error);
        
    }

}



// admin access
export const isAdmin = async(req,res,next) =>{
    try {
        const user = await userModel.findById(req.user._id);
        if(user.role!==1)
        {
           res.status(401).send({
            message:"unauthorised access",
            success:false,
           })
        }
        else{
            next();
        }
    } catch (error) {
        console.log(error);
        
    }
}