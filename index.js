import express from "express";
import cors from "cors";
import "dotenv/config";
import photoRoutes from "./routes/photos.js";
import tagRoutes from "./routes/tags.js";

const PORT = process.env.PORT || 8082;

const app = express();
app.use(express.json());

app.use(express.static("public"));

app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use("/photos", photoRoutes);
app.use("/tags", tagRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
