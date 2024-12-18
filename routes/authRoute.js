import express from 'express'
import {registerController,loginController,testController,forgotPasswordController} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// router object
const router = express.Router();

// regiter || method post
router.post('/register',registerController)


// login ||method post
router.post('/login',loginController)


// forgot password || POST
router.post('/forgot-password',forgotPasswordController)

// test routes to check
router.get('/test',requireSignIn,isAdmin,testController)


// protected user route auth
router.get('/user-auth',requireSignIn,(req,res) =>{
    res.send(200).status({
        ok:true,
    });
});

// protected admin route auth
router.get('/admin-auth',requireSignIn,isAdmin,(req,res) =>{
    res.send(200).status({
        ok:true,
    });
});



export default router;