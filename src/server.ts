import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import fileUpload from 'express-fileupload';

import 'express-async-errors';

import apiRoutes from './routes/main.ts';
import { errorHandler } from './middleware/errorHandler.ts';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname + '/public')));

app.use(fileUpload());////////////////////////////////////////////////////////

const port = process.env.PORT || 3001;

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.4x2kvyc.mongodb.net/`; 

mongoose.connect(MONGO_URL)
.then(() => console.log('connected to moongose'))
.catch(err => console.log(err));


app.use("/api", apiRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`app is listening to port ${port}`)
});
