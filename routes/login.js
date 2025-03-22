import e from "express";
const router = e.Router();

router.get('/', (req, res)=>{
    res.render('log-in');
})

export default router;