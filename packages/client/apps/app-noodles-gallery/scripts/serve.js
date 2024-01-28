const { resolve } = require('path');

const dotenv = require('dotenv');
const express = require('express');

dotenv.config({ path: '../../../../.env' });

const app = express();
const port = process.env.APP_PORT || 8080;

// serve static assets normally
app.use(express.static(resolve(__dirname, '../dist/')));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
    response.sendFile(resolve(__dirname, '../dist/index.html'));
});

app.listen(port);

console.info('server started on port ' + port);
