import signUp from "../models/signUp.mongodb.js";
import bcrypt from 'bcrypt';

export const handleSignUp = async (req, res) => {
  try {
    const { signupEmail, signupName, signupPassword, signupContact } = req.body;

    // 🔹 Generate salt & hash the password
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(signupPassword, saltRounds);

    const response = await signUp.create({
      signupEmail,
      signupName,
      signupPassword : hashPassword, // Storing hashed password
      signupContact,
    });

    if (!response) {
      res.status(400).json({ errMsg: " User dosn't created " });
    }

    res.redirect("/login");
  } catch (error) {
    if (error.code === 11000) {
      const userFilledData = req.body;
      return res.render("sign-up", {
        userFilledData,
        errorMsg: "Email already Exists",
        errorField: "email",
      });
    }
    console.error("Error during signup:", error);
    res.setHeader("X-Error-Message-SignUp", "Internal Server Error");
    res.status(500).end();
  }
};
