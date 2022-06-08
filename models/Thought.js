const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const formattedDate = function() {
    const date = Date.now();
    return date.toDateString();
}

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: [
            {
                type: String,
                required: true,
            },
        ],
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual to count number of friends a user has.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;