import process from "process"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"

import getenv from "./src/helpers/getenv.js"

const app = express();

const PORT = process.env.PORT;
const MONGO_URI = getenv("MONGO_URI");

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
    res.send('Succes!');
});

// app.use('/items, ')

app.listen(PORT, () => console.info(`Server running on ${PORT}`));