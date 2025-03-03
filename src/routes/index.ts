// src/routes/index.ts
import { Hono } from 'hono';
import healthRoutes from './health.routes';
import messageRoutes from './message.routes';
import dataRoutes from './data.routes';

const router = new Hono();

// Mount all route groups
router.route('/', healthRoutes);     // Health and root routes
router.route('/api/v1', dataRoutes); // API routes under /api/v1 prefix
router.route('', messageRoutes);     // Message routes (no prefix)

export default router;