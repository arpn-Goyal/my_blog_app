import userProfileModal from '../models/userProfile.mongodb.js';


export const handleUserProfile = async (req, res)=>{
    console.log(`${req.files.profile[0].filename}`)
    console.log(`${req.files.cover[0].filename}`)

    try {
        console.log(req.body)
        const profile = '/uploads/' + req.files.profile[0].filename;
        const cover = '/uploads/' + req.files.cover[0].filename;
        const {fullname,email, mobile, pronouns, bio, facebook, instagram, twitter, linkedin} = req.body;
        const Response = await userProfileModal.updateOne({email},{fullname, mobile, pronouns, bio, facebook, instagram, twitter, linkedin, profile, cover }, {upsert: true});

        if(!Response){
            res.status(400).json({errMsg: "User doesn't saved"})
        }
        return res.redirect('/user');
    } catch (error) {
        console.log(`While user Profile being saved: ${error}`);
        res.status(500).json({errMsg: "Server Internal Error"})
    }
}