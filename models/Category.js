const { Schema, model } = require('mongoose')

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    color: String,
    arrayName: String
})

const Category = model('category', CategorySchema)

module.exports = Category