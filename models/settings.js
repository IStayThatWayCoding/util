const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    mutedRole: String,
    logChannelID: String,
    welcomeLogs: String,
    wordBlacklist: [{
        type: String
    }]
});

module.exports = mongoose.model('Settings', settingsSchema, 'settings');