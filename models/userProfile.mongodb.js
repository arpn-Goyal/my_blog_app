import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type: String,
        require: true,
        unique: true,
    },
    fullname: {
        type: String,
        require: true,
    },
    mobile:{
        type: String, default: "Not Provided"
    },
    pronouns:{
        type: String,
        require: true,
    },
    bio:{
        type: String,
        require: true,
    },
    createdAt: { type: Date, default: Date.now },  // Automatically sets current date
    facebook:{
        type: String,
        default:'#',
    },
    twitter:{
        type: String,
        default:'#',
    },
    linkedin:{
        type: String,
        default:'#',
    },
    instagram:{
        type: String,
        default:'#',
    },
    profile:{
        type: String,

    },
    cover:{
        type: String,
    }
}, {timestamps: true})

const userProfileModal = mongoose.model('user', userSchema);

export default userProfileModal;