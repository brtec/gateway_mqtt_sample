'use strict';
require('dotenv').config({ path: '.env' });
const mqtt = require('mqtt');
const client  = mqtt.connect(process.env.MQTT_HOST, {username: process.env.MQTT_USER, password: process.env.MQTT_PASS})
//DEVICE PARA TESTES='cmnd/brteciot_D074D1/POWER'


client.on('connect', function () {
    //OUVINDO MUDANÇAS NO DISPOSITIVO IoT
    client.subscribe('cmnd/brteciot_D074D1/POWER');
    //AVISANDO QUE CONECTOU NO MQTT
    client.publish('ClientWorkshop', 'To vivo !');
    console.log("MQTT CONECTADO");
})


client.on('message', function (topic, message) {
    // message is Buffer
    //IMPRIME MENSAGENS RECEBIDAS NO TOPICO DE COMANDO DE "SUBSCRIBE"
    console.log(topic.toString());
    console.log(message.toString());
})

//COMANDO DE EXEMPLO
//toggleSwitch('cmnd/brteciot_D074D1/POWER');
function toggleSwitch(deviceTopicName){
    client.publish(deviceTopicName, 'TOGGLE');
    console.log(`TOGGLE ENVIADO PARA ${deviceTopicName}`);
}