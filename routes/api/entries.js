const { Router } = require('express')
const Entry = require('../../models/Entry')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const entires = await Entry.find()
        if (!entires) throw new Error('No entires')
        /*const sorted = entires.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })*/
        res.status(200).json(entires)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await Entry.find({
            "_id": id 
        })
        if (!response) throw new Error('No such ID')
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newEntry = new Entry(req.body)
    try {
        const entry = await newEntry.save()
        if (!entry) throw new Error('Something went wrong saving the Entry')
        res.status(200).json(entry)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await Entry.findByIdAndUpdate(id, req.body)
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
        const removed = await Entry.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router