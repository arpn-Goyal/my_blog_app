import e from "express";
import multer from 'multer'
import { handleUserProfile } from '../controller/user.js';
import userProfileModal from '../models/userProfile.mongodb.js';

const router = e.Router();

// Storage setup (local "uploads" folder)
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
        console.log(file.originalname)
    },
});

const upload = multer({ storage });

// -----------------
router.get('/', async (req, res) => {
    try {
        const email = req.session.loginEmail;
        const userProfile = await userProfileModal.findOne({ email }) || {};
        if (!userProfile)
            res.status(400).json({ errMsg: 'Error while Sending Data on user profile' });

        res.render('userProfile', { userProfile });
    } catch (error) {
        console.log(error);
        res.status(500).json({ errMsg: 'Internal Server Error on Profile' });
    }
})

router.get('/editUser', async (req, res) => {
    try {
        const loginEmail = req.session.loginEmail;
        const user = await userProfileModal.findOne({ email: loginEmail })
        console.log(user)
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

router.post('/saveProfile', upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 1 }
]), handleUserProfile)


export default router;