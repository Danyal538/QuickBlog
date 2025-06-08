import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    blog: { type: mongoose.Schema.Types.ObjectId, ref: "blog", required: true },
    content: { type: String, required: true },
    name: { type: String, required: true },
    isApproved: { type: Boolean, required: false }
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;