import path,{dirname} from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url))
//const path = require('path');
//const express = require("express");
//const bodyParser = require('body-parser');
//const newsRoutes = require('./routes/news.route');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use('/static',express.static(path.resolve(__dirname,'frontend','assets')));

app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname,"frontend","index.html"));
});
app.listen(3000,() => console.log("Server running in port 3000"))


