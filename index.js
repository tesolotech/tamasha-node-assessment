require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(process.env.DB_URL, {
     useNewUrlParser: true,
     useCreateIndex: true,
     useUnifiedTopology: true,
     promiseLibrary: global.Promise,
}).then(() => {
     console.log("Successfully connected to the database");
}).catch(err => {
     console.log('Could not connect to the database. Exiting now...', err);
     process.exit();
});

// Handling CORS error     
app.use((req, res, next) => {
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Authorization');
     if (res.method === 'OPTIONS') {
          res.header('Access-Control-Allow-Methods', 'PUT, GET, DELETE, POST, PATCH');
          return res.status(200).json({});
     }
     next();
});

app.set('port', process.env.PORT || 3000);

// Require Users routes
require('./app/routes/user.routes.js')(app);
require('./app/routes/food.routes.js')(app);

app.listen(app.get('port'), () => console.log(`Server is listening on port ${app.get('port')}`));

