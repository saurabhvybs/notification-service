// src/routes/message.routes.ts
import { Hono } from 'hono';
import { messageController } from '../controllers/messages.controllers';

const router = new Hono();

router.post('/messages', messageController.sendMessage);

export default router;