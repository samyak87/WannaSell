import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { categoriesController, categoryController, createCategoryController, deleteCategoryController, updateCategoryController } from '../controllers/createCategoryController.js';

const router = express.Router();

// routes

// create category
router.post('/create-category',requireSignIn,isAdmin,createCategoryController);

// update category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController);

// getAll category
router.get('/categories',categoriesController);

// getSingle category
router.get('/category/:slug',categoryController);

// delete category 
router.get('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)

export default router