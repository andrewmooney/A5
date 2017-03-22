import mongoose from 'mongoose';
let Schema = mongoose.Schema;

const ResourceSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    type: { type: String, required: true},
    size: { type: Number, required: true},
    length: { type: Number, required: true},
    mediastorId: { type: String, required: true},
    mediastorName: { type: String, required: true},
    mediastorLocation: { type: String, required: true },
    poster: { type: String, required: false },
    releaseForm: { 
        mediastorId: String,
        mediastorName: String,
    }
});

module.exports = mongoose.model('resource', ResourceSchema);