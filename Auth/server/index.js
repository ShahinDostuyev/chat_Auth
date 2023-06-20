const express = require('express');
const { db } = require('./config/db');

const app = express();

const cors = require('cors')




const { adminUserRoutes } = require('./routes/adminUserRoute');
const { webUserRoutes } = require('./routes/webUserRoute');

require('dotenv').config()
app.use(express.json())
app.use(cors());
db.connect();





app.use('/api/adminusers', adminUserRoutes)
app.use('/api/webuser', webUserRoutes)


app.listen(3000);


//ON - EMİT