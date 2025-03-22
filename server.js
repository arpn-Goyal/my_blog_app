import e from "express";
import useSignupRouter from "./routes/signUp.js";
import useLoginRouter from './routes/login.js';

const port = 5000;
const app = e();

// Set EJS as view Engine 
app.set('view engine', 'ejs');

// To Serve Static Files
// It allows your server to directly serve frontend assets like HTML, CSS, JavaScript, images, and fonts without defining separate routes.
app.use(e.static('public'));

// Routers
app.use('/signup', useSignupRouter);
app.use('/login', useLoginRouter);

// ---------------------------------
app.get('/', (req, res)=>{
    res.render('index');
})

app.listen(port, ()=>{
    console.log(`Ur server is running on http://localhost:${port}`)
})