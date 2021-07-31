const mongoose = require("mongoose");

// model properties
const schema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        dateCreated: {
            type: Date,
            required: true
        },
        dateUpdated: {
            type: Date,
            required: true
        },
        skills: {
            type: String,
            required: true
        }
    });

const Job = mongoose.model("Job", schema);

module.exports = Job;
