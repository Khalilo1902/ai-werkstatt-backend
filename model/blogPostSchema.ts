import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      required: false, 
    },
    fullContent: {
      type: mongoose.Schema.Types.Mixed, // This allows for rich content like React components or HTML
      required: true,
    },
  });
  

export default mongoose.model('BlogPost', blogPostSchema)