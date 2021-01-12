import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CanteenOrderSchema = new Schema({
    idUser: {
        type: String,
        required: true
    },
    product: [{
        idProduct: {
            type: String,
            required: false
        },
        typeProduct: {
            type: String,
            required: false
        },
        priceProduct: {
            type: Number,
            required: false
        },
        qtyProduct: {
            type: Number,
            required: false
        }
    }],
    sumPayment: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isFinished: {
        type: Boolean,
        default: false
    },
    isCancelUser: {
        type: Boolean,
        default: false
    },
    isCancelAdmin: {
        type: Boolean,
        default: false
    }
});