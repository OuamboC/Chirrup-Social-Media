const express = require('express');
const morgan  = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();
app.use(cors());

// Server port
const HTTP_PORT = 3333;

// Start server
app.listen(HTTP_PORT, () => {
    console.log('Server running on port: ' + HTTP_PORT);
});

// Logging
app.use(morgan('tiny'));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Root endpoint
app.get('/', (req, res, next) => {
    res.json({'status': 'Alive'});
});

// Other API endpoints: Links go here...
// You can uncomment the below four lines as you implement the functionality - we'll discuss this structure in week three.

//Link the 'user.server.routes' to the main application which is server.js
require('./app/routes/user.server.routes')(app);

//Link the 'social.server.routes' to the main application which is server.js
 require('./app/routes/social.server.routes')(app);

//Link the 'post.server.routes' to the main application which is server.js
 require('./app/routes/post.server.routes')(app);

//Link the 'feed.server.routes' to the main application which is server.js
 require('./app/routes/feed.server.routes')(app);


// Default response for any other request
app.use((req, res) => {
    res.sendStatus(404);
});
