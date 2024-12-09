import express from 'express'
import {registerController,loginController} from '../controllers/authController.js';


// router object
const router = express.Router();

// regiter || method post
router.post('/register',registerController)


// login ||method post
router.post('/login',loginController)


export default router;