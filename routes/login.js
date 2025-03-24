import e from "express";
import { handleLogin } from "../controller/login.js";
const router = e.Router();

router.get('/', (req, res)=>{
    res.render('log-in', { userData: {}, errorMsg: "", errorField: "" });
})

router.get('/checkLogin', handleLogin);

export default router;