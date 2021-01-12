import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CooperationOrderSchema = new Schema({
    idUser: {
        type: String,
        required: true
    },
    productCooperation: [{
        idProduct: {
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