import express from "express"
import { createBlogPost, deleteBlogPost, getAllBlogPosts, updateBlogPost } from "../controller/blogPostController"
import uploadImage from "../utils/multerConfig"


const blogPostRouter = express.Router()


blogPostRouter.post("/api/blog/create",uploadImage.single("image"),createBlogPost)
blogPostRouter.get("/api/blog/get-blog",getAllBlogPosts)
blogPostRouter.put("/api/blog/update/:id",uploadImage.single("image"),updateBlogPost)
blogPostRouter.delete("/api/blog/delete/:id",deleteBlogPost)



export default blogPostRouter