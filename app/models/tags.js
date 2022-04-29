// app/models/tags.js

// Import dependencies
const mongoose = require('mongoose')

const tagsSchema = new mongoose.Schema(
    {
        tagName: {
            type: String,
			required: true
		},
        tagged: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
        }]
	},{
		timestamps: true,
	}
)

module.exports = tagsSchema
