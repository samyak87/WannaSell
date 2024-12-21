import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";
import { log } from "console";
import e from "express";
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
      const product = await productModel.find({}).select("-photo").limit(12).sort({createdAt:-1});
      res.status(200).send({
          message:"Products fetched successfully",
          product,
          success:true
      })
   } catch (error) {
    console.log(error);
    res.status(500),send({
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
    res.status(500),send({
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
          return  res.status(200).send({
                message:"Product photo fetched successfully",
                product,
                success:true
            })
        }
       
      }
 catch (error) {
    console.log(error);
    res.status(500),send({
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


export const updateProductController = async(req,res) =>{
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
    
        const product = await productModel.findByIdAndUpdate(req.params.pid,{
            ...req.fields,slug:slugify(name)},{new:true})
    
        if(product)
        {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
    
            await product.save();
    
            res.status(201).send({
                message: "Product updated successfully",
                success:true,
                product
            })
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "Error in updating product",
          success: false,
          error,
        });
      }
}