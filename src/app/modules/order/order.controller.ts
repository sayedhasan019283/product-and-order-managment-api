import { Request, Response } from "express";
import { orderService } from "./order.service";

const createNewOrder = async (req:Request, res: Response) =>{
    const data = req.body;
    try {
        const result = await orderService.createNewOrderToDB(data);
        if (result === "Product not found") {
            return res.status(500).json({
                success: false,
                message: "Product not found by given id"
            });
        }

        if (result === "insufficient stock!") {
            return res.status(500).json({
                success: false,
                message: "Insufficient quantity available in inventory"
            });
        }
        if (result === "price didn't match") {
            return res.status(500).json({
                success: false,
                message: "JSON provided price didn't match"
            });
        }
        res.status(201).json({
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

        if (typeof email !== 'string' && typeof email !== 'undefined') {
            return res.status(400).json({
                success: false,
                message: "Invalid search term provided!",
            });
        }
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