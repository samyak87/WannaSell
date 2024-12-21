import slugify from "slugify";
import CategoryModel from "../models/CategoryModel.js";
export const createCategoryController = async(req,res) =>{
  try {
    const {name} = req.body;

    if(!name) {
        return res.status(401).send({message: "Name is required"});
    }

    const existingCategory = await CategoryModel.findOne({name});

    if(existingCategory)
    {
      return  res.status(200).send({
            success:true,
            message: "Category already exists",
        })
    }

    const category = await new CategoryModel({ 
        name, 
        slug : slugify(name)
    }).save();

   return res.status(201).send({
        message: 'New Category created',
        success : true,
        category, 
    })


  } catch (error) {
    console.log(error);
    return res.status(500).send({
        message: "Error in category",
        success:false,
        error,
     })
    
  }
}


// update category controller
export const updateCategoryController = async(req,res) =>{
   try {
    const {name} = req.body;
    const {id} = req.params;
      const category = await CategoryModel.findByIdAndUpdate(id,{name,slug: slugify(name)},{new:true});
      res.status(201).send({
        message : "category updated",
        success : true,
        category
      })
   } catch (error) {
     console.log(error);
     res.status(500).send({
      message: "error while updating category",
      error,
      success: false,
     })
   }
}


// get All categories controller
export const categoriesController = async(req,res) =>{
  try {
    const {name} = req.body;
      const categories = await CategoryModel.find();
      res.status(201).send({
        message : "categories retrieved",
        success : true,
        categories
      })
  }
  catch{
    console.log(error);
    res.status(500).send({
     message: "error while getting categories",
     error,
     success: false,
    })
  }
}
 
// get single category
export const categoryController = async(req,res) =>{
  try {
   const {slug} = req.params.slug
      const category = await CategoryModel.findOne(slug);
      res.status(201).send({
        message : "category retrieved",
        success: true,
        category
      })
  }
  catch{
    console.log(error);
    res.status(500).send({
     message: "error while getting category",
     error,
     success: false,
    })
  }
}
 

// delete a category
export const deleteCategoryController = async(req,res) =>{
  try {
   const {id} = req.params
      await CategoryModel.findByIdAndDelete(id);
      res.status(200).send({
        message : "category deleted",
        success: true,
      })
  }
  catch{
    console.log(error);
    res.status(500).send({
     message: "error while deleting category",
     error,
     success: false,
    })
  }
}
 