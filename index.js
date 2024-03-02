import express from "express";
import ejs from "ejs";
import dotenv from "dotenv";
dotenv.config();
import AuthRouter from "./routes/auth.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import cookie from "cookie-parser";
import connectDB from "./config/database.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookie());
console.log(path.join(__dirname, "public"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  // const cookies = getcookie(req);
  // console.log(cookies);
  res.redirect("login");
});

app.use(AuthRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
  connectDB();
});
