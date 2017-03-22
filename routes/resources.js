import multer from 'multer';
import request from 'request';
import path from 'path';
import fs from 'fs';
import Resource from '../models/resource';

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
    app.get('/resources', (req, res) => {
        Resource.find((err, resources) => {
            if (err) return res.status(500).json({"message": err});
            res.status(200).json(resources);
        });
    });
    
    app.get('/resources/:id', (req, res) => {
        Resource.findById( req.params.id , (err, resources) => {
            if (err) return res.status(500).json({"message": err});
            res.status(200).json(resources);
        });
    });

    app.get('/resources/type/:type', (req, res) => {
        Resource.find({type: req.params.type}, (err, resources) => {
            if (err) return res.status(500).json({"message": err});
            res.status(200).json(resources);
        });
    });

    app.delete('/resources/:id', (req, res) => {
        Resource.findByIdAndRemove(req.params.id, (err) => {
            if (err) return res.status(500).json(err);
            res.status(200).json({"message": "Resource removed successfully"});
        });
    });

/**
 * This needs to be moved to a seperate controller...
 */
    app.post('/upload', uploads.single('file'), (req, res) => {
        console.log(req.file);
        //console.log('Form Body');
        console.log(req.body);

        const cdate = req.body.production_date ? new Date(req.body.production_date).toString() : new Date().toString();

        const formData = {
            name: req.file.originalname,
            createdAt: cdate, 
            description: req.body.resource_description,
            file: fs.createReadStream(req.file.path)
        };

        console.log(formData);

        const uri = 'http://localhost:8080/';
        request({ uri: uri, method: 'POST', formData: formData }, (err, htmlRes, body) => {
            console.log('Post made')
            if (err) throw err;
            body = JSON.parse(body);
            const resObj = {
                name: req.file.originalname,
                description: req.body.resource_description,
                type: body.file_type,
                size: req.file.size,
                length: body.mediastor_dur,
                mediastorId: body.mediastor_id,
                mediastorName: body.mediastor_name,
                mediastorLocation: `${app.settings.manta.server}${app.settings.manta.path}${body.file_type}s/`,
                poster: req.body.video_poster,
                releaseForm: {
                    mediastorId: req.body.releaseformid,
                    mediastorName: req.body.releaseformname
                }
            }

            const resource = new Resource(resObj);
            resource.save((err, result) => {
                if (err) throw err; //return res.status(500).json({ "message": err });
                return res.status(200).json({ "message": result });
            });
        });
    });
};