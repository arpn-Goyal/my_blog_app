import signUp from "../models/signUp.mongodb.js";

export const handleSignUp = async (req, res)=>{
    try {
        const {signupEmail, signupName, signupPassword, signupContact} = req.body;
        const response = await signUp.create({signupEmail, signupName, signupPassword, signupContact});

        if(!response){
            res.status(400).json({errMsg: " User dosn't created "})
        }
        res.redirect('/login');
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({errMsg: " Internal Server Error "})
    }
}