const express = require("express");
const SongController = require("../controller/SongController");

const router = express.Router();

router.get("/" , SongController.getAllSongs);

router.post("/" , SongController.addSong);

module.exports = router;