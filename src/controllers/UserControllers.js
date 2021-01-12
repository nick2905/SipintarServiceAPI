import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import { UserSchema } from "../models/UserModel";
import { CanteenOrderSchema } from "../models/CanteenOrderModel";
import { CooperationOrderSchema } from "../models/CooperationOrderModel";
import { PulsaOrderSchema } from "../models/PulsaOrderModel";

const User = mongoose.model('User', UserSchema);
const CanteenOrder = mongoose.model('CanteenOrder', CanteenOrderSchema);
const CooperationOrder = mongoose.model('CooperationOrder', CooperationOrderSchema);
const PulsaOrder = mongoose.model('PulsaOrder', PulsaOrderSchema);

export const loginRequiredCostumers = (req, res, next) => {
    //console.log("User ->" + req.user.roleId);
    if (req.user.roleId === 2) {
        next();
    } else {
        return res.status(401).json({ message: "Unauthorization User" });
    }
};

export const loginRequiredAdmin = (req, res, next) => {
    //console.log("User ->" + req.user.roleId);
    if (req.user.roleId === 1) {
        next();
    } else {
        return res.status(401).json({ message: "Unauthorization User" });
    }
};

//Authentication
export const userRegister = async (req, res) => {
    try {
        const newUser = new User(req.body);
        var salt = crypto.randomBytes(16).toString('hex');
        var hash = crypto.createHmac("sha256", salt)
            .update(req.body.password)
            .digest('hex');

        newUser.password = salt + "$" + hash;
        const findUser = await User.findOne({
            email: req.body.email,
            roleId: req.body.roleId
        });
        if (findUser) {
            return res.status(400).json({ message: 'Can\'t make account. User already on system!' });
        } else if (!findUser) {
            try {
                await newUser.save();
                return res.status(200).json({ message: 'Account successfull created' });
            } catch (error) {
                return res.status(401).json({ message: 'Maaf ada kesalahan!' });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan!' });
    }
}

export const userLogin = async (req, res) => {
    try {
        const findUserAccount = await User.findOne({
            email: req.body.email,
            roleId: req.body.roleId
        });
        if (!findUserAccount) {
            return res.status(401).json({ message: 'Authentication failed. No user found!' });
        } else {
            var passwordField = findUserAccount.password.split('$');
            var salt = passwordField[0];
            var hash = crypto.createHmac('sha256', salt)
                .update(req.body.password)
                .digest('hex');

            if (!(hash == passwordField[1])) {
                return res.status(401).json({ message: 'Wrong Password!' });
            } else {
                // Return JWT
                return res.status(200).json({
                    token: jwt.sign({
                        email: findUserAccount.email,
                        roleId: findUserAccount.roleId,
                        _id: findUserAccount._id
                    }, "RESTFULLAPI")
                });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

// Canteen Product Order
export const getCanteentOrderCustomer = async (req, res) => {
    try {
        const findAllOrderCanteenCustomer = await CanteenOrder.find({
            idUser: req.body.idUser
        });
        return res.status(200).json(findAllOrderCanteenCustomer);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}
export const addCanteenProductOrder = async (req, res) => {
    try {
        const newCanteenProductOrder = new CanteenOrder(req.body);
        await newCanteenProductOrder.save();
        return res.status(200).json({ message: 'Successfull add order' });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

export const cancelCanteenProductOrder = async (req, res) => {
    try {
        await CanteenOrder.findByIdAndUpdate(req.body.idCanteenProductOrder, {
            $set: {
                isCancelUser: true
            }
        });
        return res.status(200).json({ message: 'Successfull cancel' });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

// Cooperation Product Order
export const getCooperationOrderCustomer = async (req, res) => {
    try {
        const findAllCooperationOrderCust = await CooperationOrder.find({
            idUser: req.body.idUser
        });
        return res.status(200).json(findAllCooperationOrderCust);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

export const addCooperationProductOrder = async (req, res) => {
    try {
        const newCooperationProductOrder = new CooperationOrder(req.body);
        await newCooperationProductOrder.save();
        return res.status(200).json({ message: 'Successfull add order' });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

export const cancelCooperationProductOrder = async (req, res) => {
    try {
        //Using parameter idCooperationOrder
        await CooperationOrder.findByIdAndUpdate(req.params.idCooperationOrder, {
            $set: {
                isCancelUser: true
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

// Pulsa Order
export const getCooperationPulsaOrder = async (req, res) => {
    try {
        const findAllCooperationPulsaOrder = await PulsaOrder({
            idUser: req.body.idUser
        });
        return res.status(200).json(findAllCooperationPulsaOrder);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}
export const addCooperationPulsaOrder = async (req, res) => {
    try {
        const newPulsaOrder = new PulsaOrder(req.body);
        await newPulsaOrder.save();
        return res.status(200).json({ message: 'Successfull add order' });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}