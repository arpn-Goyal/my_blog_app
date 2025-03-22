import e from "express";

const router = e.Router();

router.get('/editUser', (req, res)=>{
    res.render('editUserProfile');
})

router.get('/', (req, res)=>{
    res.render('userProfile');
})


export default router;