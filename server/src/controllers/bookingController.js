const { collectionBookings } = require("../config/db");

const createBooking = async (req, res) => {
    try {
        const booking = {
            ...req.body,
            bookingStatus: "Confirmed",
            createdAt: new Date()
        };

        const result = await collectionBookings.insertOne(booking);

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            bookingId: result.insertedId
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Failed to create booking"
        });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await collectionBookings
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Failed to fetch bookings"
        });
    }
};

const { ObjectId } = require("mongodb");

const getBookingById = async (req, res) => {

    try {

        const booking = await collectionBookings.findOne({
            _id: new ObjectId(req.params.id)
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.json({
            success: true,
            data: booking
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

const deleteBooking = async (req, res) => {

    try {

        const result = await collectionBookings.deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (!result.deletedCount) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.json({
            success: true,
            message: "Booking deleted"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    deleteBooking
};