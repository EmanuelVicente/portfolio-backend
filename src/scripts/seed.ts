import 'dotenv/config';

import { prisma } from '../config/prisma.js';

async function main() {
  const profileData = {
    name: 'Emanuel Vicente',
    role: 'Software Engineer',
    summary:
      'Software Engineer with more than 8 years of experience building web and mobile applications. Specialized in React, React Native, TypeScript and Node.js.',
  };

  const profile = await prisma.profile.upsert({
    where: {
      name: profileData.name,
    },
    update: {
      role: profileData.role,
      summary: profileData.summary,
    },
    create: profileData,
  });

  await prisma.experience.deleteMany({ where: { profileId: profile.id } });
  await prisma.project.deleteMany({ where: { profileId: profile.id } });
  await prisma.education.deleteMany({ where: { profileId: profile.id } });
  await prisma.skill.deleteMany({ where: { profileId: profile.id } });

  // ----------------------------------------
  // Experiences
  // ----------------------------------------

  const experiences = [
    {
      company: 'SAV3',
      role: 'Fullstack Developer',
      description: 'Worked on B2B dashboards and client administration tools.',
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'TanStack'],
      highlights: ['Worked on B2B dashboards.', 'Worked on client administration and control tools.'],
    },
    {
      company: 'SimpleState',
      role: 'Fullstack Developer',
      description:
        'Worked on a real-estate investment platform where users could invest money and receive returns. Improved the user experience and investment flow, and worked on application performance improvements.',
      technologies: ['React', 'TypeScript'],
      highlights: [
        'Improved the user experience of the investment flow.',
        'Worked on application performance improvements.',
        'Contributed to the development of a real estate investment platform, enabling users to invest in property assets efficiently.',
      ],
    },
    {
      company: 'Distillery',
      role: 'Frontend Developer',
      description:
        'Worked on performance optimization and new features for a mobile application used by store representatives to take orders. The app ran offline, so data had to be synchronized before order-taking could begin.',
      technologies: ['React Native', 'TypeScript', 'Next.js'],
      highlights: [
        'Improved application performance.',
        'Built and maintained offline support, including data synchronization before order-taking.',
        'Shipped new features for the order-taking workflow.',
      ],
    },
    {
      company: 'Xoor',
      role: 'Frontend Developer',
      description:
        'Built features for multiple client applications, including a social network, a reusable B2B app template for different business clients, and a time-tracking app where users could start and stop work sessions with a single tap.',
      technologies: ['React Native', 'React.js', 'TypeScript', 'Flutter'],
      highlights: [
        'Added features across client applications.',
        'Migrated an application from React Native to Flutter.',
      ],
    },
    {
      company: 'Youpy',
      role: 'Fullstack Developer',
      description: 'Worked on a real-estate application where users could buy, sell, and rent properties.',
      technologies: ['React Native', 'React.js', 'TypeScript'],
      highlights: [
        'Delivered end-to-end features across the application.',
        'Improved the visual design of the application.',
      ],
    },
    {
      company: 'Estrategias Diferenciadas',
      role: 'Fullstack Developer',
      description: 'Worked on applications for insurance company clients.',
      technologies: ['Javascript', 'PL/SQL', 'Java'],
      highlights: [
        'Delivered end-to-end features across applications.',
        'Improved database performance.',
        'Streamlined development by creating reusable, efficient components.',
      ],
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
      name: 'Offline Order Taking App',
      type: 'Mobile',
      description:
        'A mobile application for sales representatives visiting small local stores. Representatives could create orders even without an internet connection. Orders synchronized with a remote server once connectivity was restored.',
      technologies: ['React Native', 'TypeScript'],
      highlights: [
        'Supported order creation while offline.',
        'Synchronized data with a remote server when connectivity was restored.',
        'Focused on a reliable field workflow for store visits with limited connectivity.',
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
    { name: 'React', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'React Native', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },

    { name: 'Node.js', category: 'Backend' },
    { name: 'Express', category: 'Backend' },

    { name: 'REST', category: 'API' },
    { name: 'GraphQL', category: 'API' },

    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Prisma', category: 'Database' },

    { name: 'LLM', category: 'IA' },

    { name: 'Jest', category: 'Testing' },
    { name: 'Vitest', category: 'Testing' },

    { name: 'Git', category: 'Tooling' },
    { name: 'ESLint', category: 'Tooling' },
    { name: 'Prettier', category: 'Tooling' },
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
