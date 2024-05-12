import { connect } from 'mqtt';
import dotenv from 'dotenv';

dotenv.config();

const mqttClient = connect(process.env.MQTT_BROKER_URL, {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
});

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
});

mqttClient.on('error', (error) => {
    console.error('MQTT error:', error);
});


export default mqttClient;
