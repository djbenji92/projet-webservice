const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;

const ChallengeSchema = Schema({
    date: {
        type: Date,
        required: true
    },
    source: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    target: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    winner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    slots: {
        type: String,
        default: 'Pending'
    },
    bot: {
        type: Schema.Types.ObjectId,
        ref: 'Bot'
    }
});

ChallengeSchema.plugin(timestamps);

module.exports = mongoose.model('Challenge', ChallengeSchema);