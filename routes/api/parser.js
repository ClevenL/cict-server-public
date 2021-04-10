const { Router } = require('express')
const router = Router()
const Mercury = require('@postlight/mercury-parser');

router.get('/', (req, res) => {
    const { url } = req.params

    res.send("hey")
    
})

router.get('/:url', async (req, res) => {
    const { url } = req.params

    Mercury.parse(url).then(result => res.send(result.content))
    
})

module.exports = router