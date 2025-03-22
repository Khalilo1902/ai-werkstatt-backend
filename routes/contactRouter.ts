import express from "express"
import { postContact } from "../controller/ContactController"
 

const ContactRouter = express.Router()

ContactRouter.post("/api/send",postContact)





export default ContactRouter