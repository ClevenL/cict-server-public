const Article = require('../models/Article')

const articleDate = article => Date.parse(article.date)
const oneWeekAgo =  Date.now() - 6.048e+8
const twoWeeksAgo =  Date.now() - 1.21e+9

exports.clean = async () => {
    const articles = await Article.find()
    
    articles.forEach(async article => {
        if(article.hide && articleDate(article) < oneWeekAgo) await Article.findByIdAndDelete(article._id) 
        if(articleDate(article) < twoWeeksAgo) await Article.findByIdAndDelete(article._id)
    })
}
