export const authMiddleware = (req, res, next)=>{
    // console.log(req.session);
    if(!req.session.loginEmail){
        return res.redirect('/login');
    }
    next();
}