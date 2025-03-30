import blogModel from "../models/blog.mongodb.js";
import userProfileModal from "../models/userProfile.mongodb.js";
import slugify from "slugify";
import { nanoid } from "nanoid";

export const handleBlogCreation = async (req, res)=>{
    try {
        const email = req.session.loginEmail;
        const user = await userProfileModal.findOne({email});
        // console.log(user);
        const { blogTitle, blogCategory, blogDate, blogKeywords, blogDescription, blogContent } = req.body;
        const writerName = user.fullname;
        const profileImg = user.profile;
        // console.log(writerName, profileImg);
        const blogImage = req.files.blogImage[0].path.replace(/\\/g, "/");
        
        const blogSlug = slugify(blogTitle, { lower: true, strict: true, trim: true }) + "-" + nanoid(6);
        const response = await blogModel.create({ email, writerName, profileImg, blogTitle, blogImage, blogSlug, blogCategory, blogDate, blogKeywords, blogDescription, blogContent })
        if(!response){
            res.status(400).json({ errorMsg : "Blog doesn't Created" });
        }
       res.redirect('/blog')
    } catch (error) {
        console.error("Error in Blog Creation:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}