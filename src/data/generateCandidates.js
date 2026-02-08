import { faker } from '@faker-js/faker';

const skills = [
  'Team Leadership',
  'Crisis Management',
  'Sustainability Planning',
  'Waste Management',
  'Process Optimization',
  'Safety Compliance',
  'Budget Management',
  'Staff Training',
  'Quality Control',
  'Environmental Policy',
  'Recycling Technology',
  'Supply Chain',
  'Data Analysis',
  'Stakeholder Communication',
  'Operations Management'
];

const certifications = [
  'ISO 14001',
  'OSHA Safety',
  'Six Sigma',
  'Lean Manufacturing',
  'Waste Management Professional',
  'Environmental Management',
  'Project Management Professional',
  'Recycling Industry Operating Standard'
];

function generateCandidate(id) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const experience = faker.number.int({ min: 2, max: 25 });
  const candidateSkills = faker.helpers.arrayElements(skills, faker.number.int({ min: 4, max: 8 }));
  const candidateCerts = faker.helpers.arrayElements(certifications, faker.number.int({ min: 1, max: 4 }));
  
  return {
    id,
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    phone: faker.phone.number(),
    experience,
    location: `${faker.location.city()}, ${faker.location.state({ abbreviated: true })}`,
    skills: candidateSkills,
    certifications: candidateCerts,
    education: faker.helpers.arrayElement([
      'Bachelor in Environmental Science',
      'Bachelor in Industrial Engineering',
      'Bachelor in Business Management',
      'Master in Environmental Management',
      'Master in Operations Management',
      'MBA in Sustainability'
    ]),
    currentRole: faker.helpers.arrayElement([
      'Operations Supervisor',
      'Facility Manager',
      'Production Manager',
      'Environmental Coordinator',
      'Shift Supervisor',
      'Quality Manager'
    ]),
    // AI Evaluation Scores (generated randomly for demo)
    crisisManagement: parseFloat((faker.number.float({ min: 65, max: 98 })).toFixed(1)),
    sustainability: parseFloat((faker.number.float({ min: 60, max: 99 })).toFixed(1)),
    teamMotivation: parseFloat((faker.number.float({ min: 62, max: 97 })).toFixed(1))
  };
}

export function generateCandidates(count = 40) {
  const candidates = [];
  for (let i = 1; i <= count; i++) {
    candidates.push(generateCandidate(i));
  }
  
  // Calculate overall scores and rank
  candidates.forEach(candidate => {
    candidate.overallScore = parseFloat((
      (candidate.crisisManagement * 0.35 + 
       candidate.sustainability * 0.35 + 
       candidate.teamMotivation * 0.30)
    ).toFixed(1));
  });
  
  // Sort by overall score descending
  candidates.sort((a, b) => b.overallScore - a.overallScore);
  
  // Add rank
  candidates.forEach((candidate, index) => {
    candidate.rank = index + 1;
  });
  
  return candidates;
}

export const mockCandidates = generateCandidates(40);
