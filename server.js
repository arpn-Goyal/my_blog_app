import e from "express";

const port = 5000;
const app = e();


app.get('/', (req, res)=>{
    res.send('this is Home Page');
})

app.listen(port, ()=>{
    console.log(`Ur server is running on http://localhost:${port}`)
})