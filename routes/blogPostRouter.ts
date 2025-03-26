import express from "express"
import { createBlogPost, deleteBlogPost, getAllBlogPosts, updateBlogPost } from "../controller/blogPostController"
import uploadImage from "../utils/multerConfig"
import { processImage } from "../utils/processImage"


const blogPostRouter = express.Router()


blogPostRouter.post("/api/blog/create",uploadImage.single("image"),processImage,createBlogPost)
blogPostRouter.get("/api/blog/get-blog",getAllBlogPosts)
blogPostRouter.put("/api/blog/update/:id",uploadImage.single("image"),processImage,updateBlogPost)
blogPostRouter.delete("/api/blog/delete/:id",deleteBlogPost)



export default blogPostRouter