import express from "express";
import bodyParser from "body-parser";
import connectToDB from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import swaggerDocs from './config/swagger.js';
import { verifyToken } from "./middleware/middleware.js";

const app = express();
dotenv.config();
connectToDB();

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'));
});
app.use("/auth", authRoutes);
app.use("/books",verifyToken, bookRoutes);

swaggerDocs(app);
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        url: '/swagger.json', // Ensure it fetches the correct JSON
      },
    })
  );
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
