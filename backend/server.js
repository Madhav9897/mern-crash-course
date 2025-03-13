import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/product.route.js";
import path from "path";

dotenv.config();
const app = express();
const portNumber = process.PORT || 3000;
const __dirname = path.resolve();
app.use(express.json()); //allows us to accept data in json
app.use("/api/products", router);

// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "frontend", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});
// }
app.listen(portNumber, () => {
  connectDB();
  console.log("started yus");
});
