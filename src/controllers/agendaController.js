import mongoose from "mongoose";
import {
    httpNotFound,
    httpBadRequest,
} from '../helpers/httpExceptionBuilder.js';
import { successResponseBuilder } from "../helpers/responseBuilder.js";
import Agenda from "../models/agendaModel.js";

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

export const findAll = async (req, res, next) => {
    
}