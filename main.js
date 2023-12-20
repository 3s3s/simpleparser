'use strict';

const g_constants = require('./constants');
const https = require('https');
const util = require('util');
const compression = require('compression');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

const log_file = require("fs").createWriteStream(__dirname + '/debug.log', {flags : 'w'});
const log_stdout = process.stdout;

console.log = function(d) { 
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

const app = express();
app.use(compression());
app.use(cors());

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


const httpsServer = https.createServer(g_constants.SSL_options, app);

const httpsListener = httpsServer.listen(g_constants.my_portSSL, function(){
    console.log("SSL Proxy listening on port "+g_constants.my_portSSL);
});

var lastSocketKey = 0;
var socketMap = {http: {}, https: {}};

httpsListener.on('connection', function(socket) {
    /* generate a new, unique socket-key */
    const socketKey = ++lastSocketKey;
    /* add socket when it is connected */
    socketMap.https[socketKey] = socket;
    socket.on('close', () => {
        /* remove socket when it is closed */
        delete socketMap.https[socketKey];
    });
});

app.use(express.static('./static_pages'));
app.set('view engine', 'ejs');

require('./reqHandler.js').handle(app);

