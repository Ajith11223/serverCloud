import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js'
import ChatRoute from './Routes/ChatRoute.js'
import MessageRoute from './Routes/MessageRoute.js'

// Routes
dotenv.config();

const app = express()
app.use(cors())

// to serve image for public

app.use(express.static('public'))
app.use('/images',express.static('images'))

//Middleware
app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));


// mongoose

mongoose.connect(process.env.MONGO_DB,{useNewUrlParser:true,useUnifiedTopology:true}).
then(()=> app.listen(process.env.PORT,()=> console.log(`server connectd port: ${process.env.PORT}`))).
catch((error)=> console.log(error))
// mongoose.connect("mongodb://127.0.0.1:27017/socialMedia",()=>{
//     console.log("db");
// })

// app.listen(5000,()=>{
//     console.log("nn");
// })
//Usage of Routes

app.use('/auth',AuthRoute)
app.use('/user',UserRoute)
app.use('/post',PostRoute)
app.use('/upload',UploadRoute)
app.use('/admin',UserRoute)
app.use('/chat',ChatRoute) 
app.use('/message',MessageRoute)
app.use('/posts',PostRoute)
app.use('/savepost',UserRoute)
app.use('/savedpost',PostRoute)


