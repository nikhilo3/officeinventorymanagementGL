import express from "express";
import { verifytoken } from "../middleware/verifyToken.js";
import Product from "../models/productModel.js";
import ReturnItem from "../models/returnItemModel.js";

const returnItemRouter = express.Router();

returnItemRouter.post('/', verifytoken, async (req, res) => {
    const { departmentName, items, reason } = req.body

    for (let i = 0; i < items.length; i++) {
        const product = await Product.findById(items[i].item);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        product.quantity += items[i].quantity;

        await product.save();

    }

    const returnItem = new ReturnItem({
        departmentName,
        items,
        reason
    })

    await returnItem.save()

    res.status(201).json({ success: true, message: "Items returned successfully", returnItem });
})


returnItemRouter.get('/get', verifytoken, async (req, res) => {
    const returnedItems = await ReturnItem.find().populate('items.item');
    res.status(200).json({ success: true, returnedItems });
})

export default returnItemRouter