const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
        name: { type: String, required: true },
        videos: [String],
        resources: [String]
});

module.exports = mongoose.model('playlist', PlaylistSchema);