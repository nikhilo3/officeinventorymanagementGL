import mongoose from "mongoose";

var orderSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        default: "Pending",
        enum: ["Pending", "deliverd"],
    },
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    supplierName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema);

export default Order