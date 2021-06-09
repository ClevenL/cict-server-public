const { Schema, model } = require('mongoose')

const SourceSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    link: String,
    faviconUUID: String,
    rss_url: {
        type: String,
        required: true,
    },
    last_query: {
        type: Date,
        default: Date.now,
    },
    color: String,
    active: {
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        default: Date.now,
    },
})

const Source = model('source', SourceSchema)

module.exports = Source