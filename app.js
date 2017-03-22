// Import modules
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from 'config';
import path from 'path';

const app = express();
// Configure Application
const serverConfig = config.get('App.server'),
      dbConfig = config.get('App.dbConfig');

app.set('manta', config.get('App.manta'));

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to database (MongoDB)
mongoose.Promise = global.Promise;
mongoose.connect(`${dbConfig.host}/${dbConfig.database}`, {});
const db = mongoose.connection;
db.on('error', (err) => {
    throw err;
});

// Routes
//require('./routes/index')(app);
require('./routes/resources')(app);
//require('./routes/images')(app);
//require('./routes/documents')(app);
require('./routes/playlists')(app);
//require('./routes/tags')(app);
//require('./routes/categories')(app);

require('./routes/convertcsv')(app);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'uploader.html'));
});

const server = app.listen(serverConfig.port);

module.exports = server;