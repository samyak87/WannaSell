import { compare } from "bcrypt";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

// register
export const registerController = async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;

    if (!name) {
      return res.send({ message: "name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone is required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }

    // checking if the user already exists
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(200).send({
        success: false,
        message: "user already exists, please login",
      });
    }

    // registering new user
    const hashedPassword = await hashPassword(password);
    const newUser = await new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
    }).save();

    res.status(201).send({
      success: true,
      message: "user successfully regsitered",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in registration",
      error,
    });
  }
};

//post - login
export const loginController = async(req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(404).send({
        success: false,
        message: "bad credentials",
       
      });
    }
      
      // checking if the user doesnt exists
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "user doesnt exists, please register",
      });
    }
      const match = await comparePassword(password,user.password);
      if(!match)
      {
       res.status(200).send({
          success: false,
          message: "wrong password"
        })
      }

      //token
      const token= await JWT.sign({_id : user._id}, process.env.JWT_SECRET,{
      expiresIn : '5d',
      });

     res.status(200).send({
        success:true,
        message : "login successful",
       user:{
          name: user.name,
          email : user.email,
          address: user.address,
          phone: user.phone

        },
        token
      })
        
      

    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};




// test controller
export const testController = (req,res)=>{
 res.send("protected routes" )
  
}