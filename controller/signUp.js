import signUp from "../models/signUp.mongodb.js";

export const handleSignUp = async (req, res) => {
  try {
    const { signupEmail, signupName, signupPassword, signupContact } = req.body;
    const response = await signUp.create({
      signupEmail,
      signupName,
      signupPassword,
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
    res.setHeader("X-Error-Message", "Internal Server Error");
    res.status(500).end();
  }
};
