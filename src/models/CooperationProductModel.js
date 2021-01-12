import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CooperationProductSchema = new Schema({
    nameProduct: {
        type: String,
        required: true
    },
    priceProduct: {
        type: Number,
        required: true
    },
    imgProduct: {
        type: String,
        required: true
    },
    descProduct: {
        type: String,
        required: true
    }
});