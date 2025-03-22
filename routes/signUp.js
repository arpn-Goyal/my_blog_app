import e from "express";
const router = e.Router();

router.get('/', (req, res)=>{
    res.render('sign-up');
})

export default router;