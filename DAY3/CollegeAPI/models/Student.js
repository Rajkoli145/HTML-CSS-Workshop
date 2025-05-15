const mongoose = require('mongoose');

const studentSchema = {
    name: {
        type: String,
        required: true
    },
    rollNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        enum: ['CE', 'DS', 'AIML', 'IOT'],
        required: true
    }
}

const Student = new mongoose.model("Student", studentSchema);
module.exports = Student;