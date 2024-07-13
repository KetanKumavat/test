import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import formRoutes from "./routes/formRoutes.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/api", formRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });