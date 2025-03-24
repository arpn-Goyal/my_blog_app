import e from "express";

const router = e.Router();

router.get('/editUser', (req, res)=>{
    const loginEmail = req.session.loginEmail;
    
    res.render('editUserProfile', {loginEmail});
})

router.get('/', (req, res)=>{
    res.render('userProfile');
})


export default router;