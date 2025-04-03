import signUp from "../models/signUp.mongodb.js";
import bcrypt from 'bcrypt';
import userProfileModal from "../models/userProfile.mongodb.js";

export const handleLogin = async (req, res) => {
    // console.log(req.query);
    const { loginEmail, loginPassword } = req.query;
    try {
        // Check db response 
        const userInfo = await signUp.findOne({ signupEmail: loginEmail }).select('+signupPassword +signupContact +signupName');
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
        // Fetch additional user details from userProfileModal
        const userProfile = await userProfileModal.findOne({loginEmail}).select('+profile');

        // Pass if Profile Image is there else Default Image
        req.session.loginEmail = loginEmail;
        req.session.user = {
            email: loginEmail, 
            fullname: userInfo.signupName, 
            mobile: userInfo.signupContact,
            profileImg: userProfile?.profile || 'images/demoUser.png',
        };
        
        // res.locals.user = {email: loginEmail, fullname: userInfo.signupName, mobile: userInfo.signupContact};
        // console.log("User Data Sent to Frontend:", res.locals.user); // Debugging 

        //  login access
        res.redirect('/user/editUser');

    } catch (error) {
        console.error("Login error:", error);
        // Set a custom error header (visible in network response headers)
        res.setHeader("X-Error-Message-Login", "Internal Server Error");
        res.status(500).send("Internal Server Error");
    }
}