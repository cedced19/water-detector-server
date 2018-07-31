#!/usr/bin/env node

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const email = require('./lib/email');
const schedule = require('node-schedule');

/**
 * Variables
 */

let lastConnection = (new Date()).getTime();

/**
 * Express server
 */

const express = require('express');
const app = express();
const port = require('env-port')('7770');

app.get('/water-detected', (req, res) => {
    lastConnection = (new Date()).getTime();
    email('water-detected');
    res.json({status: 'ok'});
});

app.get('/water-detector-connected', (req, res) => {
    lastConnection = (new Date()).getTime();
    res.json({status: 'ok'});
});

app.on('error', onError);

app.listen(port, () => {
    console.log(require('server-welcome')(port, 'Water detector'));
});

/**
 * Cron job
 */

schedule.scheduleJob('*/5 * * * *', function(){
    if (Math.floor(((new Date()).getTime()-lastConnection)/ 60000) >= 6) {
        email('no-connection');
    }
});

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}