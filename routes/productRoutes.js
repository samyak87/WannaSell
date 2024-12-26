import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, deleteProductController, filterProductsController, getProductController, getSingleProductController, productCountController, productListController, productPhotoController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable'
const router = express.Router();

// routes

// create product
router.post('/create-product',requireSignIn,formidable(),isAdmin,createProductController);

// get all products
router.get('/get-product',getProductController )

// get single product
router.get('/get-product/:slug',getSingleProductController )

// get photo
router.get('/product-photo/:pid',productPhotoController);

// delete product
router.delete('/delete-product/:pid',requireSignIn,isAdmin,deleteProductController);

// update product
router.put('/update-product/:pid',requireSignIn,formidable(),isAdmin,updateProductController);


// filter products
router.post('/product-filters',filterProductsController);

// product count
router.get('/product-count',productCountController);

// product per page
router.get('/product-list/:page',productListController);

export default router