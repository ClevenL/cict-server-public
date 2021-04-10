const { Router } = require('express')
const Article = require('../../models/Article')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const articles = await Article.find().sort({'date': 'desc'})
        if (!articles) throw new Error('No articles')
        res.status(200).json(articles)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newArticle = new Article(req.body)
    try {
        const article = await newArticle.save()
        if (!article) throw new Error('Something went wrong saving the article')
        res.status(200).json(article)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await Article.findByIdAndUpdate(id, req.body)
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
        const removed = await Article.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/delete/all', async (req, res) => {
    try {
        const removed = await Article.deleteMany({ __v: 0})
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router