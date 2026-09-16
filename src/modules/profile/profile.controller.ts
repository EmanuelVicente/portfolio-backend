import type { Request, Response } from 'express';

import { getProfile } from './profile.service.js';

export async function getProfileController(_req: Request, res: Response): Promise<void> {
  const profile = await getProfile();

  res.status(200).json(profile);
}
