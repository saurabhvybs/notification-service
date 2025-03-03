// src/controllers/message.controller.ts
import { Context } from 'hono';
import logger from '../utils/logger';
import config from '../config';
import { sendMessage } from '../services/kafka';

export const messageController = {
  sendMessage: async (c: Context) => {
    try {
      const body = await c.req.json();
      logger.info({ body }, 'Received message request');
      
      if (!config.kafka.enabled) {
        logger.warn('Kafka is disabled, message not sent');
        return c.json({ success: true, warning: 'Kafka is disabled' }, 200);
      }
      
      const result = await sendMessage(config.kafka.topic, body);
      
      if (result) {
        return c.json({ success: true }, 201);
      } else {
        return c.json({ success: false, error: 'Failed to publish message' }, 500);
      }
    } catch (error) {
      logger.error({ error }, 'Error processing message');
      return c.json({ success: false, error: 'Invalid request' }, 400);
    }
  }
};