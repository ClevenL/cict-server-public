const { Router } = require('express')
const Category = require('../../models/Category')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find()
        if (!categories) throw new Error('No categories')
        /*const sorted = categories.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })*/
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newCategory = new Category(req.body)
    try {
        const category = await newCategory.save()
        if (!category) throw new Error('Something went wrong saving the Category')
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await Category.findByIdAndUpdate(id, req.body)
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
        const removed = await Category.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.delete('/delete/all', async (req, res) => {
    try {
        const removed = await Category.deleteMany({ __v: 0})
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router