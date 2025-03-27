import express from "express";
import  {generateText, getGenerateText}  from "../controller/aiController";

const aiRouter = express.Router();

aiRouter.post("/api/generate-text", generateText);
aiRouter.get("/api/get-generate-text", getGenerateText);


export default aiRouter;