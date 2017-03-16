import multer from 'multer';
import request from 'request';
import path from 'path';
import fs from 'fs';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const uploads = multer({ storage: storage });

module.exports = (app) => {
    app.post('/upload', uploads.fields([{ name: 'videoFile', maxCount: 1 }, { name: 'permissionsFile', maxCount: 1}]), (req, res) => {
        console.log('Video File');
        console.log(req.files['videoFile'][0]);
        //console.log('Form Body');
        console.log(req.body);
        req.file = req.files.videoFile[0];
        const cdate = new Date(req.body.production_date).toString();
        const formData = {
            name: req.file.originalname,
            createdAt: cdate, 
            description: req.body.resource_description,
            file: fs.createReadStream(req.files['videoFile'][0].path)
        };
        const uri = 'http://localhost:8080/';
        request({ uri: uri, method: 'POST', formData: formData }, (err, htmlRes, body) => {
            console.log('Post made')
            if (err) throw err;
            console.log(body);
            const resource = {
                name: req.file.originalname,
                description: req.body.resource_description,
                type: req.body.media_type,
                size: req.body.file_size_mb,
                length: req.body.video_audio_length,
                mediastorId: body.mediastor_id
            }
        });

        return res.status(200).json({ "message": "File recieved"});
    });
};