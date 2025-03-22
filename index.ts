import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbConnect from "./config/db_Connect";
import ContentRouter from "./routes/contentRouter";
import ContactRouter from "./routes/contactRouter";


dotenv.config()
dbConnect()

const app = express()


app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(cookieParser());
app.use(ContentRouter)
app.use("/contact",ContactRouter)

const PORT = process.env.PORT || 7060

app.listen(PORT,()=>{
    console.log(`Server läuft auf http://localhost:${PORT}`)
})