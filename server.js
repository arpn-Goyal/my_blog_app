import e from "express";
import useSignupRouter from "./routes/signUp.js";
import useLoginRouter from './routes/login.js';
import useUserRouter from './routes/user.js';
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import mongoose from "mongoose";

const app = e();

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
// Role of body-parser in Express
// body-parser is a middleware in Express.js that extracts the data sent in HTTP requests (like form submissions) and makes it available in req.body
app.use(bodyParser.urlencoded({ extended: true }));


// Routers
app.use('/signup', useSignupRouter);
app.use('/login', useLoginRouter);
app.use('/user', useUserRouter);

// ---------------------------------
app.get('/', (req, res)=>{
    res.render('writeBlog');
})

app.listen(PORT, ()=>{
    console.log(`Ur server is running on http://localhost:${PORT}`)
})