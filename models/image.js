const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const ImageSchema = new Schema({
        mediastorID: { type: String, required: true },
        mediastorName: { type: String, required: false },
        fileLocation: ({ type: String, required: false })
});

module.exports = mongoose.model('image', ImageSchema);