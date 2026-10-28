export interface Department {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  group: 'leadership' | 'operations' | 'creative' | 'experience';
  groupLabel: string;
  tagline: string;
  description: string;
  accent: string;
  pastel: string;
  borderColor: string;
  iconName: 'ShieldCheck' | 'Truck' | 'Camera' | 'HeartHandshake' | 'Sparkles' | 'Users';
  image: string;
  imageAlt: string;
  responsibilities: string[];
  operationalScope: string;
  venuesCovered: string[];
  contactRole: string;
}

export const DEPARTMENTS_DATA: Department[] = [
  {
    id: 'core-committee',
    slug: 'core-committee',
    name: 'Student Core Committee',
    shortName: 'Core Committee',
    group: 'leadership',
    groupLabel: 'Festival Leadership',
    tagline: 'Strategic Direction & Deanery Governance',
    description: 'The central student governing body representing the School of Sciences, orchestrating inter-deanery alignment, master scheduling, and cross-department synergy under the guidance of the Deanery Cultural Coordinators.',
    accent: '#7452F5',
    pastel: '#F0EBFF',
    borderColor: 'rgba(116, 82, 245, 0.25)',
    iconName: 'ShieldCheck',
    image: '/Assets/Core.webp',
    imageAlt: 'Blossoms School of Sciences Student Core Committee',
    responsibilities: [
      'Deanery and university-wide cultural council liaison',
      'Strategic timeline, budget, and master logistics governance',
      'Protocol enforcement and inter-department coordination',
      'Overall dispute mediation and official announcements'
    ],
    operationalScope: 'Central coordination across all 31 competitions and Phase I/II transitions.',
    venuesCovered: ['Council Room', 'Deanery Secretariat', 'Central Campus'],
    contactRole: 'Student Core Committee Heads & Deanery Coordinators'
  },
  {
    id: 'logistics-operations',
    slug: 'logistics',
    name: 'Logistics & Operations',
    shortName: 'Logistics',
    group: 'operations',
    groupLabel: 'Operations & Facilities',
    tagline: 'Infrastructure, Material Flow & Venue Readiness',
    description: 'Responsible for the physical execution of Blossoms SOS—managing venue allocations across academic blocks, audio-visual technical kits, staging props, furniture arrangements, and on-ground resource mobility.',
    accent: '#7041D8',
    pastel: '#F6F3FF',
    borderColor: 'rgba(112, 65, 216, 0.25)',
    iconName: 'Truck',
    image: '/Assets/cult3.webp',
    imageAlt: 'Logistics and on-ground event management at Blossoms',
    responsibilities: [
      'Classroom and auditorium setup across Block 2 and Block 4',
      'Stage equipment, acoustic equipment, and lighting management',
      'Props transport and competitive material procurement',
      'Event security coordination and crowd movement control'
    ],
    operationalScope: 'Complete infrastructure readiness for simultaneous multi-venue competitions.',
    venuesCovered: ['Room 615', 'Room 623', 'Sky View', 'Main Auditorium', 'KE Auditorium'],
    contactRole: 'Logistics Department Head & Operations Volunteers'
  },
  {
    id: 'media-creatives',
    slug: 'media',
    name: 'Media, Design & Creatives',
    shortName: 'Media & Design',
    group: 'creative',
    groupLabel: 'Media & Creative Expression',
    tagline: 'Visual Storytelling, Photography & Digital Archive',
    description: 'Capturing the raw energy, triumphs, and candid festival moments of Team Onyx. Handles professional stage photography, event video production, official social media broadcasts, and visual identity design.',
    accent: '#ED4D9B',
    pastel: '#FFF0F6',
    borderColor: 'rgba(237, 77, 155, 0.25)',
    iconName: 'Camera',
    image: '/Assets/IMG_0821.webp',
    imageAlt: 'Stage media and photography team capturing Blossoms live events',
    responsibilities: [
      'High-resolution photographic coverage of all 31 competitions',
      'Daily festival highlights and reel curation for @blossoms_sos',
      'Official poster design and digital screen assets',
      'Video archiving and School of Sciences cultural repository'
    ],
    operationalScope: 'Live coverage, digital publishing, and creative branding across digital channels.',
    venuesCovered: ['All Festival Arenas', 'Media Desk', 'Production Studio'],
    contactRole: 'Media Head, Design Leads & Creative Crew'
  },
  {
    id: 'hospitality-guest-relations',
    slug: 'hospitality',
    name: 'Hospitality & Guest Relations',
    shortName: 'Hospitality',
    group: 'experience',
    groupLabel: 'Guest & Judge Experience',
    tagline: 'Warmth, Dignitary Protocol & Welcome Protocol',
    description: 'Ensuring an exemplary experience for distinguished external adjudicators, university dignitaries, faculty coordinators, and visiting inter-deanery representatives from arrival to conclusion.',
    accent: '#19B8CC',
    pastel: '#E0F9FC',
    borderColor: 'rgba(25, 184, 204, 0.25)',
    iconName: 'HeartHandshake',
    image: '/Assets/cult.webp',
    imageAlt: 'Hospitality team welcoming festival attendees and participants',
    responsibilities: [
      'Reception, escorting, and assistance for professional event judges',
      'Hospitality lounge management and refreshment coordination',
      'Felicitation coordination, certificates, and memento presentation',
      'Participant helpdesk and campus wayfinding guidance'
    ],
    operationalScope: 'Adjudicator care, formal hospitality protocol, and guest assistance.',
    venuesCovered: ['Judges Lounge', 'VIP Reception Area', 'Auditorium Green Rooms'],
    contactRole: 'Hospitality Coordinator & Student Ushers'
  },
  {
    id: 'discipline-coordination',
    slug: 'discipline-coordination',
    name: 'Discipline Event Coordination',
    shortName: 'Discipline Leads',
    group: 'operations',
    groupLabel: 'Operations & Facilities',
    tagline: 'Event Rules, Timekeeping & Scoring Integrity',
    description: 'Dedicated student leads for the five foundational pillars (Art, Literary, Music, Theatre, and Dance) ensuring stringent adherence to official guidelines, score tabulations, and timing protocols.',
    accent: '#4385F4',
    pastel: '#EEF4FF',
    borderColor: 'rgba(67, 133, 244, 0.25)',
    iconName: 'Sparkles',
    image: '/Assets/cult1.webp',
    imageAlt: 'Discipline coordinators managing stage execution',
    responsibilities: [
      'Strict execution of official festival competition guidelines',
      'Participant verification, team order draw, and slot check-in',
      'Official timing, bell alerts, and penalty logging',
      'Tally sheet delivery to the central tabulation committee'
    ],
    operationalScope: 'Field execution across 9 Art, 8 Literary, 5 Music, 6 Theatre, and 3 Dance events.',
    venuesCovered: ['Block 2 Arenas', 'Block 4 Theatres', 'Open Air Quadrangle'],
    contactRole: 'Pillar Coordinators (Art, Literary, Music, Theatre, Dance)'
  },
  {
    id: 'registration-public-relations',
    slug: 'public-relations',
    name: 'Registration & Public Relations',
    shortName: 'Registration & PR',
    group: 'experience',
    groupLabel: 'Guest & Judge Experience',
    tagline: 'Outreach, Enrolment & Campus Engagement',
    description: 'Connecting over 7,000 School of Sciences students to competitive opportunities. Manages the official registration portal, departmental class communications, and participant query resolution.',
    accent: '#3AC99A',
    pastel: '#E8F7F0',
    borderColor: 'rgba(58, 201, 154, 0.25)',
    iconName: 'Users',
    image: '/Assets/sos.webp',
    imageAlt: 'School of Sciences student community celebrating Blossoms',
    responsibilities: [
      'Management of official online registration forms and slot allocations',
      'Direct liaison with department class representatives and tutors',
      'Live helpdesk support during the prelims window',
      'Dissemination of schedule updates and venue announcements'
    ],
    operationalScope: 'Campus outreach, student onboarding, and registration records management.',
    venuesCovered: ['Central Registration Kiosk', 'Online Helpdesk', 'Deanery Office'],
    contactRole: 'Registration Desk Leads & PR Representatives'
  }
];

export const DEPARTMENT_GROUPS = [
  { id: 'all', label: 'All Departments' },
  { id: 'leadership', label: 'Festival Leadership' },
  { id: 'operations', label: 'Operations & Facilities' },
  { id: 'creative', label: 'Media & Creative' },
  { id: 'experience', label: 'Guest & Student Experience' },
] as const;
