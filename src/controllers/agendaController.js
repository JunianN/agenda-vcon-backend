import mongoose from "mongoose";
import {
    httpNotFound,
    httpBadRequest,
} from '../helpers/httpExceptionBuilder';
import { successResponseBuilder } from "../helpers/responseBuilder";
import Agenda from "../models/agendaModel";

export const create = async (req, res, next) => {
    try {
        const agenda = new Agenda(req.body);
        const result = await agenda.save();
        res.status(201).json(successResponseBuilder({agenda: result}));
    } catch (err) {
        if (['CastError', 'ValidationError'].includes(err?.name)) {
            next(httpBadRequest(err.message));
        }
        next(err);
    }
};