var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the RoomBooking schema
const meetingRoomSchema = new Schema({
    name: { type: String, required: true },
    roomOrder: { type: Number, required: true },
    location: { type: String, default: null }, // default value of null
    capacity: { type: Number, default: null } // default value of null
});

module.exports = mongoose.model('meetingrooms',  meetingRoomSchema);