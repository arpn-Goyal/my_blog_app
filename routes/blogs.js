import e from "express";
import multer from "multer";
import { handleBlogCreation } from "../controller/blog.js";
import blogModel from "../models/blog.mongodb.js";
const router = e.Router();

const storage = multer.diskStorage({
    destination: 'blogCover/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
        // console.log(file.originalname)
    },
})

const upload = multer({storage});

router.get('/', async (req, res) => {
    const allblogs = await blogModel.find({}).sort({ createdAt: -1 });;
    res.render('blogs', {allblogs});
})

router.get('/myBlogs', async (req, res) => {
    const email = req.session.loginEmail;
    const allblogs = await blogModel.find({email}).sort({ createdAt: -1 });;
    res.render('blogs', {allblogs});
})

router.get('/add',(req, res) => {
    res.render('writeBlog');
})

router.post('/save', upload.fields([
   { name:'blogImage', maxCount: 1}
]), handleBlogCreation);

export default router;