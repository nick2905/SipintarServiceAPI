import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CanteenRoomSchema = new Schema({
    nameRoom: {
        type: String,
        required: true
    },
    maksPeople: {
        type: Number,
        required: true
    },
    imgCanteenRoom: {
        type: String,
        required: true
    }
});