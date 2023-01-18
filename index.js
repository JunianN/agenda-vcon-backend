import process from "process"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"

import getenv from "./src/helpers/getenv.js"

import agendaRouter from './src/routes/agendaRoute.js';

const app = express();

const PORT = process.env.PORT;
const MONGO_URI = getenv("MONGO_URI");

mongoose.set("strictQuery", true);
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error(`Can't connect to MongoDB`);
        console.error(err);
        process.exit(1);
    });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Connection Success!');
});

app.use('/agenda', agendaRouter);

app.listen(PORT, () => console.info(`Server running on ${PORT}`));