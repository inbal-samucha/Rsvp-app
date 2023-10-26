import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import apiRoutes from './routes/main.ts';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;

app.use("/api", apiRoutes);

const MONGO_URL = 'mongodb+srv://inbalsamucha:dudi1234321@cluster0.4x2kvyc.mongodb.net/';
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
.then(() => {console.log('connected to mongoose')})
.catch(error => console.log(error));


app.listen(port, () => {
    console.log(`app is listening to port ${port}`)
});
