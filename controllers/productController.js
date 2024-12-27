import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import { log } from "console";
import e from "express";
import { message } from "antd";
export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, shipping, quantity } =
      req.fields;
    const { photo } = req.files;

    switch (1) {
      case !name:
        return res.status(500).send({error : "Name is required"})
      case !description:
        return res.status(500).send({error : "Description is required"})
      case !price:
        return res.status(500).send({error : "Price is required"})
      case !category:
        return res.status(500).send({error : "Category is required"})
      case !shipping:
        return res.status(500).send({error : "Shipping is required"})
      case !quantity:
        return res.status(500).send({error : "Quantity is required"})
      case photo && photo.size>100000:
        return res.status(500).send({error : "Photo is required and should be less than 1MB"})
    }

    const product = new productModel({...req.fields, slug: slugify(name)})

    if(product)
    {
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;

        await product.save();

        res.status(201).send({
            message: "Product added successfully",
            success:true,
            product
        })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in creating product",
      success: false,
      error,
    });
  }
};


// getProductController
export const getProductController = async(req,res) =>{
   try {
      const product = await productModel.find({})
      .populate("category")
      .select("-photo").limit(12).sort({createdAt:-1});
      res.status(200).send({
          message:"Products fetched successfully",
          counTotal: product.length,
          product,
          success:true
      })
   } catch (error) {
    console.log(error);
    res.status(500).send({
        message:"Error in getting products",
        error,
        success:false
    })
    
   }
}


export const getSingleProductController = async(req,res) =>{
  try{
    const product = await productModel.findOne({slug: req.params.slug})
    res.status(200).send({
        message:"Product fetched successfully",
        product,
        success:true
    })
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
        message:"Error in getting product",
        error,
        success:false
    })
    
   }
}


export const productPhotoController = async(req,res) =>{
    try{
        const product = await productModel.findById(req.params.pid).select("photo");
        
        if(product.photo.data)
        {
            res.set('content-type',product.photo.contentType);
            return res.status(200).send(product.photo.data);

        }
       
      }
 catch (error) {
    console.log(error);
    res.status(500).send({
        message:"Error in getting product photo",
        error,
        success:false
    })
    
   }
}


export const deleteProductController = async(req,res) =>{
  try{
    await productModel.findByIdAndDelete(req.params.pid).select("-photo")
    res.status(200).send({
        message:"Product deleted successfully",
        success:true
    })
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
        message:"Error in deleting product",
        error,
        success:false
    })
    
   }
}


export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};


// filter products controller
export const filterProductsController = async(req,res) =>{
  try {
    const {checked,radio} = req.body
    let args= {};
    if(checked.length>0) args.category= checked;
    if(radio.length>0) args.price = {$gte:radio[0], $lte: radio[1]}

    const products = await productModel.find(args);
    res.status(200).send({
      message:"Products fetched successfully",
      products,
      success:true
    })
  } catch (error) {
    console.log(error);
    res.status(400).send({
    success:false,
    message:"Something went wrong",
    error
    })
    
    
  }
}



// product count

export const productCountController = async(req,res) =>{
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success:true,
      total,
    })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message:"Error in counting products",
      success:false,
      error
    })
    
  }
}


// product list per page
export const productListController= async(req,res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message:"Error in listing products",
      success:false,
      error
    })
    
  }
}



// search product controller
export const searchProductController = async(req,res) =>{
  try {
    const {keyword} = req.params;
    const result = await productModel.find({
      $or :[
        {name : {$regex:keyword, $options: 'i'}},
        {description : {$regex:keyword, $options: 'i'}}

      ]
    }).select('-photo')
    res.json(result);
    
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
      success:false,
      message:"Something went wrong"
    })
    
  }
}