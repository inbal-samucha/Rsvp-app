import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

import apiRoutes from './routes/main.ts';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname + '/public')));

const port = process.env.PORT || 3001;

const MONGO_URL = 'mongodb+srv://inbalsamucha:dudi1234321@cluster0.4x2kvyc.mongodb.net/'; //TODO: move this url to .env
// mongoose.Promise = Promise;
// mongoose.connect(MONGO_URL)
// .then(() => {console.log('connected to mongoose')})
// .catch(error => console.log(error));
mongoose.connect(MONGO_URL)
.then(() => console.log('connected to moongose'))
.catch(err => console.log(err));


app.use("/api", apiRoutes);

app.listen(port, () => {
    console.log(`app is listening to port ${port}`)
});
