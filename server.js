const express = require('express')
const app = express()
const port = 3000


// -- routes

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`NODE API is listening on port ${port}`)
})