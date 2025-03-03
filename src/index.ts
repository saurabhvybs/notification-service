// src/index.ts
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import config from './config';
import logger from './utils/logger';
import { setupSecurity } from './middleware/security';
import { initKafka, disconnectKafka } from './services/kafka';
import router from './routes';

// Initialize the Hono application
const app = new Hono();

// Apply security middleware
setupSecurity(app);

// Mount all routes
app.route('', router);

// Start the server
if (require.main === module) {
  // Initialize Kafka if enabled
  if (config.kafka.enabled) {
    initKafka().catch((err) => {
      logger.error({ err }, 'Failed to initialize Kafka');
    });
  }
  
  const server = serve({
    fetch: app.fetch,
    port: Number(config.port),
  });

  logger.info({
    environment: config.environment,
    port: config.port,
    kafkaEnabled: config.kafka.enabled,
  }, 'Server started');
  
  // Handle graceful shutdown
  const shutdown = async () => {
    logger.info('Shutting down server...');
    server.close();
    if (config.kafka.enabled) {
      await disconnectKafka();
    }
    logger.info('Server shutdown complete');
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

// Export the app for testing
export default app;