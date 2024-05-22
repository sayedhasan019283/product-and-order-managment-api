import { Request, Response } from "express";
import { orderService } from "./order.service";

const createNewOrder = async (req:Request, res: Response) =>{
    const data = req.body;
    try {
        const result = await orderService.createNewOrderToDB(data);
        if (result === "insufficient stock!") {
            return res.status(500).json({
                success: false,
                message: "Insufficient quantity available in inventory"
            });
        }
        return res.status(201).json({
            success: true,
            message: "order created successfully!",
            data: result,
          });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'product is not created successfully',
            error: error,
          });
    }
}

const retrieveAllOrder = async (req:Request, res: Response) => {
    try {
        const {email} = req.query;
        const result = await orderService.retrieveAllOrderFromDB(email);

        if (result.length === 0) {
            return res.status(500).json({
                success: false,
                message: "Order not found"
               });
        }

        return res.status(200).json({
            success: true,
            message: "order fetched successfully!",
            data: result,
          });
    } catch ( error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "order not fetched successfully!",
            error: error,
          });
    }
}

export const orderController = {
    createNewOrder,
    retrieveAllOrder,
}