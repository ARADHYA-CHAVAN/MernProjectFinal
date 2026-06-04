const express = require('express');
const connectMongo = require('./db/db_config');
const routes = require('./routes/courseRoutes');

const cors = require('cors');
const app = express()
connectMongo()
app.use(cors())
app.use(express.json())


app.use(express.urlencoded({ extended: true }))

app.use("/uploads", express.static("uploads"));
app.use('/course',routes)


app.listen(4000, () => {
    console.log('server is running....');

})