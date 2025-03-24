
import signUp from "../models/signUp.mongodb.js";
import bcrypt from 'bcrypt';

export const handleLogin = async (req, res) => {
    // console.log(req.query);
    const { loginEmail, loginPassword } = req.query;
    try {
        // Check db response 
        const userInfo = await signUp.findOne({ signupEmail: loginEmail }).select('+signupPassword');
        if (!userInfo) {
            return res.render('log-in', {
                errorField: 'email',
                errorMsg: "Email doesn't exist!",
                userData: { loginEmail }
            })
        }

        // Compare hashed password
        const passwordMatch = await bcrypt.compare(loginPassword, userInfo.signupPassword);
        if (!passwordMatch) {
            return res.render('log-in', {
                errorField: 'password',
                errorMsg: 'Incorrect password!',
                userData: { loginEmail, password: '' }
            })
        }
        req.session.loginEmail = loginEmail;

        //  login access
        res.redirect('/user/editUser');

    } catch (error) {
        console.error("Login error:", error);
        // Set a custom error header (visible in network response headers)
        res.setHeader("X-Error-Message-Login", "Internal Server Error");
        res.status(500).send("Internal Server Error");
    }

}