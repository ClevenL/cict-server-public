const { Schema, model } = require('mongoose')

const CollectionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    date_field: String,
    date: {
        type: Date,
        default: Date.now,
    },
    active: {
        type: Boolean,
        default: false
    }
})

const Collection = model('collection', CollectionSchema)

module.exports = Collection