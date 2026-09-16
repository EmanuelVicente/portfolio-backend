import { Router } from 'express';

import { assistantRateLimit } from '../../middleware/assistantRateLimit.js';
import { validateAssistantRequest } from '../../middleware/validateAssistantRequest.js';

import { postAssistant } from './assistant.controller.js';

const router = Router();

router.post('/', assistantRateLimit, validateAssistantRequest, postAssistant);

export default router;
