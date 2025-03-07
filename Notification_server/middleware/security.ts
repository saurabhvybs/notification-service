// src/middleware/security.ts
import { Hono } from 'hono';
import { cors } from 'hono/cors';  // Import from hono/cors instead of @hono/cors
import logger from '../utils/logger';

export const setupSecurity = (app: Hono) => {
  // CORS middleware
  app.use('*', cors({
    origin: ['http://localhost:3000', 'https://yourdomain.com'],
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 86400,
    credentials: true,
  }));

  // Content Security Policy and other security headers
  app.use('*', async (c, next) => {
    c.header('Content-Security-Policy', 
      "default-src 'self'; script-src 'self'; object-src 'none'; img-src 'self' data:;");
    c.header('X-XSS-Protection', '1; mode=block');
    c.header('X-Content-Type-Options', 'nosniff');
    c.header('X-Frame-Options', 'DENY');
    c.header('Referrer-Policy', 'no-referrer-when-downgrade');
    await next();
  });

  // Request logging middleware
  app.use('*', async (c, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    logger.info({
      method: c.req.method,
      path: c.req.path,
      status: c.res.status,
      responseTime: `${ms}ms`,
    }, 'Request processed');
  });

  // Error handling middleware
  app.onError((err, c) => {
    logger.error({ err, path: c.req.path }, 'Error occurred');
    return c.json({
      error: true,
      message: process.env.NODE_ENV === 'production' 
        ? 'Internal Server Error' 
        : err.message,
    }, 500);
  });

  return app;
};