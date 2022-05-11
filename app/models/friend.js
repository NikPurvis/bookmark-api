// app/models/friend.js

// Import dependencies
const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema(
    {
        friendPart1: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        friendPart2: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },{
        timestamps: true,
    }
)

module.exports = mongoose.model('Friend', friendSchema)
