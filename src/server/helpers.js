
let rooms = require('./rooms');
function generateLightRoomInfo() {
    console.log('here2');
    const lightRooms = {};
    for (const namespace in rooms) {
        lightRooms[namespace] = {};
        for (const room in rooms[namespace]) {
            lightRooms[namespace][room] = rooms[namespace][room].map(client => client.id);
        }
    }
    console.log(lightRooms)
    return lightRooms;
}

function roomBroadcast(namespace, roomName, message) {
    message = JSON.stringify(message);
    if (namespace === 'admin') {
        adminBroadcast(namespace, roomName, message);
    } else {
        rooms[namespace][roomName].forEach((client) => {
            if (client.readyState === 1) {
                client.send(message);
            }
        });
        adminBroadcast(namespace, roomName, message)
    }

}

function adminBroadcast(namespace, roomName, message) {
    rooms['admin']['messages'].forEach((client) => {
        if (client.readyState === 1) {
            client.send(message);
        }
    });
}
function updateRoomList() {
    rooms['admin']['rooms'].forEach((client) => {
        if (client.readyState === 1) {
            client.send(JSON.stringify(generateLightRoomInfo()));
        }
    });
}

module.exports = {
    generateLightRoomInfo,
    roomBroadcast,
    updateRoomList
}