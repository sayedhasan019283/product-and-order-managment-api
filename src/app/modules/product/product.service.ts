import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (product : Product)=>{
    const Result = await ProductModel.create(product);
    return Result;
}

const retrieveAllProductFromDB =async (searchTerm : string | undefined) =>{
    let products;

    if (searchTerm) {
        
      // Search for products matching the searchTerm
      products = await ProductModel.find({ name: new RegExp(searchTerm, 'i') }); 
      // Case-insensitive search
    } else {
      // Return all products
      products = await ProductModel.find({});
    }
    return products;
}

const retrieveOneSpecificProductByIDFromDB = async (id : string) =>{
    const result = await ProductModel.findById(id);
    console.log(result)
    return result
}

const UpdateProductInformationIntoDB = async (productId : string, updateData : Product ) => {
    const result = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
    console.log(result)
    return result;
}

const deleteProductFromDB = async (productId: string) => {
    try {
        const result = await ProductModel.findByIdAndDelete(productId);
        if (!result) {
            throw new Error('Product not found');
        }
        return result;
    } catch (error) {
        throw new Error(`Error deleting product: ${error}`);
    }
};

export const productService = {
    createProductIntoDB,
    retrieveAllProductFromDB,
    retrieveOneSpecificProductByIDFromDB,
    UpdateProductInformationIntoDB,
    deleteProductFromDB,
}