var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the RoomBooking schema
const RoomBookingSchema = new Schema({
    date: { type: Date, required: true },
    meetingRoom: { type: String, required: true },
    purpose: { type: String, required: true },

    timeslots: {
        
    },
    
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

module.exports = mongoose.model('bookings',  RoomBookingSchema);