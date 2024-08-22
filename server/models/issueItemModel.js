import mongoose from "mongoose";

var issueSchema = new mongoose.Schema({
    departmentName: {
        type: String,
        required: true
    },
    items: [
        {
            itemid: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number }
        }
    ]
}, { Timestamp: true })

let IssueItem = mongoose.model('IssueItem', issueSchema);

export default IssueItem;