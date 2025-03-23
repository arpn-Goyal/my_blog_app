import e from "express";
const router = e.Router();
import {handleSignUp} from '../controller/signUp.js';


router.get('/', (req, res)=>{
    res.render('sign-up');
})

router.post('/submit', handleSignUp)
export default router;