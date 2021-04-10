const { Schema, model } = require('mongoose')

const EntrySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: " "
    },
    date: {
        type: Date,
        default: Date.now,
    },
    articles: [Schema.Types.Mixed],
    article_urls: [String],
    category: {
        type: String,
        default: "Uncategorized"
    },
    collection_id: [String]
    /*source: {
        type: Schema.Types.ObjectId, 
        ref: 'Source'
    }*/
})

const Entry = model('entry', EntrySchema)

module.exports = Entry