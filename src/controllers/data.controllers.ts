// src/controllers/data.controller.ts
import { Context } from 'hono';
import logger from '../utils/logger';

export const dataController = {
  getData: (c: Context) => {
    logger.info('API data requested');
    return c.json({
      data: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ],
      timestamp: new Date().toISOString(),
    });
  }
};