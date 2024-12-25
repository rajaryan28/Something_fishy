const connectToMongo=require('./db')
connectToMongo()

const express = require('express')
var cors = require('cors') 
const app = express()
const port = 6000

app.use(cors())
app.use(express.json())

//Available routes
app.use('/api/auth',require('./Routes/auth'))
app.use('/api/posts',require('./Routes/posts'))

app.get('/', (req, res) => {
  res.send('Hello Raj !')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})