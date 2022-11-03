const Song = require("../model/Song");

const songAuth = async (req, res, next) => {

    const user_id = req.headers.user_id;
    const id = req.params.id;

    try {
        const song = await Song.findById(id);
        if(song.user_id == user_id){
            next();
        }else{
            res.status(401).json({message: "This is not your song"})
        }
    } catch (error) {
        res.json(error.message);
    }
}
module.exports = songAuth;