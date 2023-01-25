import process from "process";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";


import getenv from "./src/helpers/getenv.js";
import requestLogger from "./src/middlewares/requestLogger.js";
import errorHandler from "./src/middlewares/errorHandler.js";

import agendaRouter from './src/routes/agendaRoute.js';
import authRouter from './src/routes/authRoute.js';

const app = express();

const PORT = process.env.PORT;
const MONGO_URI = getenv("MONGODB_URI");

mongoose.set("strictQuery", true);
mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error(`Can't connect to MongoDB`);
        console.error(err);
        process.exit(1);
    });

mongoose.connection.once('open', () => {
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(express.static('public'));

    app.use(requestLogger);

    app.get('/', (req, res) => {
        res.send('Connection Success!');
    });

    app.use('/agenda', agendaRouter);
    app.use('/auth', authRouter);

    app.use(errorHandler);

    app.listen(PORT, () => console.info(`Server running on ${PORT}`));
});
