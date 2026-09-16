import 'dotenv/config';

import { prisma } from '../config/prisma.js';

async function main() {
  const profile = await prisma.profile.upsert({
    where: {
      name: 'Emanuel Vicente',
    },
    update: {},
    create: {
      name: 'Emanuel Vicente',
      role: 'Software Engineer',
      summary:
        'Software Engineer with more than 8 years of experience building web and mobile applications. Specialized in React, React Native, TypeScript and Node.js.',
    },
  });

  // ----------------------------------------
  // Experiences
  // ----------------------------------------

  const experiences = [
    {
      company: 'SimpleState',
      role: 'Software Engineer',
      description:
        'Worked on a real-estate investment platform where users could invest money and receive returns. Improved the user experience and investment flow, and worked on application performance improvements.',
      technologies: ['React', 'TypeScript'],
      highlights: [
        'Improved the user experience of the investment flow.',
        'Worked on application performance improvements.',
      ],
    },
    {
      company: 'SAV3',
      role: 'Software Engineer',
      description: 'Worked on B2B dashboards and client administration tools.',
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'TanStack'],
      highlights: ['Worked on B2B dashboards.', 'Worked on client administration and control tools.'],
    },
  ];

  for (const experience of experiences) {
    await prisma.experience.upsert({
      where: {
        profileId_company_role: {
          profileId: profile.id,
          company: experience.company,
          role: experience.role,
        },
      },
      update: {
        description: experience.description,
        technologies: {
          set: [],
          connectOrCreate: experience.technologies.map((name) => ({
            where: {
              name,
            },
            create: {
              name,
            },
          })),
        },
        highlights: {
          deleteMany: {},
          create: experience.highlights.map((text) => ({
            text,
          })),
        },
      },
      create: {
        company: experience.company,
        role: experience.role,
        description: experience.description,
        profileId: profile.id,
        technologies: {
          connectOrCreate: experience.technologies.map((name) => ({
            where: {
              name,
            },
            create: {
              name,
            },
          })),
        },
        highlights: {
          create: experience.highlights.map((text) => ({
            text,
          })),
        },
      },
    });
  }

  // ----------------------------------------
  // Education
  // ----------------------------------------

  const educations = [
    {
      institution: 'University',
      degree: "Bachelor's degree in Systems Engineering",
    },
  ];

  for (const education of educations) {
    await prisma.education.upsert({
      where: {
        profileId_institution_degree: {
          profileId: profile.id,
          institution: education.institution,
          degree: education.degree,
        },
      },
      update: {},
      create: {
        institution: education.institution,
        degree: education.degree,
        profileId: profile.id,
      },
    });
  }

  // ----------------------------------------
  // Projects
  // ----------------------------------------

  const projects = [
    {
      name: 'Sales & Order Management Platform',
      type: 'Mobile & Web',
      description:
        'A solution for sales representatives visiting small local stores. Representatives could create orders using a mobile application even when there was no internet connection. The application synchronized the orders with a remote server once connectivity was restored.',
      technologies: [],
      highlights: [
        'Supported order creation while offline.',
        'Synchronized data with a remote server when connectivity was restored.',
        'Included two mobile applications and one web application for administration and logistics.',
      ],
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: {
        profileId_name: {
          profileId: profile.id,
          name: project.name,
        },
      },
      update: {
        type: project.type,
        description: project.description,
        technologies: {
          set: [],
          connectOrCreate: project.technologies.map((name) => ({
            where: {
              name,
            },
            create: {
              name,
            },
          })),
        },
        highlights: {
          deleteMany: {},
          create: project.highlights.map((text) => ({
            text,
          })),
        },
      },
      create: {
        name: project.name,
        type: project.type,
        description: project.description,
        profileId: profile.id,
        technologies: {
          connectOrCreate: project.technologies.map((name) => ({
            where: {
              name,
            },
            create: {
              name,
            },
          })),
        },
        highlights: {
          create: project.highlights.map((text) => ({
            text,
          })),
        },
      },
    });
  }

  // ----------------------------------------
  // Skills
  // ----------------------------------------

  const skills = [
    { name: 'React', category: 'frontend' },
    { name: 'Next.js', category: 'frontend' },
    { name: 'React Native', category: 'frontend' },
    { name: 'TypeScript', category: 'frontend' },

    { name: 'Node.js', category: 'backend' },
    { name: 'Express', category: 'backend' },
    { name: 'REST APIs', category: 'backend' },

    { name: 'PostgreSQL', category: 'database' },
    { name: 'Prisma', category: 'database' },

    { name: 'Jest', category: 'testing' },
    { name: 'Vitest', category: 'testing' },

    { name: 'Git', category: 'tooling' },
    { name: 'ESLint', category: 'tooling' },
    { name: 'Prettier', category: 'tooling' },
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: {
        profileId_category_name: {
          profileId: profile.id,
          category: skill.category,
          name: skill.name,
        },
      },
      update: {},
      create: {
        name: skill.name,
        category: skill.category,
        profileId: profile.id,
      },
    });
  }

  console.log('Seed completed successfully');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
