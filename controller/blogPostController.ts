import { Request, Response } from "express";
import BlogPost from "../model/blogPostSchema"
import asyncHandler from "express-async-handler";

 const createBlogPost = asyncHandler (async (req:Request, res:Response) => {
    try {
      const { title, description, date, fullContent } = req.body;
      // const image = req.file ? `/uploads/${req.file.filename}` : "";        
      const image = req.file?.path 
      ? req.file.path.replace(/\\/g, '/') // Convert backslashes to forward slashes
      : null;
      const newBlogPost = new BlogPost({
        title,
        description,
        date,
        image,
        fullContent,
      });
  
      const savedBlogPost = await newBlogPost.save();
  
      res.status(201).json({
        message: "Blog post created successfully!",
        blogPost: savedBlogPost,
      });
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Server error", error });
    }
  });
  

  const updateBlogPost = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id } = req.params; 
      const { title, description, date,  fullContent } = req.body;
      const image = req.file?.path 
      ? req.file.path.replace(/\\/g, '/') // Convert backslashes to forward slashes
      : null;
                  const updatedBlogPost = await BlogPost.findByIdAndUpdate(
        id,
        { title, description, date, image, fullContent },
        { new: true }
      );
  
      if (!updatedBlogPost) {
         res.status(404).json({ message: "Blog post not found" });
      }
  
      res.status(200).json({
        message: "Blog post updated successfully!",
        blogPost: updatedBlogPost,
      });
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ message: "Server error", error });
    }
  });

  const deleteBlogPost = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id } = req.params; // Extract the post ID from the URL params
  
      const deletedBlogPost = await BlogPost.findByIdAndDelete(id);
  
      if (!deletedBlogPost) {
         res.status(404).json({ message: "Blog post not found" });
      }
  
      res.status(200).json({
        message: "Blog post deleted successfully!",
        blogPost: deletedBlogPost,
      });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Server error", error });
    }
  });

  const getAllBlogPosts = asyncHandler(async (req: Request, res: Response) => {
    try {
      const blogPosts = await BlogPost.find(); 
  
      if (!blogPosts || blogPosts.length === 0) {
         res.status(404).json({ message: "No blog posts found" });
      }
  
      res.status(200).json({
        message: "Blog posts retrieved successfully!",
        blogPosts,
      });
    } catch (error) {
      console.error("Error retrieving blog posts:", error);
      res.status(500).json({ message: "Server error", error });
    }
  });

  export{
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    getAllBlogPosts

  }