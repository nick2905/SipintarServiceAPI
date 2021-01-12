import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const DelRoomSchema = new Schema({
    nameRoom: {
        type: String,
        required: true
    },
    descRoom: {
        type: String,
        required: true
    },
    imgRoom: {
        type: String,
        required: true
    }
});