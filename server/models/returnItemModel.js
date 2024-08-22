import mongoose from "mongoose";

var returnSchema = new mongoose.Schema({
    departmentName: {
        type: String,
        required: true
    },
    items: [
        {
            item: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true }
        }
    ],
    returnDate: {
        type: Date,
        default: Date.now
    },
    reason:{
        type:String,
        required:true
    }
})

const ReturnItem = mongoose.model('ReturnItem',returnSchema);

export default ReturnItem;