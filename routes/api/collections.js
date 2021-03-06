const { Router } = require('express')
const Collection = require('../../models/Collection')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const collections = await Collection.find().sort({'date': 'desc'})
        if (!collections) throw new Error('No collections')
        /*const sorted = collections.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })*/
        res.status(200).json(collections)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newCollection = new Collection(req.body)
    try {
        const collection = await newCollection.save()
        if (!collection) throw new Error('Something went wrong saving the Collection')
        res.status(200).json(collection)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await Collection.findByIdAndUpdate(id, req.body)
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
        const removed = await Collection.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router