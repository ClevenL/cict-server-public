module.exports = {
    mongoUriHost: process.env.CICT_SERVER_MONGO_HOST || 'localhost',
    mongoUriDb: process.env.CICT_SERVER_MONGO_DB || 'rss',
    PORT: process.env.CICT_SERVER_PORT || 3000
}