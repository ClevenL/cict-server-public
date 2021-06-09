const FeedParser = require('feedparser')
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const axios = require('axios').default
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
            sources: source,
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

exports.getFavicon = async (link, uuid) => {
    const googleFaviconAPI = "https://www.google.com/s2/favicons?domain="
    const filePath = path.resolve(__dirname, '..' , 'favicons', `${uuid}.png`);
    try {
        const response = await axios({
          method: 'GET',
          url: googleFaviconAPI + link,
          responseType: 'stream',
        });
    
        const w = response.data.pipe(fs.createWriteStream(filePath));
        w.on('finish', () => {
          console.log('Successfully downloaded file!');
        });
    } catch (err) {
        throw new Error(err);
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