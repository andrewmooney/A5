const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const CategorySchema = new Schema({
        name: { type: String, required: true},
        description: { type: String, required: false},
        members: [String]
});

module.exports = mongoose.model('category', CategorySchema);