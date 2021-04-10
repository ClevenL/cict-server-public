const { Schema, model } = require('mongoose')

const TemplateSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    categories: [Schema.Types.Mixed],
})

const Template = model('template', TemplateSchema)

module.exports = Template