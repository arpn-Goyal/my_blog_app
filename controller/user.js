import userProfileModal from '../models/userProfile.mongodb.js';


export const handleUserProfile = async (req, res) => {
    // console.log(`${req.files.profile[0].filename}`)
    // console.log(`${req.files.cover[0].filename}`)

    try {
        // console.log(req.body)
        const { fullname, mobile, pronouns, bio, facebook, instagram, twitter, linkedin } = req.body;
        const email = req.session.loginEmail;
        const existingUser = await userProfileModal.findOne({ email });

        const profile = req.files?.profile
            ? req.files.profile[0].path.replace(/\\/g, "/")
            : existingUser.profile || null;

        const cover = req.files?.cover
            ? req.files.cover[0].path.replace(/\\/g, "/")
            : existingUser.cover || null;

        const response = await userProfileModal.updateOne({ email }, { fullname, mobile, pronouns, bio, facebook, instagram, twitter, linkedin, profile, cover }, { upsert: true });

        if (!response) {
            res.status(400).json({ errMsg: "User doesn't saved" })
        }
        return res.redirect('/user');
    } catch (error) {
        console.log(`While user Profile being saved: ${error}`);
        res.status(500).json({ errMsg: "Server Internal Error" })
    }
}