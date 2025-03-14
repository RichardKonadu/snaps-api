import { randomUUID } from "crypto";
import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/", (req, res) => {
  const photosJson = fs.readFileSync("./data/photos.json");
  const parsedPhotos = JSON.parse(photosJson);
  res.json(parsedPhotos);
});

// get comments

router.get("/:id", (req, res) => {
  const photosJson = JSON.parse(fs.readFileSync("./data/photos.json"));
  const selectedPhoto = photosJson.find(
    (photosJson) => photosJson.id === req.params.id
  );
  res.status(200).json(selectedPhoto);
  console.log(selectedPhoto);
});

router.get("/:id/comments", (req, res) => {
  // step 1 read the file
  const photosJson = JSON.parse(fs.readFileSync("./data/photos.json"));
  // step 2 find the selected photo
  const selectedPhoto = photosJson.find((photo) => photo.id === req.params.id);
  res.status(200).json(selectedPhoto.comments);
  // step 3 return its comments
});

// post comments

router.post("/:id/comments", (req, res) => {
  // recieve new comment
  const { name, comment } = req.body;

  const newComment = {
    id: randomUUID(),
    name: name,
    comment: comment,
    timestamp: Date.now(),
  };

  // get the exisiting photo and comments to add the new comment

  const photosJson = JSON.parse(fs.readFileSync("./data/photos.json"));
  const selectedPhoto = photosJson.find((photo) => photo.id === req.params.id);
  console.log(req.params.id);
  const selectedPhotoComments = selectedPhoto.comments;
  console.log(selectedPhotoComments);

  selectedPhotoComments.push(newComment);

  // convert the updated comments to an array and write to the file
  const updatedPhotosJson = JSON.stringify(photosJson);
  fs.writeFileSync("./data/photos.json", updatedPhotosJson);

  // send back a 201 (comment created) and send a JSON response with the new comment object

  res.status(201).json(newComment);
});
export default router;
