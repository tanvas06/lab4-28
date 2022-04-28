const express = require(`express`)
const path = require(`path`)

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '22ab48e45754479ca5e63c67d905d6fc',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

const app = express()

app.get(`/`, (req, res) => {
    res.sendFile(path.join(__dirname, `../index.html`))
    rollbar.info('html file served successfully.')
})

const port = process.env.PORT || 4325

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`Take us to warp ${port}!`))

