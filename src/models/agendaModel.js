import mongoose from "mongoose";

const agendaSchema = new mongoose.Schema(
    {
        tanggal: {
            type: Date,
            required: true,
        },
        waktu: {
            type: String,
            required: true,
        },
        host: {
            type: String,
            required: true,
        },
        peserta: {
            type: [String],
            required: true,
        },
        topik: {
            type: String,
            required: true,
        },
        tempat: {
            type: String,
            required: true,
        },
        zoom: {
            type:Boolean,
            required: true,
        },
        keterangan: {
            type: String,
            required: false,
        },
        suratPinjam: {
            type: Boolean,
            required: true,
        },
    },
    {timestamps: true}
);

const Agenda = mongoose.model('Agenda', agendaSchema);

export default Agenda;