/* client2 node.js
subscribe iot/client1/messages
publish   iot/client2/messages
publish   every 5s

vedere --> etc/activemq.xml */

var mqtt    = require('mqtt');

/* fuse on localhost */
var client = mqtt.connect({
    host: 'localhost',
    port: 1883,
    username: 'system',
    password: 'manager'
});


//var client  = mqtt.connect('mqtt://localhost:1883'); //node.js on localhost
//var client = mqtt.connect('mqtt://test.mosquitto.org');  //mosquitto.org

console.log('Client 2 - node.js - subscribe iot/client1/messages - publish iot/client2/messages');
console.log('connecting ... ');

client.on('connect', function () {
    console.log('connected');
    client.subscribe('iot/client1/messages');
});

client.on('message', function (topic, data) {
    data = (!!data) ? JSON.parse(data) : data;

    console.log('topic ==>', topic.toString());
    console.log('payload ==>', data);
});


var interval = setInterval(function(client) {
    client.publish(
        'iot/client2/messages',
        JSON.stringify({client2: Math.random()}));
}, 5000, client);
