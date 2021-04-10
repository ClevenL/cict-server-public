const { Router } = require('express')
const Template = require('../../models/Template')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const templates = await Template.find()
        if (!templates) throw new Error('No templates')
        /*const sorted = templates.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })*/
        res.status(200).json(templates)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newTemplate = new Template(req.body)
    try {
        const template = await newTemplate.save()
        if (!template) throw new Error('Something went wrong saving the Template')
        res.status(200).json(template)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await Template.findByIdAndUpdate(id, req.body)
        if (!response) throw Error('Something went wrong ')
        const updated = { ...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Template.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.delete('/delete/all', async (req, res) => {
    try {
        const removed = await Template.deleteMany({ __v: 0})
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router