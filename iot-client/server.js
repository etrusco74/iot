/* client1 node.js
subscribe iot/client2/messages
publish   iot/client1/messages
publish   every 10s

vedere --> etc/activemq.xml */

var mqtt = require('mqtt');

/* localhost on fuse */
var client = mqtt.connect({
    host: 'etrusco-lnx',
    port: 1883,
    username: 'system',
    password: 'manager'
});

//var client = mqtt.connect('mqtt://localhost:1883'); //node.js on localhost
//var client = mqtt.connect('mqtt://test.mosquitto.org'); //mosquitto.org

console.log('Client 1 - node.js - subscribe iot/client2/messages - publish iot/client1/messages');
console.log('connecting ... ');
client.on('connect', function () {
    console.log('connected');
    client.subscribe('iot/client2/messages');
    //client.subscribe('/TestTopic/');
});

client.on('message', function (topic, data) {

    data = (!!data) ? JSON.parse(data) : data;

    console.log('topic ==>', topic.toString());
    console.log('payload ==>', data);

});

var interval = setInterval(function(client) {
    client.publish(
        'iot/client1/messages',
        JSON.stringify({client1: Math.random().toString(36).substring(5)}));
}, 10000, client);
