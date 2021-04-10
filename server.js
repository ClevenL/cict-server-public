const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { PORT, mongoUriHost, mongoUriDb } = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const articleRoutes = require('./routes/api/articles')
const sourceRoutes = require('./routes/api/sources')
const entryRoutes = require('./routes/api/entries')
const categoryRoutes = require('./routes/api/categories')
const templateRoutes = require('./routes/api/templates')
const collectionRoutes = require('./routes/api/collections')
const settingsRoutes = require('./routes/api/settings')
const parserRoutes = require('./routes/api/parser')
const generatedRaportRoutes = require('./routes/api/generatedRaports')
const fetcher = require('./utils/fetcher')
const cleaner = require('./utils/cleanDB')

app.use(cors())
app.use(morgan('combined'))
app.use(bodyParser.json())

mongoose.connect(`mongodb://${mongoUriHost}/${mongoUriDb}`, { 
    useNewUrlParser: true, 
    autoIndex: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    })
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Failed to connect to database', err));

app.use('/api/articles', articleRoutes)
app.use('/api/sources', sourceRoutes)
app.use('/api/entries', entryRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/templates', templateRoutes)
app.use('/api/collections', collectionRoutes)
app.use('/api/generatedraports', generatedRaportRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/parser', parserRoutes)

setInterval(() => {
    fetcher.fetchFeed()
    cleaner.clean()
}, 600000);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))