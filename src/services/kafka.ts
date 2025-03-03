import { Kafka } from 'kafkajs';
import config from '../config';
import logger from '../utils/logger';

const kafka = new Kafka({
  clientId: 'hono-app',
  brokers: config.kafka.brokers,
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'hono-app-group' });

export const initKafka = async () => {
  try {
    await producer.connect();
    logger.info('Kafka producer connected');
    
    await consumer.connect();
    logger.info('Kafka consumer connected');
    
    // Subscribe to topics
    await consumer.subscribe({ topic: config.kafka.topic, fromBeginning: true });
    
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        logger.info({
          topic,
          partition,
          offset: message.offset,
          value: message.value?.toString(),
        }, 'Kafka message received');
      },
    });
  } catch (error) {
    logger.error({ error }, 'Failed to connect to Kafka');
  }
};

export const sendMessage = async (topic: string, message: any) => {
  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    logger.info({ topic, message }, 'Message sent to Kafka');
    return true;
  } catch (error) {
    logger.error({ error, topic, message }, 'Failed to send message to Kafka');
    return false;
  }
};

export const disconnectKafka = async () => {
  await producer.disconnect();
  await consumer.disconnect();
  logger.info('Kafka disconnected');
};