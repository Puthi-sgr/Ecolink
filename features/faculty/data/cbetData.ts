import { CBETPackage, Trip, ProjectStatus } from '../../../shared/types';

export const CBET_PACKAGES: CBETPackage[] = [
  {
    id: 'CBET-001',
    name: 'Prek Toal Bird Sanctuary',
    location: 'Tonle Sap Biosphere',
    cbetSite: 'Prek Toal Community',
    managingOrg: 'Ministry of Environment & Local Community',
    ecoLinkRole: 'Facilitator',
    description: 'Immersive water-bird observation and floating village community study. Students will engage with the unique hydrology of the Tonle Sap.',
    activities: ['Bird Watching', 'Boat Tour', 'Water Quality Testing', 'Weaving Workshop'],
    imageKey: 'cbet.package.veunsaisiampang.hero',
    
    // Coordinates for Map
    coordinates: {
      lat: 13.2374,
      lng: 103.6524
    },

    duration: '1 Day',
    scheduleOutline: [
      '07:00 - Departure from Campus',
      '09:00 - Boat transfer to Sanctuary',
      '10:00 - Guided Bird Watching',
      '12:00 - Community Lunch',
      '13:30 - Water Testing Activity',
      '15:00 - Return Boat'
    ],
    suitableTiming: 'Dry Season (Dec - Apr) for best bird viewing',
    
    capacityBands: [
      { min: 10, max: 20, pricePerStudent: 45 },
      { min: 21, max: 30, pricePerStudent: 40 }
    ],
    includes: ['Boat transfers', 'Entrance fees', 'Community Lunch', 'Local Guide', 'Life jackets'],
    excludes: ['Travel Insurance', 'Personal snacks'],
    depositDetails: { percentage: 50, deadlineDays: 14 },
    
    learningOutcomes: [
      'Identify 5 key wetland bird species',
      'Understand the flood pulse concept',
      'Analyze threats to biodiversity'
    ],
    
    safetyInfo: {
      activityLevel: 'Low',
      riskNotes: 'Boat travel requires life jackets at all times. Sun exposure.',
      facilities: ['Local Toilets', 'Basic First Aid at Station'],
      guideRatio: '1:15',
      firstAid: true
    },
    
    bookingConditions: {
      minLeadTimeDays: 21,
      minGroupSize: 10,
      maxGroupSize: 30,
      cancellationPolicy: '50% refund if cancelled 7 days prior.',
      transportNotes: 'Requires minibus + boat coordination.'
    }
  },
  {
    id: 'CBET-002',
    name: 'Chiper Eco-Lodge',
    location: 'Cardamom Mountains',
    cbetSite: 'Chiper Commune',
    managingOrg: 'Wildlife Alliance',
    ecoLinkRole: 'Partner',
    description: 'High-altitude rainforest trekking and indigenous flora classification. Experience the heart of the Cardamoms.',
    activities: ['Trekking', 'Botany Workshop', 'Community Homestay', 'Waterfall Swim'],
    imageKey: 'cbet.package.veunsaisiampang.snapshot',

    // Coordinates for Map
    coordinates: {
      lat: 11.5647,
      lng: 103.1325
    },

    duration: '2 Days / 1 Night',
    scheduleOutline: [
      'Day 1: Arrival & Trekking',
      'Day 1: Night Walk',
      'Day 2: Botany Workshop',
      'Day 2: Departure'
    ],
    suitableTiming: 'All year (Rain gear required Jun-Oct)',

    capacityBands: [
      { min: 8, max: 15, pricePerStudent: 85 }
    ],
    includes: ['Homestay accommodation', '4 meals', 'Ranger Guide', 'Forest entry'],
    excludes: ['Sleeping bag', 'Leech socks'],
    depositDetails: { percentage: 30, deadlineDays: 30 },

    learningOutcomes: [
      'Forest ecosystem stratification',
      'Indigenous plant usage',
      'Conservation challenges'
    ],

    safetyInfo: {
      activityLevel: 'High',
      riskNotes: 'Slippery trails, insects, remote location.',
      facilities: ['Shared Bathrooms', 'No Electricity'],
      guideRatio: '1:8',
      firstAid: true
    },

    bookingConditions: {
      minLeadTimeDays: 45,
      minGroupSize: 8,
      maxGroupSize: 15,
      cancellationPolicy: 'Non-refundable deposit.',
      transportNotes: '4x4 Vehicle required for last leg.'
    }
  },
  {
    id: 'CBET-003',
    name: 'Kampot Mangrove Restoration',
    location: 'Trapeang Sangkae',
    cbetSite: 'Trapeang Sangkae Fishery Community',
    managingOrg: 'Community Committee',
    ecoLinkRole: 'Sponsor',
    description: 'Hands-on mangrove planting and coastal erosion analysis. Direct contribution to reforestation efforts.',
    activities: ['Planting', 'Kayaking', 'Fishery Study', 'Nursery Tour'],
    imageKey: 'cbet.package.veunsaisiampang.community.story',

    // Coordinates for Map
    coordinates: {
      lat: 10.6053,
      lng: 104.1729
    },

    duration: '1 Day',
    scheduleOutline: ['08:00 - Arrive', '09:00 - Planting', '12:00 - Lunch', '13:00 - Kayak'],
    suitableTiming: 'Avoid heavy storms',

    capacityBands: [
      { min: 20, max: 50, pricePerStudent: 25 }
    ],
    includes: ['Seedlings', 'Lunch', 'Gloves', 'Kayak rental'],
    excludes: ['Transport to site'],
    depositDetails: { percentage: 100, deadlineDays: 7 },

    learningOutcomes: [
      'Blue carbon ecosystems',
      'Lifecycle of mangroves',
      'Community livelihood dependence'
    ],

    safetyInfo: {
      activityLevel: 'Moderate',
      riskNotes: 'Mud walking, sharp shells.',
      facilities: ['Community Hall Toilets'],
      guideRatio: '1:20',
      firstAid: true
    },

    bookingConditions: {
      minLeadTimeDays: 14,
      minGroupSize: 20,
      maxGroupSize: 50,
      cancellationPolicy: 'Full refund 48h prior.',
      transportNotes: 'Large bus access available.'
    }
  }
];

export const MOCK_TRIPS: Trip[] = [
  {
    id: 'EL-2024-0082',
    packageId: 'CBET-001',
    packageName: 'Prek Toal Bird Sanctuary',
    facultyName: 'Dr. Sarah Jenning',
    department: 'Environmental Science',
    requestorContact: 's.jenning@ecolink.edu',
    date: '2024-11-15',
    groupSize: 20,
    purpose: 'BIO-201 Field Requirement',
    status: ProjectStatus.LOCKED,
    transportStatus: 'Booked',
    siteNotified: true,
    approvalPack: {
      tripId: 'EL-2024-0082',
      files: [
        { name: 'Confirmation_Letter.pdf', url: '#' },
        { name: 'Itinerary_Final.pdf', url: '#' },
        { name: 'Safety_Briefing.pdf', url: '#' }
      ],
      publishedAt: '2024-10-01'
    }
  },
  {
    id: 'EL-2024-0105',
    packageId: 'CBET-003',
    packageName: 'Kampot Mangrove Restoration',
    facultyName: 'Dr. Sarah Jenning',
    department: 'Environmental Science',
    requestorContact: 's.jenning@ecolink.edu',
    date: '2024-12-05',
    groupSize: 35,
    purpose: 'Community Service Club',
    status: ProjectStatus.PENDING,
    transportStatus: 'Pending',
    siteNotified: false
  }
];

export const useCBETPackages = () => CBET_PACKAGES;
export const useFacultyTrips = () => MOCK_TRIPS;
