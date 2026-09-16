import { Router } from 'express';

import { getProfileController } from './profile.controller.js';

const router = Router();

router.get('/', getProfileController);

export default router;
