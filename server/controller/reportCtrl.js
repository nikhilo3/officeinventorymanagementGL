import express from "express";
import Product from "../models/productModel.js";
import IssueItem from "../models/issueItemModel.js";
import ReturnItem from "../models/returnItemModel.js";
import Order from "../models/orderModel.js";

const reportRouter = express.Router();

reportRouter.get('/inventoryitems', async (req, res) => {
    try {
        const totalProduct = await Product.countDocuments()

        return res.status(200).json({ totalProduct })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message, stack: error.stack })
    }
})

reportRouter.get('/totalquantity', async (req, res) => {
    try {
        const totalQuantity = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalQuantity: { $sum: '$quantity' }
                }
            }
        ])

        const total = totalQuantity.length > 0 ? totalQuantity[0].totalQuantity : 0
        return res.status(200).json({ total })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message, stack: error.stack })
    }
})

reportRouter.get('/issueitems', async (req, res) => {
    try {
        const totalIssueItem = await IssueItem.countDocuments();

        return res.status(200).json({ totalIssueItem })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message, stack: error.stack })
    }
})

reportRouter.get('/returnitems', async (req, res) => {
    try {
        const totalReturnItem = await ReturnItem.countDocuments();
        return res.status(200).json({ totalReturnItem })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message, stack: error.stack })
    }
})


reportRouter.get('/totalorder', async (req, res) => {
    try {
        const totalOrder = await Order.countDocuments();
        return res.status(200).json({ totalOrder })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message, stack: error.stack })
    }
})


export default reportRouter