import {Kafka} from 'kafkajs';
import logger from '../utils/logger';

const kafka  = new Kafka({
    clientId: 'notification-service',
    brokers : ['kafka_broker : 9092'],
});

const admin = kafka.admin();

const createTopic = async () => {
    try{
        logger.info('Connecting to Kafka Broker');
        await admin.connect();
        logger.info('Connected to Kafka Broker');
        await admin.createTopics({
            topics: [
                {
                    topic: 'notification_service',
                    numPartitions: 10,
                    replicationFactor: 1,
                },
            ],
        });
        logger.info('Topic Created Successfully');
        await admin.disconnect();
    } catch (error) {
        logger.error(`Error creating topic: ${error}`);
    }
};

createTopic(); // fire the function