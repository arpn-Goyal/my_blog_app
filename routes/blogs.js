import e from "express";

const router = e.Router();

router.get('/', (req, res)=>{
    res.render('blogs');
})

router.get('/add', (req, res)=>{
    res.render('writeBlog');
})

export default router;