const PROFILE_ID = Number(process.env.PROFILE_ID);

if (!Number.isInteger(PROFILE_ID) || PROFILE_ID <= 0) {
  throw new Error('PROFILE_ID environment variable is not configured correctly');
}

export const env = {
  PROFILE_ID,
};
