const { Router } = require('express')
const Setting = require('../../models/Setting')
const router = Router()

router.post('/', async (req, res) => {
    const newSetting = new Setting(req.body)
    try {
        const response = await newSetting.save()
        if (!response) throw new Error('Something went wrong saving the setting')
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const response = await Setting.findOne()
        if (!response) throw new Error('Something went wrong getting the settings')
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/', async (req, res) => {
    try {
        const response = await Setting.findOneAndUpdate({}, req.body, {
            returnOriginal: false
        });
        if (!response) throw Error('Something went wrong updating settings')
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


module.exports = router