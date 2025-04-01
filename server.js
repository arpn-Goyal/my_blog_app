import e from "express";
import useSignupRouter from "./routes/signUp.js";
import useLoginRouter from './routes/login.js';
import useUserRouter from './routes/user.js';
import useblogRouter from './routes/blogs.js';
import useLogoutRouter from './routes/logout.js';
import {authMiddleware} from './middleware/authMiddleware.js';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import session from "express-session";
import multer from "multer";
import methodOverride from 'method-override';
const app = e();

// ---------------------------------
// Sesssion
app.use(session({secret : 'secretKey'}))

// To make session accessible globally in EJS
app.use((req, res, next)=>{
    res.locals.keyNameSession = req.session;
    next();
})

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
    
// Set EJS as view Engine 
app.set('view engine', 'ejs');
// To Serve Static Files
// It allows your server to directly serve frontend assets like HTML, CSS, JavaScript, images, and fonts without defining separate routes.
app.use(e.static('public'));
app.use("/uploads", e.static("uploads"));
app.use("/blogCover", e.static("blogCover"));

// Role of body-parser in Express
// body-parser is a middleware in Express.js that extracts the data sent in HTTP requests (like form submissions) and makes it available in req.body
app.use(bodyParser.json());  // Add this
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// ---------------------------------

app.get('/',authMiddleware, (req, res)=>{
    res.render('index');
})

// Routers
app.use('/signup', useSignupRouter);
app.use('/login', useLoginRouter);
app.use('/user', authMiddleware, useUserRouter);
app.use('/blog', authMiddleware, useblogRouter);
app.use('/logout', useLogoutRouter)


// Listen port
app.listen(PORT, ()=>{
    console.log(`Ur server is running on http://localhost:${PORT}`)
})