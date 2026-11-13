import { profile } from '../data/profile';

const current = profile.experience[0];

// One chapter per page section. `id` must match the section's DOM id.
// `hold` = seconds the story player spends on the chapter (it pans slowly through tall sections).
// `caption` = the subtitle shown while the story plays. All text comes from profile.js.
export const chapters = [
  {
    id: 'home',
    label: 'Intro',
    hold: 7,
    caption: `${profile.name}. ${profile.role}, ${profile.roleNote}.`,
  },
  {
    id: 'about',
    label: 'About',
    hold: 10,
    caption: '2+ years turning AI models into real, running products.',
  },
  {
    id: 'experience',
    label: 'Journey',
    hold: 12,
    caption: `Today at ${current.company}. Before that, computer vision and edge AI at PrimeMover Solutions.`,
  },
  {
    id: 'skills',
    label: 'Toolkit',
    hold: 9,
    caption: 'Computer vision, edge AI, generative AI, and the tools that ship them.',
  },
  {
    id: 'projects',
    label: 'Work',
    hold: 20,
    caption: `${profile.projects.length} projects, from Raspberry Pi edge devices to LLM agents.`,
  },
  {
    id: 'achievements',
    label: 'Recognition',
    hold: 9,
    caption: 'Published research with Springer, plus certifications and awards.',
  },
  {
    id: 'contact',
    label: 'Contact',
    hold: 8,
    caption: `Let's build something together. ${profile.social.email}`,
  },
];
