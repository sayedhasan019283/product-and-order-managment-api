import express  from "express";
import { orderController } from "./order.controller";

const router =  express.Router();

router.post('/orders', orderController.createNewOrder);
router.get('/orders', orderController.retrieveAllOrder);

export const orderRouter = router;
