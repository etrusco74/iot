var mqtt = require('mqtt');

var client = mqtt.connect('mqtt://localhost');
//var client = mqtt.connect('mqtt://test.mosquitto.org');
//var client = mqtt.connect('mqtt://iot-etrusco.c9.io');

client.on('connect', function () {
    console.log('connected');
    client.subscribe('/iot/api/');
});

client.on('message', function (topic, data) {
    data = (!!data) ? JSON.parse(data) : data;

    console.log('topic ==>', topic.toString());
    console.log('payload ==>', data);
});

var interval = setInterval(function(client) {
    client.publish(
        '/iot/api/',
        JSON.stringify({param1: Math.random().toString(36).substring(5)}));
}, 5000, client);