const Song = require("../model/Song");
const User = require("../model/User");

const SongController = {
    getAllSongs: async (req, res) => {
        const songs = await Song.find().populate("user_id");
        res.json(songs);
    },
    addSong: async (req, res) =>{

        let user = null;
        try {
            user = await User.findById(req.body.user_id);
        } catch (error) {
            res.status(400).json({message: "User Not Found !"});
        }

        const newSong = new Song({
            title: req.body.title,
            user_id: req.body.user_id,
        });
        try {
            const song = await newSong.save();
            await User.findByIdAndUpdate(req.body.user_id, {songs: [...user.songs, song.id]});
            res.json(song);
        } catch (error) {
            res.json(error);
        }
    },
}
module.exports = SongController;