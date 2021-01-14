import mongoose from 'mongoose';
import { CanteenProductSchema } from "../models/CanteenProductModel";
import { CanteenRoomSchema } from "../models/CanteenRoomModel";
import { CanteenOrderSchema } from "../models/CanteenOrderModel";

const CanteenProduct = mongoose.model('CanteeenProduct', CanteenProductSchema);
const CanteenRoom = mongoose.model('CanteenRoom', CanteenRoomSchema);
const CanteenOrder = mongoose.model('CanteenOrder', CanteenOrderSchema);

// Admin Canteen Modul

//Canteen Product
export const addCanteenProduct = async (req, res) => {
    try {
        const newProduct = new CanteenProduct(req.body);
        await newProduct.save();
        return res.status(200).json({ message: 'Successfull add product' });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

export const removeCanteenProduct = async (req, res) => {
    try {
        // Using parameter idProduct
        await CanteenProduct.findOneAndDelete(req.params.idProduct);
        return res.status(200).json({ message: 'Successfull remove' });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

export const getAllProduct = async (req, res) => {
    try {
        const findAllProduct = await CanteenProduct.find();
        return res.status(200).json(findAllProduct);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

// Order modul
export const getAllProductCanteenOrder = async (req, res) => {
    try {
        const findAllProductOrder = await CanteenOrder.find();
        return res.status(200).json(findAllProductOrder);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

export const getAllProductOrderCanteenCancelSubmission = async (req, res) => {
    try {
        const findAllProductOrderCancelSubmission = await CanteenOrder.find({ isCancelUser: true });
        return res.status(200).json(findAllProductOrderCancelSubmission);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

export const getOneProductOrderById = async (req, res) => {
    try {
        // Using parameter idProductOrder
        const findOneProductOrder = await CanteenOrder.findById(req.params.idProductOrder);
        return res.status(200).json(findOneProductOrder);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

export const acceptCancelProductOrder = async (req, res) => {
    try {
        // Using parameter idProductOrder
        await CanteenOrder.findByIdAndUpdate(req.params.idProductOrder, {
            $set: {
                isCancelAdmin: true
            }
        });
        return res.status(200).json({ message: 'Successfull cancel' });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

export const finishProductOrder = async (req, res) => {
    try {
        // Using parameter idProductOrder
        await CanteenOrder.findByIdAndUpdate(req.params.idProductOrder, {
            $set: {
                isFinished: true
            }
        });
        return res.status(200).json({message:'Successfull Finish Order'});
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

// Canteen Room
export const addCanteenRoom = async (req, res) => {
    try {
        const newCanteenRoom = new CanteenRoom(req.body);
        await newCanteenRoom.save();
        return res.status(200).json({ message: 'Successfull add room' });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

export const removeCanteenRoom = async (req, res) => {
    try {
        // Using parameter idCanteenRoom
        await CanteenRoom.findOneAndDelete(req.params.idCanteenRoom);
        return res.status(200).json({ message: 'Successfull delete' });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

export const getAllRoom = async (req, res) => {
    try {
        const findAllRoom = await CanteenRoom.find();
        return res.status(200).json(findAllRoom);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}