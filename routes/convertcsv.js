import multer from 'multer';
import csvtojson from 'csvtojson';
import fs from 'fs';

const uploads = multer({ dest: 'uploads/temp/' });

module.exports = (app) => {
    app.post('/convert', uploads.single('file'), (req, res) => {
        let jsonArr = [];
        console.log(req.file);
        csvtojson()
        .fromFile(req.file.path)
        .on('json', (jsonObj) => {
            jsonArr.push(jsonObj);
        })
        .on('done', (err) => {
            if (err) return res.status(500).json({ "message": err });
            fs.unlink(req.file.path);
            return res.status(200).json(jsonArr);
        });
    });
};