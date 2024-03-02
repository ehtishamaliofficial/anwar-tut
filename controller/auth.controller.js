import User from "../models/User.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.render("regsiter", {
      error: "Fill All the Fields",
    });
  }

  try {
    const isExist = await User.findOne({ email: email });
    if (isExist) {
      res.render("register", {
        error: "Email Already Exists",
      });
    }
    const user = new User({
      name,
      email,
      password,
    });
    await user.save();
    res.redirect("/login");
  } catch (error) {
    res.render("register", {
      error: error.message,
    });
  }
};

export const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res.json({
        avaliable: false,
      });
    }
    res.json({
      avaliable: true,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};
