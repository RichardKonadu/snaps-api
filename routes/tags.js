import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/", (req, res) => {
  const tagsJson = fs.readFileSync("./data/tags.json");
  const parsedTags = JSON.parse(tagsJson);
  res.json(parsedTags);
  console.log(parsedTags);
});

export default router;
