/* jshint node: true */
/* jshint esversion: 6 */

'use strict';

const electron = require('electron');
const path = require('path');



// Module to control application life.
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let win = null;

app.on('ready', function() {
    win = new BrowserWindow({
        height: 600,
        width: 800,
        frame: false,
        resizable: false
    });
    win.loadURL('file://' + __dirname + '/index.html');
});
