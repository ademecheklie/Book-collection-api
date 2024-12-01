import express from "express";
import bodyParser from "body-parser";
import connectToDB from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";
import dotenv from "dotenv";
import path from "path";

const app = express();
dotenv.config();
connectToDB();

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'));
});
app.use("/books", bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
