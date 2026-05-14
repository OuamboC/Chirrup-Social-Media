const express = require('express');
const morgan  = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res, next) => {
    res.json({'status': 'Alive'});
});

require('./app/routes/user.server.routes')(app);
require('./app/routes/social.server.routes')(app);
require('./app/routes/post.server.routes')(app);
require('./app/routes/feed.server.routes')(app);

app.use((req, res) => {
    res.sendStatus(404);
});

const PORT = Number(process.env.PORT) || 3333;
app.listen(PORT, '0.0.0.0', () => {
    console.log('Server running on port: ' + PORT);
});
