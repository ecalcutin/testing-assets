const http = require('http');
const express = require('express');
const cors = require('cors');

const UploadHandler = require('./handlers/upload');
const DataHandler = require('./handlers/data');

const app = express();
const server = http.createServer(app);
const { PORT = 4000 } = process.env;

app.use(cors());


app.post('/upload', UploadHandler);
app.get('/data', DataHandler)

server.listen(PORT, () => { })