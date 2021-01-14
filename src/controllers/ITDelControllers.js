import mongoose from 'mongoose';
import { DelRoomSchema } from "../models/DelRoomModel";
import { DelRoomBookingSchema } from "../models/DelRoomBookingModel";

const DelRoom = mongoose.model('DelRoom', DelRoomSchema);
const DelRoomBooking = mongoose.model('DelRoomBooking', DelRoomBookingSchema);
// Admin IT Del Modul
export const addDelRoom = async (req, res) => {
    try {
        const newDelRoom = new DelRoom(req.body);
        await newDelRoom.save();
        return res.status(200).json({ message: 'Successfull add room' });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

export const removeDelRoom = async (req, res) => {
    try {
        // Using Parameter idDelRoom
        await DelRoom.findOneAndDelete(req.params.idDelRoom);
        return res.status(200).json({ message: 'Successfull delete room' });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

export const getAllDelRoom = async (req, res) => {
    try {
        const findAllDelRoom = await DelRoom.find();
        return res.status(200).json(findAllDelRoom);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}

// Room Booking Modul
export const acceptDelRoomBooking = async (req, res) => {
    try {
        //Using parameter idDelRoomBooking
        await DelRoomBooking.findById(req.params.idDelRoomBooking, {
            $set: {
                isConfirm: true
            }
        });
        return res.status(200).json({ message: 'Successfull Accept Request' });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}
export const getAllDelRoomBooking = async (req, res) => {
    try {
        const findAllDelRoomBooking = await DelRoomBooking.find();
        return res.status(200).json(findAllDelRoomBooking);
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Maaf ada kesalahan' });
    }
}