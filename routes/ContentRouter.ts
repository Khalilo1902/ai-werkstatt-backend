import express from "express"
import { createContent, getAllContent } from "../controller/ContentController"

const contentRouter = express.Router()


contentRouter.post("/api/content/create",createContent)
contentRouter.get("/api/content/get-content",getAllContent)





export default contentRouter