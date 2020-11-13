//اعدادات السيرفر

const express = require('express')
const bodyParser = require('body-parser')
const cors=require('cors');
const api = require('./routes/api');

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/api',api)


app.get('/', function (req, res) {
res.send('hello world')
})


app.listen(process.env.PORT || 8080);