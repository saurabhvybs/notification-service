// src/routes/data.routes.ts
import { Hono } from 'hono';
import { dataController } from '../controllers/data.controllers';

const router = new Hono();

router.get('/data', dataController.getData);

export default router;