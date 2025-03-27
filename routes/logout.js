import e from "express";

const router = e.Router();

router.get('/', (req, res)=>{
    req.session.destroy((err)=>{
        if(err){
         console.log(`Session getting err ${err}`)
        }
     })
     res.redirect('/login');
})

export default router;