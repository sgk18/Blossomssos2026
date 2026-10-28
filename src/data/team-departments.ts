export interface BlossomTeamMember {
  id: string;
  name: string;
  role: string;
  committee: string;
  classCode: string; // e.g. '4BScCM', '5BCA', etc.
  category: 'faculty' | 'student';
  departmentKey: 'faculty' | 'core' | 'logistics' | 'hospitality' | 'media' | 'discipline' | 'pr';
  departmentName: string;
  image?: string;
  initials?: string;
}

export const BLOSSOMS_TEAM_MEMBERS: BlossomTeamMember[] = [
  // ── Faculty Advisors ──
  {
    id: 'fac-1',
    name: 'Dr. S. Kavitha',
    role: 'Deanery Cultural Coordinator',
    committee: 'Faculty Advisory',
    classCode: 'Faculty Advisor',
    category: 'faculty',
    departmentKey: 'faculty',
    departmentName: 'Deanery of Sciences',
    initials: 'SK',
  },
  {
    id: 'fac-2',
    name: 'Dr. Rajesh Sharma',
    role: 'Staff Cultural Advisory Lead',
    committee: 'Faculty Advisory',
    classCode: 'Faculty Advisor',
    category: 'faculty',
    departmentKey: 'faculty',
    departmentName: 'Computer Science',
    initials: 'RS',
  },
  {
    id: 'fac-3',
    name: 'Prof. Priya Menon',
    role: 'Stage Protocol Faculty Mentor',
    committee: 'Faculty Advisory',
    classCode: 'Faculty Advisor',
    category: 'faculty',
    departmentKey: 'faculty',
    departmentName: 'Physical Sciences',
    initials: 'PM',
  },
  {
    id: 'fac-4',
    name: 'Dr. Anand Kumar',
    role: 'Scoring & Juries Faculty Mentor',
    committee: 'Faculty Advisory',
    classCode: 'Faculty Advisor',
    category: 'faculty',
    departmentKey: 'faculty',
    departmentName: 'Mathematics & Statistics',
    initials: 'AK',
  },

  // ── Core Team ──
  {
    id: 'core-1',
    name: 'Rohan Joseph',
    role: 'Chief Student Convener',
    committee: 'Core Committee',
    classCode: '6BScPCM',
    category: 'student',
    departmentKey: 'core',
    departmentName: 'Core Committee',
    initials: 'RJ',
  },
  {
    id: 'core-2',
    name: 'Ananya Sharma',
    role: 'Student General Secretary',
    committee: 'Core Committee',
    classCode: '5BCA',
    category: 'student',
    departmentKey: 'core',
    departmentName: 'Core Committee',
    initials: 'AS',
  },
  {
    id: 'core-3',
    name: 'Kevin Mathew',
    role: 'Operations Vice Convener',
    committee: 'Core Committee',
    classCode: '4BScCM',
    category: 'student',
    departmentKey: 'core',
    departmentName: 'Core Committee',
    initials: 'KM',
  },
  {
    id: 'core-4',
    name: 'Sneha Roy',
    role: 'Inter-Deanery Liaison Lead',
    committee: 'Core Committee',
    classCode: '4MCA',
    category: 'student',
    departmentKey: 'core',
    departmentName: 'Core Committee',
    initials: 'SR',
  },

  // ── Logistics Team ──
  {
    id: 'log-1',
    name: 'Aditya Varma',
    role: 'Logistics Department Head',
    committee: 'Logistics Team',
    classCode: '4BScCM',
    category: 'student',
    departmentKey: 'logistics',
    departmentName: 'Logistics Team',
    initials: 'AV',
  },
  {
    id: 'log-2',
    name: 'Harish Nair',
    role: 'Audio-Visual Stage In-charge',
    committee: 'Logistics Team',
    classCode: '5BCA',
    category: 'student',
    departmentKey: 'logistics',
    departmentName: 'Logistics Team',
    initials: 'HN',
  },
  {
    id: 'log-3',
    name: 'Tanvi Jain',
    role: 'Staging & Venue Coordinator',
    committee: 'Logistics Team',
    classCode: '6BScPCM',
    category: 'student',
    departmentKey: 'logistics',
    departmentName: 'Logistics Team',
    initials: 'TJ',
  },
  {
    id: 'log-4',
    name: 'Nikhil Rao',
    role: 'Material & Props Manager',
    committee: 'Logistics Team',
    classCode: '4BScDS',
    category: 'student',
    departmentKey: 'logistics',
    departmentName: 'Logistics Team',
    initials: 'NR',
  },

  // ── Hospitality Team ──
  {
    id: 'hosp-1',
    name: 'Riya Sen',
    role: 'Hospitality Department Head',
    committee: 'Hospitality Team',
    classCode: '5BCA',
    category: 'student',
    departmentKey: 'hospitality',
    departmentName: 'Hospitality Team',
    initials: 'RS',
  },
  {
    id: 'hosp-2',
    name: 'Varun Mehta',
    role: 'Judges & VIP Receptionist',
    committee: 'Hospitality Team',
    classCode: '4BScCM',
    category: 'student',
    departmentKey: 'hospitality',
    departmentName: 'Hospitality Team',
    initials: 'VM',
  },
  {
    id: 'hosp-3',
    name: 'Meera Krishnan',
    role: 'Adjudicator Lounge Desk',
    committee: 'Hospitality Team',
    classCode: '2MScCS',
    category: 'student',
    departmentKey: 'hospitality',
    departmentName: 'Hospitality Team',
    initials: 'MK',
  },
  {
    id: 'hosp-4',
    name: 'Arjun Das',
    role: 'Dais & Felicitation Usher',
    committee: 'Hospitality Team',
    classCode: '6BScEMS',
    category: 'student',
    departmentKey: 'hospitality',
    departmentName: 'Hospitality Team',
    initials: 'AD',
  },

  // ── Media & Creatives Team ──
  {
    id: 'med-1',
    name: 'Siddharth Nair',
    role: 'Media & Coverage Head',
    committee: 'Media Team',
    classCode: '5BCA',
    category: 'student',
    departmentKey: 'media',
    departmentName: 'Media Team',
    initials: 'SN',
  },
  {
    id: 'med-2',
    name: 'Diya Patel',
    role: 'Chief Stage Photographer',
    committee: 'Media Team',
    classCode: '4BScCM',
    category: 'student',
    departmentKey: 'media',
    departmentName: 'Media Team',
    initials: 'DP',
  },
  {
    id: 'med-3',
    name: 'Karthik Raman',
    role: 'Reels & Social Media Lead',
    committee: 'Media Team',
    classCode: '4BScDS',
    category: 'student',
    departmentKey: 'media',
    departmentName: 'Media Team',
    initials: 'KR',
  },
  {
    id: 'med-4',
    name: 'Pooja Hegde',
    role: 'Festival Brand Designer',
    committee: 'Media Team',
    classCode: '4MCA',
    category: 'student',
    departmentKey: 'media',
    departmentName: 'Media Team',
    initials: 'PH',
  },

  // ── Discipline Coordination Team ──
  {
    id: 'disc-1',
    name: 'Farhan Khan',
    role: 'Dance & Theatre Pillar Lead',
    committee: 'Discipline Team',
    classCode: '6BScPCM',
    category: 'student',
    departmentKey: 'discipline',
    departmentName: 'Discipline Team',
    initials: 'FK',
  },
  {
    id: 'disc-2',
    name: 'Neha Reddy',
    role: 'Music & Acoustic Pillar Lead',
    committee: 'Discipline Team',
    classCode: '4BScCM',
    category: 'student',
    departmentKey: 'discipline',
    departmentName: 'Discipline Team',
    initials: 'NR',
  },
  {
    id: 'disc-3',
    name: 'Rahul Deshmukh',
    role: 'Literary & Debate Pillar Lead',
    committee: 'Discipline Team',
    classCode: '5BCA',
    category: 'student',
    departmentKey: 'discipline',
    departmentName: 'Discipline Team',
    initials: 'RD',
  },
  {
    id: 'disc-4',
    name: 'Shreya Iyer',
    role: 'Fine Arts Arenas Manager',
    committee: 'Discipline Team',
    classCode: '4BScDS',
    category: 'student',
    departmentKey: 'discipline',
    departmentName: 'Discipline Team',
    initials: 'SI',
  },

  // ── Registration & PR Team ──
  {
    id: 'pr-1',
    name: 'Manav Gupta',
    role: 'Central Enrolment Head',
    committee: 'Registration Team',
    classCode: '4BScCM',
    category: 'student',
    departmentKey: 'pr',
    departmentName: 'Registration Team',
    initials: 'MG',
  },
  {
    id: 'pr-2',
    name: 'Aishwarya Pillai',
    role: 'Helpdesk & Query Manager',
    committee: 'Registration Team',
    classCode: '5BCA',
    category: 'student',
    departmentKey: 'pr',
    departmentName: 'Registration Team',
    initials: 'AP',
  },
  {
    id: 'pr-3',
    name: 'Gautham Menon',
    role: 'Class Reps Outreach Lead',
    committee: 'Registration Team',
    classCode: '6BScPCM',
    category: 'student',
    departmentKey: 'pr',
    departmentName: 'Registration Team',
    initials: 'GM',
  },
  {
    id: 'pr-4',
    name: 'Bhavana S.',
    role: 'Student Enrolment Desk',
    committee: 'Registration Team',
    classCode: '2MScCS',
    category: 'student',
    departmentKey: 'pr',
    departmentName: 'Registration Team',
    initials: 'BS',
  },
];

export interface CoreLeadershipRole {
  id: string;
  roleTitle: string;
  designation: string;
  office: string;
  scope: string;
  mandate: string;
  accent: string;
  pastel: string;
  borderColor: string;
  image: string;
}

export const CORE_LEADERSHIP: CoreLeadershipRole[] = [
  {
    id: 'faculty-coordinator',
    roleTitle: 'Deanery Cultural Coordinator',
    designation: 'Faculty Advisory Directorate',
    office: 'Deanery of Science, CHRIST (Deemed to be University)',
    scope: 'Institutional governance, protocol sanctioning, inter-deanery alignment & faculty council oversight.',
    mandate: 'Preserves academic integrity, approves competition charters, and mentors student committee leads.',
    accent: '#5C4B99',
    pastel: '#F0EBFF',
    borderColor: 'rgba(92, 75, 153, 0.25)',
  },
  {
    id: 'student-president',
    roleTitle: 'Student Core Committee Convener',
    designation: 'President & Chief Student Coordinator',
    office: 'Student Cultural Council · Team Onyx',
    scope: 'Master operations timeline, deanery delegation leadership, and executive decision-making across all 31 events.',
    mandate: 'Leads student steering meetings, coordinates crisis management, and synchronises all 6 departmental heads.',
    accent: '#7452F5',
    pastel: '#F6F3FF',
    borderColor: 'rgba(116, 82, 245, 0.25)',
  },
  {
    id: 'general-secretary',
    roleTitle: 'Student General Secretary',
    designation: 'Executive Protocols & Records In-charge',
    office: 'Central Secretariat · School of Sciences',
    scope: 'Administrative correspondence, university notifications, documentation archival, and council liaison.',
    mandate: 'Maintains official tabulations, registers official appeals, and publishes authorized stage communiqués.',
    accent: '#ED4D9B',
    pastel: '#FFF0F6',
    borderColor: 'rgba(237, 77, 155, 0.25)',
  },
  {
    id: 'operations-vp',
    roleTitle: 'Vice President — Operations & Logistics',
    designation: 'Infrastructure & Venues Director',
    office: 'Campus Facilities Operations Desk',
    scope: 'Classroom & auditorium stage logistics across Block 2, Block 4, Sky View and central campus theatres.',
    mandate: 'Oversees 50+ on-ground student volunteers, AV gear mobilization, prop security, and venue clearances.',
    accent: '#7041D8',
    pastel: '#F6F3FF',
    borderColor: 'rgba(112, 65, 216, 0.25)',
  },
  {
    id: 'creative-lead',
    roleTitle: 'Creative & Media Broadcast Lead',
    designation: 'Visual Identity & Archival Head',
    office: 'Digital Media Studio & Press Desk',
    scope: 'Live event photography, cinematic festival highlights, official social broadcasts, and digital branding.',
    mandate: 'Directs stage camera crews, daily reel releases, visual graphics, and digital memory archive.',
    accent: '#19B8CC',
    pastel: '#E0F9FC',
    borderColor: 'rgba(25, 184, 204, 0.25)',
  },
  {
    id: 'pillars-coordinator',
    roleTitle: 'Five Pillars Tabulation & Rules Lead',
    designation: 'Academic Competition Integrity Head',
    office: 'Scoring Secretariat & Juries Liaison',
    scope: 'Standardization and rulebook fidelity across Art, Literary, Music, Theatre, and Dance arenas.',
    mandate: 'Facilitates judge evaluation rubrics, score reconciliations, timekeeping bells, and trophy tallies.',
    accent: '#4385F4',
    pastel: '#EEF4FF',
    borderColor: 'rgba(67, 133, 244, 0.25)',
  },
];

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  departmentId: string;
  departmentName: string;
  bio: string;
  image?: string;
  contactEmail: string;
}

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
  members: TeamMember[];
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
    imageAlt: 'Blossoms School of Sciences Student Core Committee',
    responsibilities: [
      'Deanery and university-wide cultural council liaison',
      'Strategic timeline, budget, and master logistics governance',
      'Protocol enforcement and inter-department coordination',
      'Overall dispute mediation and official announcements'
    ],
    operationalScope: 'Central coordination across all 31 competitions and Phase I/II transitions.',
    venuesCovered: ['Council Room', 'Deanery Secretariat', 'Central Campus'],
    contactRole: 'Student Core Committee Heads & Deanery Coordinators',
    members: [
      {
        id: 'cc-1',
        name: 'Deanery Cultural Committee Convener',
        role: 'Faculty Cultural Advisor',
        departmentId: 'core-committee',
        departmentName: 'Student Core Committee',
        bio: 'Faculty mentor ensuring smooth administrative compliance, festival safety, and academic coordination.',
        contactEmail: 'blossoms.sos@christuniversity.in'
      },
      {
        id: 'cc-2',
        name: 'Student General Secretary (Science)',
        role: 'Chief Student Coordinator',
        departmentId: 'core-committee',
        departmentName: 'Student Core Committee',
        bio: 'Central point of contact for festival strategy, inter-department scheduling, and general student queries.',
        contactEmail: 'blossoms.sos@christuniversity.in'
      },
      {
        id: 'cc-3',
        name: 'Deanery Student Representative',
        role: 'Inter-Deanery Liaison',
        departmentId: 'core-committee',
        departmentName: 'Student Core Committee',
        bio: 'Represents the School of Sciences in university-level cultural council briefings and rule deliberations.',
        contactEmail: 'blossoms.sos@christuniversity.in'
      }
    ]
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
    imageAlt: 'Logistics and on-ground event management at Blossoms',
    responsibilities: [
      'Classroom and auditorium setup across Block 2 and Block 4',
      'Stage equipment, acoustic equipment, and lighting management',
      'Props transport and competitive material procurement',
      'Event security coordination and crowd movement control'
    ],
    operationalScope: 'Complete infrastructure readiness for simultaneous multi-venue competitions.',
    venuesCovered: ['Room 615', 'Room 623', 'Sky View', 'Main Auditorium', 'KE Auditorium'],
    contactRole: 'Logistics Department Head & Operations Volunteers',
    members: [
      {
        id: 'log-1',
        name: 'Head of Operations & Logistics',
        role: 'Operations Director',
        departmentId: 'logistics-operations',
        departmentName: 'Logistics & Operations',
        bio: 'Oversees venue bookings, stage soundchecks, and physical material movements throughout fest days.',
        contactEmail: 'blossoms.sos@christuniversity.in'
      },
      {
        id: 'log-2',
        name: 'Audio-Visual & Staging Lead',
        role: 'Technical Stage Manager',
        departmentId: 'logistics-operations',
        departmentName: 'Logistics & Operations',
        bio: 'Coordinates live stage mic setups, projector screenings, and acoustic sound systems in auditoriums.',
        contactEmail: 'blossoms.sos@christuniversity.in'
      },
      {
        id: 'log-3',
        name: 'Crowd Flow & Security Coordinator',
        role: 'Safety & Venue Marshal',
        departmentId: 'logistics-operations',
        departmentName: 'Logistics & Operations',
        bio: 'Ensures structured audience seating, corridor clearance, and crowd control during high-traffic events.',
        contactEmail: 'blossoms.sos@christuniversity.in'
      }
    ]
  },
  {
    id: 'media-creatives',
    slug: 'media',
    name: 'Media, Design & Creatives',
    shortName: 'Media & Design',
    group: 'creative',
    groupLabel: 'Media & Creative',
    tagline: 'Visual Storytelling, Photography & Digital Archive',
    description: 'Capturing the raw energy, triumphs, and candid festival moments of Team Onyx. Handles professional stage photography, event video production, official social media broadcasts, and visual identity design.',
    accent: '#ED4D9B',
    pastel: '#FFF0F6',
    borderColor: 'rgba(237, 77, 155, 0.25)',
    iconName: 'Camera',
    imageAlt: 'Stage media and photography team capturing Blossoms live events',
    responsibilities: [
      'High-resolution photographic coverage of all 31 competitions',
      'Daily festival highlights and reel curation for @blossoms_sos',
      'Official poster design and digital screen assets',
      'Video archiving and School of Sciences cultural repository'
    ],
    operationalScope: 'Live coverage, digital publishing, and creative branding across digital channels.',
    venuesCovered: ['All Festival Arenas', 'Media Desk', 'Production Studio'],
    contactRole: 'Media Head, Design Leads & Creative Crew',
    members: [
      {
        id: 'med-1',
        name: 'Media & Communications Head',
        role: 'Editorial & Broadcast Lead',
        departmentId: 'media-creatives',
        departmentName: 'Media, Design & Creatives',
        bio: 'Directs the festival editorial tone, daily highlights publishing, and official social media coverage.',
        contactEmail: 'blossoms.sos@christuniversity.in'
      },
      {
        id: 'med-2',
        name: 'Chief Stage Photographer',
        role: 'Photo Archive Lead',
        departmentId: 'media-creatives',
        departmentName: 'Media, Design & Creatives',
        bio: 'Manages multi-photographer rotation across dance, theatre, music, and off-stage artistic showdowns.',
        contactEmail: 'blossoms.sos@christuniversity.in'
      },
      {
        id: 'med-3',
        name: 'Lead Visual Identity Designer',
        role: 'Creative & Brand In-charge',
        departmentId: 'media-creatives',
        departmentName: 'Media, Design & Creatives',
        bio: 'Designed the official handouts, venue banners, category badges, and digital visual assets.',
        contactEmail: 'blossoms.sos@christuniversity.in'
      }
    ]
  },
  {
    id: 'hospitality-guest-relations',
    slug: 'hospitality',
    name: 'Hospitality & Guest Relations',
    shortName: 'Hospitality',
    group: 'experience',
    groupLabel: 'Guest & Student Experience',
    tagline: 'Warmth, Dignitary Protocol & Welcome Protocol',
    description: 'Ensuring an exemplary experience for distinguished external adjudicators, university dignitaries, faculty coordinators, and visiting inter-deanery representatives from arrival to conclusion.',
    accent: '#19B8CC',
    pastel: '#E0F9FC',
    borderColor: 'rgba(25, 184, 204, 0.25)',
    iconName: 'HeartHandshake',
    imageAlt: 'Hospitality team welcoming festival attendees and participants',
    responsibilities: [
      'Reception, escorting, and assistance for professional event judges',
      'Hospitality lounge management and refreshment coordination',
      'Felicitation coordination, certificates, and memento presentation',
      'Participant helpdesk and campus wayfinding guidance'
    ],
    operationalScope: 'Adjudicator care, formal hospitality protocol, and guest assistance.',
    venuesCovered: ['Judges Lounge', 'VIP Reception Area', 'Auditorium Green Rooms'],
    contactRole: 'Hospitality Coordinator & Student Ushers',
    members: [
      {
        id: 'hosp-1',
        name: 'Hospitality Protocol In-charge',
        role: 'Guest Relations Head',
        departmentId: 'hospitality-guest-relations',
        departmentName: 'Hospitality & Guest Relations',
        bio: 'Coordinates dignitary protocol, external judges arrival logistics, and green-room arrangements.',
        contactEmail: 'blossoms.sos@christuniversity.in'
      },
      {
        id: 'hosp-2',
        name: 'Judges Liaison Lead',
        role: 'Adjudicator Desk Coordinator',
        departmentId: 'hospitality-guest-relations',
        departmentName: 'Hospitality & Guest Relations',
        bio: 'Escorts competition judges to evaluation arenas and oversees the distribution of scoring portfolios.',
        contactEmail: 'blossoms.sos@christuniversity.in'
      },
      {
        id: 'hosp-3',
        name: 'Felicitation & Ceremony Coordinator',
        role: 'Awards & Memento In-charge',
        departmentId: 'hospitality-guest-relations',
        departmentName: 'Hospitality & Guest Relations',
        bio: 'Manages certificates of merit, jury tokens of gratitude, and dais protocol during award sessions.',
        contactEmail: 'blossoms.sos@christuniversity.in'
      }
    ]
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
    imageAlt: 'Discipline coordinators managing stage execution',
    responsibilities: [
      'Strict execution of official festival competition guidelines',
      'Participant verification, team order draw, and slot check-in',
      'Official timing, bell alerts, and penalty logging',
      'Tally sheet delivery to the central tabulation committee'
    ],
    operationalScope: 'Field execution across 9 Art, 8 Literary, 5 Music, 6 Theatre, and 3 Dance events.',
    venuesCovered: ['Block 2 Arenas', 'Block 4 Theatres', 'Open Air Quadrangle'],
    contactRole: 'Pillar Coordinators (Art, Literary, Music, Theatre, Dance)',
    members: [
      {
        id: 'disc-1',
        name: 'Dance & Theatre Pillar Coordinator',
        role: 'Stage Events In-charge',
        departmentId: 'discipline-coordination',
        departmentName: 'Discipline Event Coordination',
        bio: 'Coordinates stage order, backstage entries, sound-track handovers, and performance timekeeping.',
        contactEmail: 'blossoms.sos@christuniversity.in'
      },
      {
        id: 'disc-2',
        name: 'Music & Literary Pillar Coordinator',
        role: 'Acoustics & Debate In-charge',
        departmentId: 'discipline-coordination',
        departmentName: 'Discipline Event Coordination',
        bio: 'Manages acoustic band tuning checks, JAM/Extempore buzzer rounds, and speech timekeeping bells.',
        contactEmail: 'blossoms.sos@christuniversity.in'
      },
      {
        id: 'disc-3',
        name: 'Art & Fine Arts Coordinator',
        role: 'Creative Arenas Manager',
        departmentId: 'discipline-coordination',
        departmentName: 'Discipline Event Coordination',
        bio: 'Oversees drawing sheet stamping, rangoli arena allocations, and art submission timing verification.',
        contactEmail: 'blossoms.sos@christuniversity.in'
      }
    ]
  },
  {
    id: 'registration-public-relations',
    slug: 'public-relations',
    name: 'Registration & Public Relations',
    shortName: 'Registration & PR',
    group: 'experience',
    groupLabel: 'Guest & Student Experience',
    tagline: 'Outreach, Enrolment & Campus Engagement',
    description: 'Connecting over 7,000 School of Sciences students to competitive opportunities. Manages the official registration portal, departmental class communications, and participant query resolution.',
    accent: '#3AC99A',
    pastel: '#E8F7F0',
    borderColor: 'rgba(58, 201, 154, 0.25)',
    iconName: 'Users',
    imageAlt: 'School of Sciences student community celebrating Blossoms',
    responsibilities: [
      'Management of official online registration forms and slot allocations',
      'Direct liaison with department class representatives and tutors',
      'Live helpdesk support during the prelims window',
      'Dissemination of schedule updates and venue announcements'
    ],
    operationalScope: 'Campus outreach, student onboarding, and registration records management.',
    venuesCovered: ['Central Registration Kiosk', 'Online Helpdesk', 'Deanery Office'],
    contactRole: 'Registration Desk Leads & PR Representatives',
    members: [
      {
        id: 'pr-1',
        name: 'Central Enrolment Desk Head',
        role: 'Registration Lead',
        departmentId: 'registration-public-relations',
        departmentName: 'Registration & Public Relations',
        bio: 'Oversees participant roster generation, Google form submissions, and slot confirmation slips.',
        contactEmail: 'blossoms.sos@christuniversity.in'
      },
      {
        id: 'pr-2',
        name: 'Department Outreach & CR Liaison',
        role: 'Student Relations In-charge',
        departmentId: 'registration-public-relations',
        departmentName: 'Registration & Public Relations',
        bio: 'Connects with class representatives across mathematics, physics, chemistry, and computing departments.',
        contactEmail: 'blossoms.sos@christuniversity.in'
      },
      {
        id: 'pr-3',
        name: 'Student Helpdesk & Query Manager',
        role: 'Inquiry & Support Lead',
        departmentId: 'registration-public-relations',
        departmentName: 'Registration & Public Relations',
        bio: 'Answers participant queries regarding rule interpretations, team replacements, and slot schedules.',
        contactEmail: 'blossoms.sos@christuniversity.in'
      }
    ]
  }
];

export const DEPARTMENT_GROUPS = [
  { id: 'all', label: 'All Departments' },
  { id: 'leadership', label: 'Festival Leadership' },
  { id: 'operations', label: 'Operations & Facilities' },
  { id: 'creative', label: 'Media & Creative' },
  { id: 'experience', label: 'Guest & Student Experience' },
] as const;

