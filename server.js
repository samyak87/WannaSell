import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'

// configure env
dotenv.config()

// rest object creation (for api)
const app = express()

// rest api
app.get("/",(req,res)=>{
   res.send('<h1>welcome to Ecommerce app</h1>');
});

// PORT
// const PORT= 8080
const PORT= process.env.PORT || 8080;

// run app
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`.bgCyan.white);
})
