var mqtt = require('mqtt');

//vedere --> etc/activemq.xml
/*
var client = mqtt.connect({
    host: 'etrusco-lnx',
    port: 1883,
    username: 'system',
    password: 'manager'
});
*/
var client = mqtt.connect('mqtt://localhost:1883');
//var client = mqtt.connect('mqtt://test.mosquitto.org');
//var client = mqtt.connect('mqtt://iot-etrusco.c9.io');
//var client = mqtt.connect('mqtt://wduklzwt:dlek3eyKLLne@m20.cloudmqtt.com:15661'); /* trakkino heroku */

console.log('connecting ... ');
client.on('connect', function () {
    console.log('connected');
    client.subscribe('iot/client1/messages');
    //client.subscribe('/TestTopic/');
});

client.on('message', function (topic, data) {

    data = (!!data) ? JSON.parse(data) : data;

    console.log('topic ==>', topic.toString());
    console.log('payload ==>', data);

});

//'/iot/api/'
//'{"test": "test"}');
var interval = setInterval(function(client) {
    client.publish(
        'iot/client1/messages',
        JSON.stringify({client1: Math.random().toString(36).substring(5)}));
}, 10000, client);
