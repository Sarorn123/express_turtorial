const mongoose = require("mongoose");

const SongSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },

    created_at: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

module.exports = mongoose.model("songs", SongSchema);