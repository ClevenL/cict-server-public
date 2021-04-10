const { Schema, model } = require('mongoose')

const GeneratedRaportSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    date_field: String,
    entries: [Schema.Types.Mixed],
    html: String,
})

const GeneratedRaport = model('generatedRaport', GeneratedRaportSchema)

module.exports = GeneratedRaport