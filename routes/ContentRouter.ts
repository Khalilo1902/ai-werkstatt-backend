import express from "express"
import { createContent, getAllContent } from "../controller/contentController"

const ContentRouter = express.Router()


ContentRouter.post("/api/content/create",createContent)
ContentRouter.get("/api/content/get-content",getAllContent)





export default ContentRouter