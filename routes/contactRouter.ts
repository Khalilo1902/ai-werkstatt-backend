
import express from "express"
import { postContact } from "../controller/contactController"




const contactRouter = express.Router()

contactRouter.post("/api/send",postContact)





export default contactRouter