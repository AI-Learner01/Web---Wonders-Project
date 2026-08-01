const { collectionBookings } = require("../config/db");

const transporter =require("../config/mail");


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

const sendBookingEmail = async (req, res) => {
    try {
        const { email, bookingDetails } = req.body;

        if (!email || !bookingDetails) {
            return res.status(400).json({ success: false, message: "Missing email or booking details" });
        }

        const mailOptions = {
            from: `"AuraAvenue Bookings" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Booking Confirmed: ${bookingDetails.packageTitle}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
                    <div style="background-color: #10b981; padding: 24px; text-align: center; color: #ffffff;">
                        <h2 style="margin: 0; font-size: 24px; font-weight: 600;">Booking Confirmed Successfully!</h2>
                        <p style="margin: 4px 0 0; font-size: 14px; opacity: 0.9;">Ready for your next adventure?</p>
                    </div>
                    <div style="padding: 30px;">
                        <p style="font-size: 16px; color: #334155; margin-top: 0;">Hello <strong> ${bookingDetails.travellerName},</p>
                        <p style="font-size: 15px; color: #475569; line-height: 1.6;">
                            Your booking details have been successfully processed. Please keep this itinerary summary for your records:
                        </p>
                        
                        <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px; margin: 24px 0;">
                            <p style="margin: 0 0 12px 0; font-size: 15px; color: #0f172a;"><strong>Booking ID:</strong> ${bookingDetails.bookingId}</p>
                            <p style="margin: 0 0 12px 0; font-size: 15px; color: #0f172a;"><strong>Package:</strong> ${bookingDetails.packageTitle}</p>
                            <p style="margin: 0 0 12px 0; font-size: 15px; color: #0f172a;"><strong>Travel Date:</strong> ${bookingDetails.travelDate}</p>
                            <p style="margin: 0 0 12px 0; font-size: 15px; color: #0f172a;"><strong>Travellers:</strong> ${bookingDetails.travellers} Person(s)</p>
                            <p style="margin: 0 0 12px 0; font-size: 15px; color: #0f172a;"><strong>Room Type:</strong> ${bookingDetails.roomType}</p>
                            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 16px 0;" />
                            <p style="margin: 0; font-size: 18px; color: #10b981; font-weight: bold;">Total Amount: ₹${bookingDetails.totalAmount.toLocaleString('en-IN')}</p>
                        </div>

                        <p style="font-size: 14px; color: #64748b; text-align: center; margin-top: 30px;">
                            Thank you for choosing AuraAvenue! We will redirect you to the payment gateway shortly.
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        
        return res.status(200).json({ success: true, message: "Booking email sent successfully" });
    } catch (err) {
        console.error("Booking Email Error:", err);
        return res.status(500).json({ success: false, message: "Failed to send booking email" });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    deleteBooking,
    sendBookingEmail
};