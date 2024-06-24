"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
// Generate a random coordinate within Europe
function getRandomEuropeCoordinates() {
    // Latitude range: 36.0 to 71.0 (approximate range covering most of Europe)
    const lat = Number((Math.random() * (71.0 - 36.0) + 36.0).toFixed(4));
    // Longitude range: -25.0 to 45.0 (approximate range covering most of Europe)
    const lng = Number((Math.random() * (45.0 - (-25.0)) + (-25.0)).toFixed(4));
    return { lat, lng };
}
wss.on('connection', function connection(ws) {
    console.log('New client connected');
    // Send random coordinates to the client every two seconds
    const intervalId = setInterval(() => {
        const coordinates = getRandomEuropeCoordinates();
        ws.send(JSON.stringify(coordinates));
    }, 2000);
    ws.on('close', function close() {
        console.log('Client disconnected');
        clearInterval(intervalId);
    });
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
});
console.log('WebSocket server is running on ws://localhost:8080');
