import { prisma } from '../../config/prisma.js';

export async function findProfile(id: number) {
  return prisma.profile.findUnique({
    where: {
      id,
    },
    include: {
      experiences: {
        include: {
          technologies: true,
          highlights: true,
        },
      },
      educations: true,
      projects: {
        include: {
          technologies: true,
          highlights: true,
        },
      },
      skills: true,
    },
  });
}
