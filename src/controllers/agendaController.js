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
    try {
        const agenda = await Agenda.find({});
        res.json(successResponseBuilder({agenda: agenda}));
    } catch (err) {
        next(err);
    }
};

export const deleteById = async (req, res, next) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);

        const agenda = await Agenda.findOneAndDelete({_id: id});
        if (!agenda) throw httpNotFound();

        res.json(successResponseBuilder({deletedAgendaId: id}))
    } catch (err) {
        next(err);
    }
};

export const updateById = async (req, res, next) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const agenda = await Agenda.findOneAndUpdate({_id: id}, req.body);
        if (!agenda) throw httpNotFound();

        res.json(successResponseBuilder({agenda: agenda}));
    } catch (err) {
        next(err);
    }
};

export const findById = async (req, res, next) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const agenda = await Agenda.findById({_id: id}).exec();
        if (!agenda) throw httpNotFound();
        res.json(successResponseBuilder({agenda:agenda}));
    } catch (err) {
        next(err);
    }
};