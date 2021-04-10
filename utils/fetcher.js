const FeedParser = require('feedparser')
const fetch = require('node-fetch')
const Article = require('../models/Article')
const Source = require('../models/Source')

async function saveItem(item, source) {
    let pubDateValue = item.pubDate.valueOf()
    let lastQueryDate = new Date(source.last_query)
    let lastQueryValue = lastQueryDate.valueOf()
    if (pubDateValue > lastQueryValue){
        let article = {
            title : item.title,
            summary : item.summary,
            origlink : item.origlink,
            url : item.link,
            categories : item.categories,
            date : item.pubDate,
            sources: {
                _id: source._id,
                title: source.title,
                color: source.color,
            },
        }
        const newArticle = new Article(article)
        try {
            const saveArticle = await newArticle.save()
            if (!saveArticle) throw new Error('Something went wrong saving the article')
            let lastQuery = new Date()
            const updateSource = await Source.findByIdAndUpdate(source._id, {last_query: lastQuery.toISOString()})
            if (!updateSource) throw Error('Something went wrong updating the sources last_query')
            console.log('New article added')
        } catch (error) {
            console.log(error)
        }
    }
}

exports.fetchFeed = async () => {

    const sources = await Source.find()
    sources.forEach(async source => {
        const feedparser = new FeedParser()
        try {
            const res = await fetch(source.rss_url)
            res.body.pipe(feedparser)
        } catch(error) {
            console.log(error)
        }

        feedparser.on('error', error => console.log(`Feedparser error: ${error}`))
        feedparser.on('readable', async function () {
            const stream = this
            const meta = this.meta
            let item
            
            while (item = stream.read()) {
                await saveItem(item, source)
            }
        })
    })
}