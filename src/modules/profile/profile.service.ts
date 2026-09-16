import { AppError } from '../../errors/AppError.js';

import { findProfile } from './profile.repository.js';

export async function getProfile() {
  const profileId = Number(process.env.PROFILE_ID);

  if (!Number.isInteger(profileId) || profileId <= 0) {
    throw new Error('PROFILE_ID environment variable is not configured correctly');
  }

  const profile = await findProfile(profileId);

  if (!profile) {
    throw new AppError('Profile not found', 404);
  }

  return profile;
}
