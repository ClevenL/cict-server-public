const { Schema, model } = require('mongoose')

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    summary: String,
    origlink: String,
    url: {
        type: String,
        required: true,
    },
    categories: [String],
    date: Date,
    hide: {
        type: Boolean,
        default: false,
    },
    star: {
        type: Boolean,
        default: false,
    },
    read: {
        type: Boolean,
        default: false,
    },
    saved: {
        isSaved: Boolean,
        content: String,
        entries: [String]
    },
    sources: Schema.Types.Mixed,
})

const Article = model('article', ArticleSchema)

module.exports = Article