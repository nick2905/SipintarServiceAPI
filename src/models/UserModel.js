import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    nameUser: {
        type: String,
        required: true,
    },
    ktpId: {
        type: String,
        required: true,
    },
    telpNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roleId: {
        type: Number,
        required: true,
    }
});