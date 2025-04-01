import e from "express";
import multer from 'multer'
import { handleUserProfile } from '../controller/user.js';
import userProfileModal from '../models/userProfile.mongodb.js';
import signUp from '../models/signUp.mongodb.js';
import blogModel from "../models/blog.mongodb.js";
import bcrypt from 'bcrypt';
const router = e.Router();

// Storage setup (local "uploads" folder)
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
        // console.log(file.originalname)
    },
});

const upload = multer({ storage });

// -----------------
router.get('/', async (req, res) => {
    try {
        const email = req.session.loginEmail;
        const allblogs = await blogModel.find({ email }).sort({ createdAt: -1 });

        const userProfile = await userProfileModal.findOne({ email }) || {};
        if (!userProfile)
            res.status(400).json({ errMsg: 'Error while Sending Data on user profile' });

        res.render('userProfile', { userProfile, allblogs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ errMsg: 'Internal Server Error on Profile' });
    }
})

router.get('/editUser', async (req, res) => {
    try {
        const loginEmail = req.session.loginEmail;
        const user = await userProfileModal.findOne({ email: loginEmail })
        // console.log(user)
        if (!user)
            res.render('editUserProfile', { loginEmail, user: req.session.user });

        else
            res.render('editUserProfile', { user })
    } catch (error) {
        console.log(error);
        res.status(500).json({ errMsg: 'Internal Server Error on Profile' });
    }
})

router.get('/changePassword', (req, res) => {
    res.render('userChangePassword');
})

router.put('/updatePassword', async (req, res) => {
    try {
        const loginEmail = req.session.loginEmail;
        const password = req.body.old_password;
        const user = await signUp.findOne({ signupEmail: loginEmail }).select('+signupPassword');
        // console.log(user);
        if (!user) {
            console.log(`User doesn't Found`);
            return res.render('log-in', {
                errorField: 'email',
                errorMsg: "Email doesn't exist!",
            })
        }

        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.signupPassword);
        if (!passwordMatch) {
            console.log(`Password doesn't match`);
            return res.render('userChangePassword', {
                errorField: 'password',
                errorMsg: "Password doesn't match"
            });
        }
        else {
            console.log(`Else`)
            // If the Passwords match, the user's password should be changed.
            const newPassword = req.body.new_password;
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(newPassword, saltRounds);
            const response = await signUp.findOneAndUpdate({ signupEmail: loginEmail }, { signupPassword: hashPassword });

            if (!response) {
                console.log(`Failed to update password`)
                return res.render('userChangePassword', {
                    errorField: 'update',
                    errorMsg: "Failed to update password"
                });
            }
            console.log(`Password updated successfully`)
            /// Success: Password updated
            return res.render('userChangePassword', {
                errorField: 'successUpdated',
                successMsg: "Password updated successfully"
            });
        }
    } catch (error) {
        console.log(`UpdatePassword: ${error}`)
        res.status(500).json({ errMsg: 'Internal Server Error' });
    }
})

router.post('/saveProfile', upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 1 }
]), handleUserProfile)


export default router;