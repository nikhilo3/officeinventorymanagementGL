import mongoose from "mongoose";

var productSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema);

export default Product