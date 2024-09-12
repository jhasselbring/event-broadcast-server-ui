console.clear();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const wss = new WebSocket.Server({ server });
const path = require('path');
let rooms = require('./rooms');
const {
    generateLightRoomInfo,
    roomBroadcast,
    updateRoomList
} = require('./helpers');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../build')));

// Handles any requests that don't match the ones above
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../build/index.html'));
//   });

app.get('/', (req, res) => {
    res.send('App is alive and well!!!');
});
app.get('/api/rooms', (req, res) => {
    console.log('here1');
    res.send(generateLightRoomInfo());
});
app.post('/api/:namespace/:roomName', (req, res) => {
    const namespace = req.params.namespace;
    const roomName = req.params.roomName;
    console.log("BODY", req.body);
    if (rooms[namespace] && rooms[namespace][roomName]) {
        roomBroadcast(namespace, roomName, req.body);
        res.json({
            success: true
        });
    } else {
        res.json({
            success: false,
        });
    }

});

server.listen(process.env.PORT || 4081, () => {
    console.log(`HTTP server listening on ${process.env.PORT || 4081}`);
});


wss.on('connection', function connection(ws, req) {
    const namespace = req.url.split('/')[1];
    const roomName = req.url.split('/')[2] || 'main';
    if (!rooms[namespace]) {
        rooms[namespace] = {};
    }
    if (!rooms[namespace][roomName]) {
        rooms[namespace][roomName] = [];
    }
    ws.id = uuidv4();
    rooms[namespace][roomName].push(ws);
    console.log(`${ws.id} connected to ${namespace}/${roomName}`);
    updateRoomList();
    roomBroadcast(namespace, roomName, `${ws.id} client connected to ${roomName} of ${namespace}!`);

    ws.on('message', function incoming(message) {
        roomBroadcast(namespace, roomName, message);
    });
});




