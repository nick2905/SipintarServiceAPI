import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const SeatBookingSchema = new Schema({
    idRoomCanteen: {
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true
    },
    dateBooking: {
        type: Date,
        required: true
    },
    sessionBooking: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});