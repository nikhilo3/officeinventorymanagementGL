import express from "express";
import { verifytoken } from "../middleware/verifyToken.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";

const orderRouter = express.Router();

orderRouter.post('/create', verifytoken, async (req, res) => {
    try {
        const { productname, supplierName, quantity } = req.body;
        const { _id } = req.user;

        const user = await User.findById({ _id })
        console.log("orderByuser=", user?._id);


        let newOrder = new Order({
            productname,
            orderBy: user._id,
            supplierName,
            quantity
        })

        newOrder.save();

        res.status(200).json({ success: true, message: 'Order Placed Successfull' })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message, stack: error.stack })
    }
})


orderRouter.post('/updatestatus', verifytoken, async (req, res) => {
    try {
        const { orderStatus, id } = req.body

        await Order.findOneAndUpdate({ _id: id }, { orderStatus: orderStatus }, { new: true })

        res.status(200).json({ success: true, message: 'status change Successfull' })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message, stack: error.stack })
    }
})


orderRouter.get('/get', verifytoken, async (req, res) => {
    try {

        const orders = await Order.find().populate('orderBy');

        res.status(200).json({ success: true, orders })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message, stack: error.stack })
    }
})

export default orderRouter;