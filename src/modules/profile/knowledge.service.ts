import { AppError } from '../../errors/AppError.js';

import { findProfile } from './profile.repository.js';

export async function getProfileKnowledge(): Promise<string> {
  console.log('PROFILE_ID:', process.env.PROFILE_ID);
  console.log('DATABASE_HOST:', process.env.DATABASE_URL?.match(/@([^/]+)/)?.[1]);
  console.log('GEMINI_KEY_EXISTS:', Boolean(process.env.GEMINI_API_KEY));

  const profileId = Number(process.env.PROFILE_ID);

  if (!Number.isInteger(profileId) || profileId <= 0) {
    throw new Error('PROFILE_ID environment variable is not configured correctly');
  }

  const profile = await findProfile(profileId);

  if (!profile) {
    throw new AppError('Profile not found', 404);
  }

  const experienceKnowledge = profile.experiences
    .map(
      (experience) => `
Company: ${experience.company}
Role: ${experience.role}
Description: ${experience.description}
Technologies: ${
        experience.technologies.length > 0
          ? experience.technologies.map((technology) => technology.name).join(', ')
          : 'Not specified'
      }
Highlights:
${
  experience.highlights.length > 0
    ? experience.highlights.map((highlight) => `- ${highlight.text}`).join('\n')
    : '- Not specified'
}
`
    )
    .join('\n');

  const educationKnowledge = profile.educations
    .map(
      (education) => `
Institution: ${education.institution}
Degree: ${education.degree}
`
    )
    .join('\n');

  const projectKnowledge = profile.projects
    .map(
      (project) => `
Project: ${project.name}
Type: ${project.type}
Description: ${project.description}
Technologies: ${
        project.technologies.length > 0
          ? project.technologies.map((technology) => technology.name).join(', ')
          : 'Not specified'
      }
Highlights:
${
  project.highlights.length > 0
    ? project.highlights.map((highlight) => `- ${highlight.text}`).join('\n')
    : '- Not specified'
}
`
    )
    .join('\n');

  const skillKnowledge = profile.skills.map((skill) => `- ${skill.name} (${skill.category})`).join('\n');

  return `
PROFILE

Name:
${profile.name}

Role:
${profile.role}

Summary:
${profile.summary}

SKILLS

${skillKnowledge}

EXPERIENCE

${experienceKnowledge}

EDUCATION

${educationKnowledge}

PROJECTS

${projectKnowledge}
`;
}
