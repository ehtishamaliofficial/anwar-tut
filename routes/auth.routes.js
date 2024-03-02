import { Router } from "express";
import { checkEmail, register } from "../controller/auth.controller.js";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/api/register", register);
router.post("/check-email", checkEmail);

export default router;
