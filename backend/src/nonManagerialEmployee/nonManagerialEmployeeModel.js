var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nonManagerialEmployeeSchema = new Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    isVerified: { type: Boolean, default: false }

});

module.exports = mongoose.model('nonManagerialEmployee', nonManagerialEmployeeSchema);