import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CanteenProductSchema = new Schema({
    nameProduct: {
        type: String,
        required: true
    },
    typeProduct: {
        type: String,
        required: true
    },
    imgProduct: {
        type: String,
        required: true
    },
    priceProduct: {
        type: Number,
        required: true
    }
});