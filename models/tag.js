const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const TagSchema = new Schema({
        name: { type: String, required: true },
        members: [String]
});

module.exports = mongoose.model('tag', TagSchema);