import mongoose from "mongoose";

const signUpSchema = mongoose.Schema({
    signupEmail: {
        type: String,
        require: true,
        unique: true,
    },
    signupName: {
        type: String,
        require: true,
    },
    signupPassword:{
        type: String,
        require: true,
    },
    signupContact:{
        type: String, default: "Not Provided"
    },
    createdAt: { type: Date, default: Date.now }  // Automatically sets current date
}, { timestamps: true })

const signUp = mongoose.model('signUp', signUpSchema);

export default signUp;
