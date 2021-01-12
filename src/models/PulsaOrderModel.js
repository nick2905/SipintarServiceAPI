import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const PulsaOrderSchema = new Schema({
    idUser: {
        type: String,
        required: true
    },
    idPulsa: {
        type: String,
        required: true
    },
    emailUser: {
        type: String,
        required: true
    },
    numberPhone: {
        type: String,
        required: true
    },
    sumPayment: {
        type: Number,
        required: true
    },
    isFinished: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});