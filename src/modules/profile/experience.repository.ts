import { prisma } from '../../config/prisma.js';

export async function createExperience(data: {
  company: string;
  role: string;
  description: string;
  profileId: number;
}) {
  return prisma.experience.create({
    data,
  });
}

export async function findExperiences(profileId: number) {
  return prisma.experience.findMany({
    where: {
      profileId,
    },
    include: {
      technologies: true,
    },
  });
}
