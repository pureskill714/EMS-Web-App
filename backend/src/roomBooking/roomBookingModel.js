var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the RoomBooking schema
const RoomBookingSchema = new Schema({
    date: { type: Date, required: true },
    meetingRoom: { type: String, required: true },
    purpose: { type: String, required: true },

    timeslots: {
        '9:00 am': { type: Boolean, default: false },
        '9:30 am': { type: Boolean, default: false },
        '10:00 am': { type: Boolean, default: false },
        '10:30 am': { type: Boolean, default: false },
        '11:00 am': { type: Boolean, default: false },
        '11:30 am': { type: Boolean, default: false },
        '12:00 pm': { type: Boolean, default: false },
        '12:30 pm': { type: Boolean, default: false },
        '1:00 pm': { type: Boolean, default: false },
        '1:30 pm': { type: Boolean, default: false },
        '2:00 pm': { type: Boolean, default: false },
        '2:30 pm': { type: Boolean, default: false },
        '3:00 pm': { type: Boolean, default: false },
        '3:30 pm': { type: Boolean, default: false },
        '4:00 pm': { type: Boolean, default: false },
        '4:30 pm': { type: Boolean, default: false },
        '5:00 pm': { type: Boolean, default: false },
        '5:30 pm': { type: Boolean, default: false },
        '6:00 pm': { type: Boolean, default: false }
    },
    
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

module.exports = mongoose.model('bookings',  RoomBookingSchema);