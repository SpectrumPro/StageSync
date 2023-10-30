/* eslint-disable import/no-anonymous-default-export */

import e from 'cors';
import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:9999/qlcplusWS');

ws?.on('open', function open() {
  // You can send a message to the server after establishing the connection
    
  
});

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}


const VcChanels = {
  0:[46, 47, 48],
  1:[50, 51, 52],
  2:[54, 55, 56],
  3:[58, 59, 60],
  4:[62, 63, 64],
  5:[66, 67, 68],
}

export default (req, res) => {
  
  
  if (req.method === "POST") {
    // get message
    const m = req.body;
    
    // dispatch to channel "message"

    for (let id = 0; id < m.length; id++) {
      const e = m[id];
      var rbg = hexToRgb(e.color)
      ws?.send(VcChanels[e.id][0] + "|"+rbg.r);
      ws?.send(VcChanels[e.id][1] + "|"+rbg.g);
      ws?.send(VcChanels[e.id][2] + "|"+rbg.b);
    }
    console.log()
    // console.log(message);
    // res?.socket?.server?.io?.emit("message", message);

    // return message
    res.status(201).json(m);
  }
};



// export default function handler(req, res) {
//   const ws = new WebSocket('ws://your_websocket_server_url');

//   ws.on('open', function open() {
//     console.log('Connected to the WebSocket server');
//     // You can send a message to the server after establishing the connection
//     ws.send('Hello, WebSocket server!');
//   });

//   ws.on('message', function incoming(data) {
//     console.log('Received message from the server:', data);
//     // You can handle the incoming messages from the server here
//   });

//   // Handle errors and close events if needed
//   ws.on('error', function error(err) {
//     console.error('WebSocket encountered an error:', err);
//   });

//   ws.on('close', function close() {
//     console.log('Disconnected from the WebSocket server');
//   });

//   // You can also send data to the WebSocket server based on your application's requirements

//   // To close the WebSocket connection when the API call is finished, you can use the following line
//   // ws.close();
// }
