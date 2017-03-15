import multer from 'multer';
import request from 'request';
import fs from 'fs';

const uploads = multer({ dest: 'uploads/temp/' });

module.exports = (app) => {
    app.post('/upload', uploads.fields([{ name: 'videoFile', maxCount: 1 }, { name: 'permissionsFile', maxCount: 1}]), (req, res) => {
        console.log('Video File');
        console.log(req.files.videoFile);
        //console.log('Form Body');
        //console.log(req.body);
        var uri = 'http://localhost:8080/';
        let formData = [
            req.body,
            req.files.videoFile
        ];
        request({ uri: uri, method: 'POST', json: formData }, (err, htmlRes, body) => {
            if (err) throw err;
            //console.log(htmlRes);
        });

        return res.status(200).json({ "message": "File recieved"});
    });
};