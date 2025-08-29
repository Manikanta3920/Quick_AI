import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import { auth  } from './middlewares/auth.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoutes.js';

const app= express()

await connectCloudinary()
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
// app.use(clerkAuth())
app.get('/',(req,res)=>res.send('Server is live!'))

app.use(requireAuth())

app.use('/api/ai',aiRouter)
app.use('/api/user',userRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Server is running at port ",PORT)
})

// console.log('CLERK_PUBLISHABLE_KEY:', process.env.CLERK_PUBLISHABLE_KEY);
// console.log('Cloudinary Key:',process.env.CLOUDINARY_API_KEY);
