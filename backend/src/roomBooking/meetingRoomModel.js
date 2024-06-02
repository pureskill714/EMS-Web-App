var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the RoomBooking schema
const meetingRoomSchema = new Schema({
    name: { type: String, required: true },
    roomOrder: { type: Number, required: true },
});

module.exports = mongoose.model('meetingrooms',  meetingRoomSchema);