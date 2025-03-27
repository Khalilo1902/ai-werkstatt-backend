import mongoose from "mongoose";

const aiRequestSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: false, 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});


export default mongoose.model("AIRequest", aiRequestSchema);