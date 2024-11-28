const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pageCount: {
        type: Number,
        required: true,
    },
    publishDate: {
        type: Date,
        default: Date.now,
    },
});

mongoose.model("Book", BookSchema);
