const { Schema, model } = require('mongoose')

const SettingSchema = new Schema({
    fetch_rate: {
        type: Number,
        default: 60,
    },
})

const Setting = model('setting', SettingSchema)

module.exports = Setting