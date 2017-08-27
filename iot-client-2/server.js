var mqtt    = require('mqtt');

//vedere --> etc/activemq.xml
/*
var client = mqtt.connect({
    host: 'etrusco-lnx',
    port: 35677,
    username: 'admin',
    password: 'admin?123'
});
*/
var client  = mqtt.connect('mqtt://localhost:1883');
//var client = mqtt.connect('mqtt://test.mosquitto.org');
//var client = mqtt.connect('mqtt://wduklzwt:dlek3eyKLLne@m20.cloudmqtt.com:15661'); /* trakkino heroku */

client.on('connect', function () {
    console.log('connected');
    client.subscribe('iot/client2/messages');
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
