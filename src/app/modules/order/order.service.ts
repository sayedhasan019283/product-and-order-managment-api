import { ProductModel } from './../product/product.model';
import { Order } from './order.interface';
import { OrderModel } from './order.model';

const createNewOrderToDB = async (order: Order) => {
    const { price, email, productId, quantity } = order;

    try {
        // Validate productId and fetch product details
        const product = await ProductModel.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        console.log("order", quantity, "product", product.inventory.quantity, "stock" ,product.inventory.inStock)
        if (product.inventory.quantity === 0) {
            product.inventory.inStock = false; 
        } else {
            return "insufficient stock!"
        } 

        if (product.inventory.quantity >= quantity) {
            product.inventory.quantity -= quantity;
        } else {
            return "insufficient stock!"
        } 
        
        // Validate price
        if (price !== product.price) {
            throw new Error('Price mismatch');
        }

        // Create order object
        const orderObject = {
            email,
            productId,
            price,
            quantity,
        };

        await product.save();
        // Save order to database
        const result = await OrderModel.create(orderObject);
        console.log("order", quantity, "product", product.inventory.quantity, "stock" ,product.inventory.inStock )
        return result;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error; // Propagate error to be handled by the calling function
    }
};


const retrieveAllOrderFromDB =async (email : string | undefined) =>{
    let order;

    if (email) {
        
      // Search for products matching the searchTerm
      order = await OrderModel.find({ email }); 
    } else {
      // Return all products
      order = await OrderModel.find({});
    }
    return order;
}

export const orderService = {
    createNewOrderToDB,
    retrieveAllOrderFromDB,
};
