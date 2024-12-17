import express from 'express'
import {registerController,loginController,testController} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// router object
const router = express.Router();

// regiter || method post
router.post('/register',registerController)


// login ||method post
router.post('/login',loginController)



// test routes to check
router.get('/test',requireSignIn,isAdmin,testController)


// protected route auth
router.get('/user-auth',requireSignIn,(req,res) =>{
    res.send(200).status({
        ok:true,
    })
})


export default router;