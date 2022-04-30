// app/models/tags.js

// Import dependencies
const mongoose= require("mongoose")


const tagsSchema = new mongoose.Schema(
    {
        tagName: {
            type:String,
            required:true
        },
        onBook: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }],
        blockedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }]
    },{
        timestamps: true
    }
)

module.exports = mongoose.model("Tag", tagsSchema)
