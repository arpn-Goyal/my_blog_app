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
    },
});

const upload = multer({ storage });

// -----------------
router.get('/', (req, res) => {
    res.render('userProfile');
})

router.get('/editUser', async (req, res) => {
    const loginEmail = req.session.loginEmail;
    const user = await userProfileModal.findOne({email: loginEmail})
    console.log(user)
    if(!user)
    res.render('editUserProfile', { loginEmail,  user: req.session.user });

    else
    res.render('editUserProfile', {user})
})

router.get('/changePassword', (req, res) => {
    res.render('userChangePassword');
})

router.post('/saveProfile', upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 1 }
]), handleUserProfile)


export default router;