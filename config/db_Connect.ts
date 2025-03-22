import mongoose from "mongoose"



const dbConnect = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URL || "")
        console.log(`Database is connected:${conn.connection.host}`)
    } catch (error) {
        console.log(error)

    }
}

export default dbConnect