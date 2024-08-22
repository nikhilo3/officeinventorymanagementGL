import { verifytoken } from "../middleware/verifyToken.js";
import Product from "../models/productModel.js";
import express from "express";

const productrouter = express.Router();


// add product
productrouter.post('/add', verifytoken, async (req, res) => {
    try {
        const newproduct = await Product.create(req.body);

        res.status(200).json({ success: true, newproduct: newproduct })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message, stack: error.stack })
    }
});


productrouter.get('/get', verifytoken, async (req, res) => {

    try {
        const products = await Product.find()

        res.status(200).json({ success: true, products })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message, stack: error.stack })
    }
});

productrouter.delete('/remove', verifytoken, async (req, res) => {

    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "Please provide product id" });
        }
        const removedproduct = await Product.findByIdAndDelete(id)

        res.status(200).json({ success: true, removedproduct })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message, stack: error.stack })
    }
});

productrouter.put('/update', verifytoken, async (req, res) => {

    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "Please provide product id" });
        }
        const updatedproduct = await Product.findByIdAndUpdate({ _id: id }, req.body, { new: true })

        res.status(200).json({ success: true, updatedproduct })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message, stack: error.stack })
    }
});


export default productrouter;