const { Router } = require('express')
const GeneratedRaport = require('../../models/GeneratedRaport')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const generatedRaports = await GeneratedRaport.find()
        if (!generatedRaports) throw new Error('No generatedRaports')
        /*const sorted = generatedRaports.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })*/
        res.status(200).json(generatedRaports)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await GeneratedRaport.find({
            "_id": id 
        })
        if (!response) throw new Error('No such ID')
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newGeneratedRaport = new GeneratedRaport(req.body)
    try {
        const generatedRaport = await newGeneratedRaport.save()
        if (!generatedRaport) throw new Error('Something went wrong saving the GeneratedRaport')
        res.status(200).json(generatedRaport)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await GeneratedRaport.findByIdAndUpdate(id, req.body)
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
        const removed = await GeneratedRaport.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router