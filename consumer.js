const { Kafka } = require('kafkajs');
const admin = require('firebase-admin');

// Firebase Admin SDK 초기화
const serviceAccount = require('./key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://test-a8aa8-default-rtdb.asia-southeast1.firebasedatabase.app' // Firebase Realtime Database URL
});

const db = admin.database();

const kafka = new Kafka({
    clientId: 'from_ai',
    brokers: ['localhost:9094']
});

const consumer = kafka.consumer({ groupId: 'data-group' });

const initKafka = async () => {
    console.log('start reading data from port 9094');
    await consumer.connect();
    await consumer.subscribe({ topic: 'FROM_AI', fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const messageValue = message.value.toString();
            // console.log({ value: message.value.toString() });

            const fruit = messageValue.substring(1, 6); // "apple0"
            const color = messageValue.substring(6, 9); // "red"
            const grade = messageValue.substring(9, 10); // "A"
            console.log(fruit + ' ' + color + ' ' + grade);
            // Firebase Realtime Database에 데이터 추가
            // const data = { value: message.value.toString() };
            const data = { fruit, color, grade };
            const ref = db.ref('data').push();
            await ref.set(data);
        },
    });
}

initKafka();