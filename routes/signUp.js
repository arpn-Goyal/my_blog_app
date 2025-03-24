import e from "express";
const router = e.Router();
import {handleSignUp} from '../controller/signUp.js';


router.get('/', (req, res)=>{
    res.render('sign-up', { userFilledData: {}, errorMsg: "", errorField: "" });
})

router.post('/submit', handleSignUp)
export default router;