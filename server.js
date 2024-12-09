import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'

// configure env (for storing private info)
dotenv.config()

// rest object creation (for api)
const app = express()


// database config
connectDB()


// middlewares
app.use(express.json())
app.use(morgan('dev'))


// routes
app.use('/api/v1/auth',authRoutes)



// rest api
app.get("/",(req,res)=>{
   res.send('<h1>welcome to Ecommerce app</h1>');
});

// PORT
// const PORT= 8080

// adding security
const PORT= process.env.PORT || 8080;

// run app
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`.bgCyan.white);
})
