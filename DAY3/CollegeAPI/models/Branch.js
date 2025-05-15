const mongoose = require('mongoose');

const branchSchema = {
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}

const Branch = new mongoose.model("Branch", branchSchema);
module.exports = Branch;