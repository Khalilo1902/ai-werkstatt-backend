import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbConnect from "./config/db_Connect";
import contactRouter from "./routes/contactRouter";
import blogPostRouter from "./routes/blogPostRouter";
import contentRouter from "./routes/contentRouter";
import path from "path";


dotenv.config()
dbConnect()

const app = express()


app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(contentRouter)
app.use("/contact",contactRouter)
app.use(blogPostRouter)
const uploadsPath = path.join(__dirname, 'uploads');
console.log(`Uploads are served from: ${uploadsPath}`);

const PORT = process.env.PORT || 7060

app.listen(PORT,()=>{
    console.log(`Server läuft auf http://localhost:${PORT}`)
})