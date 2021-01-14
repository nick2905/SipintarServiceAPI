import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CanteenSeatBooking = new Schema({
    idRoomCanteen: {
        type: String,
        required: true
    },
    dateBooking: {
        type: Date,
    },
    countUserBooking: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: [{
        idUser: {
            type: String
        }
    }]
});