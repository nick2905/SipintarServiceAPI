import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const DelRoomBookingSchema = new Schema({
    idDelRoom: {
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true
    },
    dateBooking: {
        type: Date,
        //Testing date now
        default: Date.now
        //required: true
    },
    reasonBooking: {
        type: String,
        required: true
    },
    isConfirm: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});