import mongoose, { mongo } from 'mongoose'
import colors from 'colors'

const connectDB= async (params) => {
   try {
     const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`Connected to database -> ${conn.connection.host}`);
    
   } catch (error) {
     console.log(`error is -> ${error}`.bgRed.white);
     
   }
}

export default connectDB
