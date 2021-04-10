const { Router } = require('express')
const Source = require('../../models/Source')
const fetcher = require('../../utils/fetcher')
let Parser = require('rss-parser')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const sources = await Source.find()
        if (!sources) throw new Error('No sources')
        /*const sorted = sources.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })*/
        res.status(200).json(sources)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/fetch', async (req, res) => {
    try {
        await fetcher.fetchFeed()
        res.status(200).send("Fetched new articles")
    } catch (error) {
        res.status(500).send(error)
    }

})

router.post('/', async (req, res) => {
    const yesterday = new Date(Date.now() - 8.64e+7).toISOString()
    let parser = new Parser()
    try {      
        let feed = await parser.parseURL(req.body.rss_url)
        if (!feed) throw Error('Something went wrong getting the feed')
        const sourceData = {
            title: feed.title,
            rss_url: feed.feedUrl,
            last_query: yesterday
            }
        const newSource = new Source(sourceData)
        const source = await newSource.save()
        if (!source) throw new Error('Something went wrong saving the Source')
        await fetcher.fetchFeed()
        res.status(200).json(source)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const response = await Source.findByIdAndUpdate(id, req.body)
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
        const removed = await Source.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/delete/all', async (req, res) => {
    try {
        const removed = await Source.deleteMany({ __v: 0})
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


module.exports = router