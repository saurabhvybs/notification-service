// src/controllers/health.controller.ts
import { Context } from 'hono';
import logger from '../utils/logger';
import config from '../config';

export const healthController = {
  getRoot: (c: Context) => {
    logger.info('Root endpoint accessed');
    return c.text('Hello Hono!');
  },
  
  getHealth: (c: Context) => {
    logger.info('Health check performed');
    return c.json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: Date.now(),
      environment: config.environment,
    });
  },
  
  triggerError: () => {
    logger.error('Test error triggered');
    throw new Error('This is a test error');
  }
};