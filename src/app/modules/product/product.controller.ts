import { Request, Response } from "express";
import productValidateSchema from "./product.validate";
import { productService } from "./product.service";


const createProduct = async (req:Request, res : Response) =>{
    try {
        const product = req.body; 
        console.log("product from frontend",product)
        const { value} = productValidateSchema.validate(product);
        const result = await productService.createProductIntoDB(value);
        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            data: result,
          });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'product is not created successfully',
            error: error,
          });
    }
}

const getAllProduct = async (req:Request, res : Response) => {
    try {
        const {searchTerm} = req.query;
        const result = await productService.retrieveAllProductFromDB(searchTerm);
        // Modify the result data to move the 'inventory' object to the end of each product entry
        if (result.length === 0) {
            return res.status(500).json({
                success: false,
                message: "No result found!",
              });
        }
        const modifiedResult = result.map(product => {
            return {
                id:product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                tags: product.tags,
                variants: product.variants,
                inventory: product.inventory 
            };
        });
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: modifiedResult,
          });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Products not fetched successfully!",
            error: error,
          });
    }
}

const retrieveOneSpecificProductByID = async (req:Request, res : Response) =>{
    try {
        const {productId} = req.params;
        const result = await productService.retrieveOneSpecificProductByIDFromDB(productId)

        const modifiedResult = {
            id:result!._id,
            name: result!.name,
            description: result!.description,
            price: result!.price,
            category: result!.category,
            tags: result!.tags,
            variants: result!.variants,
            inventory: result!.inventory 
        };

        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: modifiedResult,
          });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Products not fetched successfully!",
            error: error,
          });
    }
}

const UpdateProductInformation = async (req:Request, res : Response) => {
    try {
        const {productId} = req.params;
        const updateData = req.body;
        const { value} = productValidateSchema.validate(updateData);
        const result = await productService.UpdateProductInformationIntoDB(productId , value)

        const modifiedResult = {
            id:result!._id,
            name: result!.name,
            description: result!.description,
            price: result!.price,
            category: result!.category,
            tags: result!.tags,
            variants: result!.variants,
            inventory: result!.inventory 
        };

        if (result) {
            res.status(200).json({
                success: true,
                message: "Product updated successfully!",
                data: modifiedResult,
              });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Product not updated successfully!",
            error: error,
          });
    }
}

const deleteProduct = async (req : Request, res : Response) => {
    try {
        const {productId} = req.params;
         await productService.deleteProductFromDB(productId);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
          });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Product not updated successfully!",
            error: error,
          });
    }
}

export const productController = {
    createProduct,
    getAllProduct,
    retrieveOneSpecificProductByID,
    UpdateProductInformation,
    deleteProduct
}