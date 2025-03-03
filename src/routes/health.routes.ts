// src/routes/health.routes.ts
import { Hono } from 'hono';
import { healthController } from '../controllers/health.controllers';

const router = new Hono();

router.get('/', healthController.getRoot);
router.get('/health', healthController.getHealth);
router.get('/error', healthController.triggerError);

export default router;