import express from "express";
import { verifytoken } from "../middleware/verifyToken.js";
import IssueItem from "../models/issueItemModel.js";
import Product from "../models/productModel.js";


const issueItemRouter = express.Router();

issueItemRouter.post('/', verifytoken,async (req, res) => {
    try {
        const { departmentName, items } = req.body;

        for (let i = 0; i < items.length; i++) {
            const product = await Product.findById(items[i].itemid);
            if (!product) {
                return res.status(404).json({ success: false, message: "Product not found" });
            }
            if (product.quantity < items[i].quantity) {
                return res.status(400).json({ success: false, message: `Insufficient stock for ${product.productname}` });
            }

            product.quantity -= items[i].quantity;
            await product.save();
        }

        const issueItem = new IssueItem({
            departmentName,
            items
        })

        await issueItem.save();
        res.status(201).json({ message: "Issue item successfully", issueItem });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message, stack: error.stack })
    }
})


issueItemRouter.get('/get',verifytoken, async (req, res) => {
    try {
        const getissueitem = await IssueItem.find().populate('items.itemid');
        res.status(201).json({ getissueitem });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message, stack: error.stack })
    }
})

export default issueItemRouter;