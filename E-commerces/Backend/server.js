const express = require('express')
const app = express()
const port = 3000


app.get('/user/:id', (req, res) => res.send(`Hello ${req.params.id}`))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))