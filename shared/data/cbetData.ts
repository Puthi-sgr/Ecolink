import { CBETPackage, Trip, ProjectStatus } from '../types';

export const CBET_PACKAGES: CBETPackage[] = [
  {
    id: 'CBET-001',
    name: 'Prek Toal Bird Sanctuary',
    location: 'Tonle Sap Biosphere',
    cbetSite: 'Prek Toal Community',
    managingOrg: 'Ministry of Environment',
    ecoLinkRole: 'Coordinator',
    description: 'A world-class ornithological site. Students will observe the largest colony of water birds in Southeast Asia while engaging with a floating village community adapting to extreme hydrological cycles.',
    activities: ['Bird Watching', 'Floating Village Tour', 'Water Hyacinth Workshop', 'Biosphere Lecture'],
    imageUrl: 'https://placehold.co/600x400?text=Prek+Toal+Wetlands',
    // Coordinates near Prek Toal
    coordinates: { lat: 13.2374, lng: 103.6524 },
    duration: '1 Full Day',
    scheduleOutline: ['06:30 - Depart Campus', '08:00 - Boat Transfer from Chong Khneas', '09:30 - Core Bird Reserve (Observation Platform)', '12:00 - Community Lunch at Floating Center', '13:30 - Weaving Workshop (Hyacinth)', '15:00 - Return Transfer'],
    suitableTiming: 'Dec - May (Dry Season) for peak bird density',
    capacityBands: [{ min: 15, max: 25, pricePerStudent: 45 }, { min: 26, max: 40, pricePerStudent: 38 }, { min: 41, max: 55, pricePerStudent: 35 }],
    includes: ['Private boat charter', 'Biosphere entrance fees', 'Community lunch', 'Ranger guides', 'Life jackets', 'Binoculars (shared)'],
    excludes: ['Travel insurance', 'Personal snacks', 'Tips for boat driver'],
    depositDetails: { percentage: 20, deadlineDays: 14 },
    learningOutcomes: ['Observe endangered species (Greater Adjutant, Spot-billed Pelican)', 'Understand the Tonle Sap flood pulse ecosystem', 'Analyze community livelihoods in floating environments'],
    safetyInfo: {
      activityLevel: 'Low',
      riskNotes: 'Water-based travel. Sun exposure is the primary risk.',
      facilities: ['Western Toilets (at center)', 'Bottled Water Provided', 'Covered Boat'],
      guideRatio: '1:15',
      firstAid: true
    },
    bookingConditions: { minLeadTimeDays: 10, minGroupSize: 15, maxGroupSize: 55, cancellationPolicy: 'Full refund 7 days prior. 50% refund 3 days prior.', transportNotes: 'Requires coach to boat station, then transfer to community boats (max 15 per boat).' }
  },
  {
    id: 'CBET-002',
    name: 'Chi Phat Ecotourism Village',
    location: 'Southern Cardamom Mountains, Koh Kong',
    cbetSite: 'Chi Phat Community',
    managingOrg: 'Wildlife Alliance',
    ecoLinkRole: 'Partner',
    description: 'One of Cambodia’s premier community ecotourism destinations in the Cardamom Mountains. Students will trek through dense rainforests and rivers to discover wildlife and learn about conservation efforts in a former logging community turned guardians of the forest.',
    activities: ['Jungle Trekking', 'Wildlife Night Safari', 'River Kayaking', 'Camping'],
    imageUrl: 'https://placehold.co/600x400?text=Chi+Phat+Jungle',
    // Coordinates near Chi Phat
    coordinates: { lat: 11.3285, lng: 103.5239 },
    duration: '3 Days 2 Nights',
    scheduleOutline: ['Day 1 - Travel to Chi Phat & community orientation', 'Day 2 - Full-day jungle trek (wildlife tracking, camping overnight)', 'Day 3 - Return trek & depart for city'],
    suitableTiming: 'Nov - Apr (Dry season for trekking)',
    capacityBands: [{ min: 15, max: 25, pricePerStudent: 120 }, { min: 26, max: 40, pricePerStudent: 100 }, { min: 41, max: 55, pricePerStudent: 90 }],
    includes: ['Shared transport (van & boat) to Chi Phat', 'Accommodation (homestay/camp)', 'All meals', 'Local guides and rangers', 'Camping gear'],
    excludes: ['Travel insurance', 'Personal trekking gear', 'Snacks', 'Souvenirs'],
    depositDetails: { percentage: 30, deadlineDays: 30 },
    learningOutcomes: ['Identify rainforest flora and fauna (e.g., hornbills, gibbons)', 'Learn about community-led conservation in former logging areas', 'Develop teamwork and resilience through multi-day trekking'],
    safetyInfo: {
      activityLevel: 'High',
      riskNotes: 'Strenuous jungle hiking. Risks include heat exhaustion, leeches, and insects.',
      facilities: ['Homestay lodging, basic toilets & showers', 'Purified water available', 'Mosquito nets provided'],
      guideRatio: '1:8',
      firstAid: true
    },
    bookingConditions: { minLeadTimeDays: 14, minGroupSize: 15, maxGroupSize: 50, cancellationPolicy: 'Full refund 14 days prior. 50% refund 7 days prior.', transportNotes: 'Bus to Andoung Teuk (~4h), then boat (~2h) to Chi Phat village. Trekking on foot once at site.' }
  },
  {
    id: 'CBET-003',
    name: 'Chambok Waterfall & Community',
    location: 'Kirirom Foothills, Kampong Speu',
    cbetSite: 'Chambok Community',
    managingOrg: 'Mlup Baitong NGO',
    ecoLinkRole: 'Facilitator',
    description: 'A community at the edge of Kirirom National Park known for its waterfalls and rural charm. Students will hike to a scenic waterfall and learn about sustainable livelihoods as villagers demonstrate local farming and conservation in practice.',
    activities: ['Waterfall Hike', 'Ox-cart Ride', 'Cultural Dance Show', 'Village Homestay'],
    imageUrl: 'https://placehold.co/600x400?text=Chambok+Waterfall',
    // Coordinates near Chambok
    coordinates: { lat: 11.3849, lng: 104.1164 },
    duration: '1 Full Day',
    scheduleOutline: ['07:00 - Depart Campus', '09:00 - Arrive Chambok (community welcome)', '10:00 - Guided hike to Chambok waterfall', '12:30 - Picnic lunch at waterfall', '14:00 - Ox-cart ride through village', '15:30 - Cultural dance performance', '16:00 - Depart for campus'],
    suitableTiming: 'Year-round (waterfall flow best Jun - Oct)',
    capacityBands: [{ min: 15, max: 25, pricePerStudent: 30 }, { min: 26, max: 40, pricePerStudent: 25 }, { min: 41, max: 55, pricePerStudent: 22 }],
    includes: ['Private transport', 'Entrance fees', 'Local guide', 'Lunch and bottled water', 'Activity materials'],
    excludes: ['Travel insurance', 'Personal expenses', 'Additional drinks', 'Tips'],
    depositDetails: { percentage: 10, deadlineDays: 7 },
    learningOutcomes: ['Observe sustainable farming and ecotourism in a rural village', 'Understand forest ecosystem services (waterfalls, wildlife)', 'Appreciate cultural traditions and community-driven conservation'],
    safetyInfo: {
      activityLevel: 'Moderate',
      riskNotes: 'Uneven terrain to waterfall. Ensure proper footwear, hydration, and sun protection.',
      facilities: ['Visitor center with toilets', 'Drinking water provided', 'First aid kit on-site'],
      guideRatio: '1:15',
      firstAid: true
    },
    bookingConditions: { minLeadTimeDays: 5, minGroupSize: 15, maxGroupSize: 50, cancellationPolicy: 'Full refund 5 days prior. 50% refund 2 days prior.', transportNotes: 'Accessible by bus/van (~2 hours from Phnom Penh). Short walks from parking area to sites.' }
  },
  {
    id: 'CBET-004',
    name: 'Banteay Chhmar Temple Stay',
    location: 'Banteay Meanchey Province',
    cbetSite: 'Banteay Chhmar CBT',
    managingOrg: 'Ministry of Tourism & Community',
    ecoLinkRole: 'Coordinator',
    description: 'An ancient Angkorian temple complex managed by the local community. Students will explore a sprawling 12th-century temple off the beaten path while experiencing village homestays that showcase community-led cultural heritage preservation.',
    activities: ['Temple Exploration', 'Village Homestay', 'Traditional Weaving Workshop', 'Ox-cart Tour'],
    imageUrl: 'https://placehold.co/600x400?text=Banteay+Chhmar+Temple',
    // Coordinates near Banteay Chhmar
    coordinates: { lat: 14.0711, lng: 103.0997 },
    duration: '2 Days 1 Night',
    scheduleOutline: ['06:00 - Depart Siem Reap', '11:00 - Arrive Banteay Chhmar (community welcome)', '13:00 - Guided tour of Banteay Chhmar temple', '17:30 - Traditional music performance & community dinner', 'Overnight in village homestay', 'Day 2 - 08:00 - Visit local silk weaving workshop', '10:00 - Depart for Siem Reap'],
    suitableTiming: 'Year-round (dry season recommended for travel)',
    capacityBands: [{ min: 15, max: 25, pricePerStudent: 60 }, { min: 26, max: 40, pricePerStudent: 50 }, { min: 41, max: 55, pricePerStudent: 45 }],
    includes: ['Transport by coach', 'Temple entry fees', 'Local guides', 'Homestay accommodation', 'Meals (lunch, dinner, breakfast)'],
    excludes: ['Travel insurance', 'Personal snacks', 'Temple donations', 'Tips'],
    depositDetails: { percentage: 20, deadlineDays: 14 },
    learningOutcomes: ['Discover Angkorian history at an off-the-beaten-path temple', 'Understand how local communities preserve cultural heritage', 'Explore sustainable tourism’s role in archaeological site conservation'],
    safetyInfo: {
      activityLevel: 'Moderate',
      riskNotes: 'Rough temple ruins terrain. Caution for heat, uneven stones, and insects.',
      facilities: ['Village homestays (basic bedding)', 'Squat toilets, bucket showers', 'Limited electricity (generator at night)'],
      guideRatio: '1:10',
      firstAid: true
    },
    bookingConditions: { minLeadTimeDays: 14, minGroupSize: 15, maxGroupSize: 40, cancellationPolicy: 'Full refund 7 days prior. 50% refund 3 days prior.', transportNotes: 'Travel by bus (~4-5 hours from Siem Reap). Temple site exploration on foot; ox-carts used for village tours.' }
  },
  {
    id: 'CBET-005',
    name: 'Tmatboey Birding Adventure',
    location: 'Kulen Promtep WS, Preah Vihear',
    cbetSite: 'Tmatboey Community',
    managingOrg: 'Wildlife Conservation Society',
    ecoLinkRole: 'Advisor',
    description: 'A remote bird sanctuary in Cambodia’s Northern Plains. Students will venture into dry forest with community guides to spot rare Giant Ibis and other wildlife, learning how ecotourism supports both conservation and local livelihoods in this Khmer and Kuy village.',
    activities: ['Bird Watching (Giant Ibis)', 'Wildlife Safari', 'Nature Walks', 'Community Lodge Stay'],
    imageUrl: 'https://placehold.co/600x400?text=Tmatboey+Wildlife',
    // Coordinates near Tmatboey
    coordinates: { lat: 13.9677, lng: 104.8827 },
    duration: '2 Days 1 Night',
    scheduleOutline: ['Day 1 - Afternoon arrival at Tmatboey lodge, orientation', '16:30 - Evening bird-watching walk with guides', '19:00 - Dinner and night wildlife spotlighting', 'Day 2 - 05:00 - Pre-dawn trek to see Giant Ibis at watering site', '09:00 - Breakfast at lodge', '11:00 - Depart Tmatboey'],
    suitableTiming: 'Mar - May (Dry season for Giant Ibis sightings)',
    capacityBands: [{ min: 15, max: 25, pricePerStudent: 80 }, { min: 26, max: 40, pricePerStudent: 70 }, { min: 41, max: 55, pricePerStudent: 60 }],
    includes: ['4x4 transport from nearest town', 'Accommodation at Tmatboey ecolodge', 'All meals and water', 'Expert birding guides', 'Conservation fees'],
    excludes: ['Travel insurance', 'Personal binoculars', 'Alcoholic beverages', 'Tips'],
    depositDetails: { percentage: 50, deadlineDays: 30 },
    learningOutcomes: ['Identify key bird species (Giant Ibis, White-shouldered Ibis)', 'Understand human-wildlife coexistence via community conservation agreements', 'Improve field observation and data recording skills'],
    safetyInfo: {
      activityLevel: 'Moderate',
      riskNotes: 'Early morning treks in wild habitat. Mosquitoes, heat, and long walking distances are main concerns.',
      facilities: ['Ecolodge with solar power', 'Western toilets and showers', 'Mosquito nets provided'],
      guideRatio: '1:5',
      firstAid: true
    },
    bookingConditions: { minLeadTimeDays: 30, minGroupSize: 15, maxGroupSize: 15, cancellationPolicy: 'Full refund 14 days prior. 50% refund 7 days prior.', transportNotes: 'Travel by minibus to Preah Vihear, then by 4x4 on rough road to Tmatboey. Onsite activities on foot with local guides.' }
  },
  {
    id: 'CBET-006',
    name: 'Preah Rumkel Mekong Discovery',
    location: 'Mekong Ramsar, Stung Treng',
    cbetSite: 'Preah Rumkel Community',
    managingOrg: 'Provincial Tourism Department',
    ecoLinkRole: 'Partner',
    description: 'A riverside ecotourism community on the Mekong near the Lao border. Students will witness the powerful Sopheakmit Waterfall and possibly glimpse endangered Irrawaddy dolphins while understanding community efforts to protect the Mekong’s biodiversity.',
    activities: ['Boat to Waterfall', 'Dolphin Watching', 'Cycling to Border', 'Homestay Experience'],
    imageUrl: 'https://placehold.co/600x400?text=Preah+Rumkel+Mekong',
    // Coordinates near Preah Rumkel
    coordinates: { lat: 13.886, lng: 105.963 },
    duration: '1 Full Day',
    scheduleOutline: ['08:00 - Depart Stung Treng by boat', '09:30 - Arrive Preah Rumkel (orientation)', '10:00 - Boat trip to Sopheakmit Waterfall (Lao border)', '12:30 - Lunch at community homestay', '14:00 - Irrawaddy dolphin spotting by boat', '15:30 - Depart Preah Rumkel for Stung Treng'],
    suitableTiming: 'Nov - Mar (Cool, dry season)',
    capacityBands: [{ min: 15, max: 25, pricePerStudent: 35 }, { min: 26, max: 40, pricePerStudent: 30 }, { min: 41, max: 55, pricePerStudent: 25 }],
    includes: ['Boat transfers', 'Community guide', 'Lunch', 'Life jackets', 'Entrance fee'],
    excludes: ['Travel insurance', 'Personal expenses', 'Souvenirs', 'Tips'],
    depositDetails: { percentage: 20, deadlineDays: 7 },
    learningOutcomes: ['Understand transboundary river ecosystems and issues (dams, fisheries)', 'Observe endangered Irrawaddy dolphins in their natural habitat', 'Learn about community resilience and eco-livelihoods in remote areas'],
    safetyInfo: {
      activityLevel: 'Moderate',
      riskNotes: 'Boat travel on river and near waterfall - life jackets worn at all times. Sun exposure and hydration are important.',
      facilities: ['Homestay houses (mosquito nets)', 'Shared squat toilets', 'Bottled drinking water available'],
      guideRatio: '1:15',
      firstAid: true
    },
    bookingConditions: { minLeadTimeDays: 7, minGroupSize: 15, maxGroupSize: 30, cancellationPolicy: 'Full refund 5 days prior. 50% refund 2 days prior.', transportNotes: 'Access via boat from Stung Treng (approx 1hr). Road access requires high clearance vehicles; most tours use boats (max 10-15 per boat).' }
  },
  {
    id: 'CBET-007',
    name: 'Koh Pdao Dolphin Island',
    location: 'Upper Mekong, Kratie',
    cbetSite: 'Koh Pdao Community',
    managingOrg: 'CRDT (Community Committee)',
    ecoLinkRole: 'Partner',
    description: 'A Mekong River island community renowned for dolphin conservation. Students will take boat trips to observe the endangered Irrawaddy dolphins and participate in village activities, seeing first-hand how ecotourism supports rural development and environmental protection.',
    activities: ['Dolphin Watching Boat Trip', 'Fishing Village Tour', 'Kayaking', 'Evening Bonfire'],
    imageUrl: 'https://placehold.co/600x400?text=Koh+Pdao+Dolphins',
    // Coordinates near Koh Pdao
    coordinates: { lat: 12.9529, lng: 105.9993 },
    duration: '1 Full Day',
    scheduleOutline: ['07:30 - Depart Kratie town', '09:00 - Arrive at Koh Pdao (ferry crossing)', '10:00 - Dolphin watching boat tour on Mekong', '12:30 - Community lunch in village', '13:30 - Village walk and fishing activity', '15:00 - Depart Koh Pdao for Kratie'],
    suitableTiming: 'Dec - May (Dry season for easier dolphin spotting)',
    capacityBands: [{ min: 15, max: 25, pricePerStudent: 40 }, { min: 26, max: 40, pricePerStudent: 35 }, { min: 41, max: 55, pricePerStudent: 30 }],
    includes: ['Boat ride to dolphin site', 'Community guide', 'Lunch and water', 'Village activity fees', 'Life jackets'],
    excludes: ['Travel insurance', 'Extra drinks or snacks', 'Personal expenses', 'Tips'],
    depositDetails: { percentage: 20, deadlineDays: 7 },
    learningOutcomes: ['Observe Irrawaddy dolphins and understand their river habitat', 'Learn about community initiatives for dolphin conservation', 'Understand rural life on Mekong islands and sustainable resource use'],
    safetyInfo: {
      activityLevel: 'Low',
      riskNotes: 'Boat travel on the Mekong. Supervision around water and sun protection are the main concerns.',
      facilities: ['Community center with toilets', 'Life jackets provided for boat trips', 'Bottled water available'],
      guideRatio: '1:10',
      firstAid: true
    },
    bookingConditions: { minLeadTimeDays: 7, minGroupSize: 15, maxGroupSize: 30, cancellationPolicy: 'Full refund 5 days prior. 50% refund 2 days prior.', transportNotes: 'Coach to Sambour (~45km), then local boats (max 6-8 per boat) to Koh Pdao island. All boat passengers wear life jackets.' }
  },
  {
    id: 'CBET-008',
    name: 'Prek Thnout Mangrove Experience',
    location: 'Bokor NP Buffer, Kampot',
    cbetSite: 'Prek Thnout Community',
    managingOrg: "Save Cambodia's Wildlife (SCW)",
    ecoLinkRole: 'Advisor',
    description: 'A coastal community ecotourism site near Bokor National Park. Students will explore mangrove forests and estuarine ecosystems, learn about local efforts to protect Irrawaddy dolphins and mangroves, and engage in community-led activities like fishing and handicrafts.',
    activities: ['Mangrove Boat Ride', 'Dolphin Spotting', 'Village Walk', 'Fishing Demonstration'],
    imageUrl: 'https://placehold.co/600x400?text=Prek+Thnout+Mangroves',
    // Coordinates near Prek Thnout
    coordinates: { lat: 10.5956, lng: 103.9632 },
    duration: '1 Full Day',
    scheduleOutline: ['08:00 - Depart Kampot town', '09:00 - Arrive Prek Thnout (orientation)', '09:30 - Mangrove boat ride & dolphin spotting', '12:00 - Seafood lunch in community', '13:30 - Village walk and mangrove planting activity', '15:00 - Depart Prek Thnout'],
    suitableTiming: 'Nov - Feb (Cool dry season, dolphins present)',
    capacityBands: [{ min: 15, max: 25, pricePerStudent: 32 }, { min: 26, max: 40, pricePerStudent: 28 }, { min: 41, max: 55, pricePerStudent: 25 }],
    includes: ['Local boat tour', 'Guide', 'Lunch', 'Life jackets', 'Community activity materials'],
    excludes: ['Travel insurance', 'Personal expenses', 'Tips'],
    depositDetails: { percentage: 15, deadlineDays: 7 },
    learningOutcomes: ['Understand mangrove ecology and coastal biodiversity', 'Learn about community efforts to protect marine mammals (Irrawaddy dolphins)', 'Experience the challenges of balancing livelihood and conservation'],
    safetyInfo: {
      activityLevel: 'Low',
      riskNotes: 'Boat in mangroves and estuary. Sun exposure and occasional rain; life jackets used during boat rides.',
      facilities: ['Riverside camp shelter', 'Eco-toilets', 'Life jackets, mosquito nets available'],
      guideRatio: '1:15',
      firstAid: true
    },
    bookingConditions: { minLeadTimeDays: 5, minGroupSize: 15, maxGroupSize: 25, cancellationPolicy: 'Full refund 5 days prior. 50% refund 2 days prior.', transportNotes: 'Accessible by minivan (~1 hour from Kampot). Short local boat rides (8-10 per boat) for mangrove and dolphin tour.' }
  },
  {
    id: 'CBET-009',
    name: 'Virachey Rainforest Trek',
    location: 'Ratanakiri Province',
    cbetSite: 'Virachey NP CBET Initiative',
    managingOrg: 'Ministry of Environment (Park)',
    ecoLinkRole: 'Coordinator',
    description: 'One of Cambodia’s wildest national parks, offering multi-day jungle treks guided by indigenous communities. Students will hike and camp deep in the rainforest, learning survival skills and about the rich biodiversity from park rangers and local guides in this transboundary conservation area.',
    activities: ['Multi-day Jungle Trekking', 'Camping', 'Wildlife Tracking', 'Cultural Village Visit'],
    imageUrl: 'https://placehold.co/600x400?text=Virachey+Rainforest',
    // Coordinates near Virachey NP
    coordinates: { lat: 14.3257, lng: 106.9982 },
    duration: '5 Days 4 Nights',
    scheduleOutline: ['Day 1 - Drive from Banlung to Virachey HQ, begin trek to first campsite', 'Day 2 - Full-day jungle trek deeper into park (wildlife tracking)', 'Day 3 - Reach Veal Thom grassland, camp under stars', 'Day 4 - Return trek via river (rafting or kayaking segment)', 'Day 5 - Conclude trek and return to Banlung'],
    suitableTiming: 'Nov - Feb (Dry season for trekking)',
    capacityBands: [{ min: 15, max: 25, pricePerStudent: 200 }, { min: 26, max: 40, pricePerStudent: 180 }, { min: 41, max: 55, pricePerStudent: 150 }],
    includes: ['Park permits and fees', 'Guides and porters', 'Camping equipment', 'All meals', '4x4 transport to trailhead'],
    excludes: ['Travel insurance', 'Personal trekking gear (boots, backpacks)', 'Snacks', 'Tips'],
    depositDetails: { percentage: 50, deadlineDays: 60 },
    learningOutcomes: ['Develop wilderness survival and camping skills', 'Understand tropical rainforest ecology and biodiversity', 'Learn from indigenous knowledge about nature and conservation'],
    safetyInfo: {
      activityLevel: 'High',
      riskNotes: 'Remote trekking with wildlife. Participants must be fit; risks include leeches, difficult terrain, and variable weather.',
      facilities: ['Tented camps (portable tents)', 'Portable toilets', 'Purified water supplies'],
      guideRatio: '1:5',
      firstAid: true
    },
    bookingConditions: { minLeadTimeDays: 30, minGroupSize: 15, maxGroupSize: 20, cancellationPolicy: 'Full refund 21 days prior. 50% refund 14 days prior.', transportNotes: 'Long 4x4 ride (~1.5h) from Banlung to trailhead. Trekking entirely on foot; pack animals or porters carry supplies. Emergency satellite phone carried by guides.' }
  },
  {
    id: 'CBET-010',
    name: 'O Russey Kandal Forest Retreat',
    location: 'Stung Treng Province',
    cbetSite: 'O Russey Kandal Community',
    managingOrg: 'Mlup Baitong NGO',
    ecoLinkRole: 'Advisor',
    description: 'A community forest retreat known for a pristine stream and lush biodiversity. Students can trek through protected woods, swim in crystal-clear stream pools, and observe wildlife, all while learning about community-led forest conservation initiated by local environmental groups.',
    activities: ['Forest Trekking', 'Stream Swimming', 'Wildlife Viewing', 'Picnic'],
    imageUrl: 'https://placehold.co/600x400?text=ORussey+Kandal+Forest',
    // Coordinates near O Russey Kandal
    coordinates: { lat: 13.28, lng: 105.967 },
    duration: '1 Full Day',
    scheduleOutline: ['07:00 - Depart Stung Treng town', '08:30 - Arrive O Russey Kandal (welcome by community)', '09:00 - Guided forest hike to waterfall stream', '12:00 - Picnic lunch by the stream', '13:30 - Wildlife spotting along nature trail', '15:00 - Depart for Stung Treng'],
    suitableTiming: 'Oct - Feb (Cool, post-monsoon season)',
    capacityBands: [{ min: 15, max: 25, pricePerStudent: 30 }, { min: 26, max: 40, pricePerStudent: 25 }, { min: 41, max: 55, pricePerStudent: 20 }],
    includes: ['Private minibus transfer', 'Local guide', 'Lunch (picnic)', 'Entrance fees', 'Drinking water'],
    excludes: ['Travel insurance', 'Personal food/snacks', 'Souvenirs', 'Tips'],
    depositDetails: { percentage: 10, deadlineDays: 7 },
    learningOutcomes: ['Observe community forestry management practices', 'Understand the importance of biodiversity in local livelihoods', 'Experience outdoor recreation (swimming, hiking) safely in a natural environment'],
    safetyInfo: {
      activityLevel: 'Low',
      riskNotes: 'Forest hike and swimming - caution on slippery rocks and supervise students while swimming. Insect bites possible; use repellent.',
      facilities: ['Rustic picnic site (basic shelter)', 'Village toilet available', 'Water provided'],
      guideRatio: '1:15',
      firstAid: true
    },
    bookingConditions: { minLeadTimeDays: 3, minGroupSize: 15, maxGroupSize: 25, cancellationPolicy: 'Full refund 3 days prior. 50% refund 1 day prior.', transportNotes: 'Short drive (~30 min) on National Road 7 from Stung Treng, followed by a brief walk to the forest site. The stream spots are a short hike from the village.' }
  },
  {
    id: 'CBET-011',
    name: 'Yeak Laom Crater Lake',
    location: 'Banlung, Ratanakiri',
    cbetSite: 'Yeak Laom Community',
    managingOrg: 'Local Indigenous Committee',
    ecoLinkRole: 'Partner',
    description: 'A sacred volcanic lake managed by the local indigenous community. Students will hike the lake’s circumference, swim in its clear waters, and visit a cultural center to learn about the traditions and environmental stewardship of the indigenous Tampuan people.',
    activities: ['Nature Hike', 'Swimming', 'Cultural Center Visit', 'Handicraft Shopping'],
    imageUrl: 'https://placehold.co/600x400?text=Yeak+Laom+Lake',
    // Coordinates near Yeak Laom
    coordinates: { lat: 13.73, lng: 107.015 },
    duration: 'Half Day',
    scheduleOutline: ['09:00 - Arrive Yeak Laom Lake (orientation at visitor center)', '09:30 - Guided nature hike around crater lake (3km trail)', '11:00 - Swimming and relaxation at designated area', '12:30 - Visit indigenous cultural museum & handicraft center', '13:00 - Depart for Banlung'],
    suitableTiming: 'Oct - Jan (Cool weather, lush scenery)',
    capacityBands: [{ min: 15, max: 25, pricePerStudent: 15 }, { min: 26, max: 40, pricePerStudent: 12 }, { min: 41, max: 55, pricePerStudent: 10 }],
    includes: ['Transfers from Banlung', 'Local guide', 'Entrance fee', 'Bottled water'],
    excludes: ['Travel insurance', 'Meals', 'Personal purchases', 'Tips'],
    depositDetails: { percentage: 10, deadlineDays: 3 },
    learningOutcomes: ['Appreciate indigenous cultural values in environmental stewardship', 'Understand volcanic lake ecology and watershed conservation', 'Practice observation and reflection in a serene natural setting'],
    safetyInfo: {
      activityLevel: 'Low',
      riskNotes: 'Easy hike and lake swimming. Lifejackets or supervision required for swimming; sun exposure on trail.',
      facilities: ['Visitor center toilets', 'Changing huts for swimming', 'Drinking water for guests'],
      guideRatio: '1:15',
      firstAid: true
    },
    bookingConditions: { minLeadTimeDays: 1, minGroupSize: 15, maxGroupSize: 50, cancellationPolicy: 'Full refund 3 days prior. 50% refund 1 day prior.', transportNotes: 'Short drive (~15 min) from Banlung to Yeak Laom. Trail around lake is on foot (flat terrain). Swimming area monitored by community; bring own towels.' }
  },
  {
    id: 'CBET-012',
    name: 'Osvay Ramsar Wetlands',
    location: 'Stung Treng Ramsar Site',
    cbetSite: 'Osvay Community',
    managingOrg: 'CEPA (Local NGO)',
    ecoLinkRole: 'Partner',
    description: 'A cluster of Mekong islands and flooded forests within a Ramsar wetland. Students will boat through mangroves, observe diverse bird life and possibly river dolphins, and interact with villagers to understand life along the Mekong and community conservation efforts.',
    activities: ['Forest Hike', 'Boat Trip in Wetlands', 'Dolphin Spotting', 'Bird Watching'],
    imageUrl: 'https://placehold.co/600x400?text=Osvay+Wetlands',
    // Coordinates near Osvay
    coordinates: { lat: 13.8368, lng: 105.9992 },
    duration: '2 Days 1 Night',
    scheduleOutline: ['Day 1 - Morning boat from Stung Treng to Osvay CBET site', 'Day 1 - Afternoon village walk and sunset dolphin cruise', 'Evening homestay with local family (dinner provided)', 'Day 2 - Morning community forest hike and bird watching', '12:00 - Lunch and wrap-up discussion', '13:30 - Return boat to Stung Treng'],
    suitableTiming: 'Dec - May (Dry season for easier access)',
    capacityBands: [{ min: 15, max: 25, pricePerStudent: 70 }, { min: 26, max: 40, pricePerStudent: 60 }, { min: 41, max: 55, pricePerStudent: 50 }],
    includes: ['Boat transport', 'Homestay accommodation', 'Meals (Day1 dinner, Day2 breakfast & lunch)', 'Guides', 'Life jackets'],
    excludes: ['Travel insurance', 'Personal snacks', 'Souvenirs', 'Tips'],
    depositDetails: { percentage: 30, deadlineDays: 14 },
    learningOutcomes: ['Understand Ramsar wetlands\' importance for biodiversity', 'Observe Mekong river species (birds, dolphins) in a protected habitat', 'Learn about community adaptation to seasonal floods and river life'],
    safetyInfo: {
      activityLevel: 'Moderate',
      riskNotes: 'Long boat journey in open sun. Remote area - carry first aid; life jackets worn on boats; insects in forest.',
      facilities: ['Homestays (mosquito nets provided)', 'Simple squat toilets', 'Community dining area'],
      guideRatio: '1:10',
      firstAid: true
    },
    bookingConditions: { minLeadTimeDays: 14, minGroupSize: 15, maxGroupSize: 20, cancellationPolicy: 'Full refund 7 days prior. 50% refund 3 days prior.', transportNotes: 'Access primarily by boat (1.5-2h). In dry season, mini-boat or canoe used to navigate shallow channels. Limit ~8-10 per boat.' }
  },
  {
    id: 'CBET-013',
    name: 'Ang Trapeang Thmor Crane Sanctuary',
    location: 'Phnom Srok, Banteay Meanchey',
    cbetSite: 'Ang Trapeang Thmor Community',
    managingOrg: 'Forestry Administration',
    ecoLinkRole: 'Advisor',
    description: 'A unique wetland and reservoir that is a sanctuary for the Eastern Sarus Crane. Students will traverse dry season grasslands with local rangers to observe cranes and other wildlife, and learn about the site\'s history and community involvement in protecting this biodiversity hotspot.',
    activities: ['Bird Watching (Sarus Cranes)', 'Ox-Cart Safari', 'Village Visit', 'Wildlife Photography'],
    imageUrl: 'https://placehold.co/600x400?text=Ang+Trapeang+Thmor+Cranes',
    // Coordinates near Ang Trapeang Thmor
    coordinates: { lat: 13.8688, lng: 103.3013 },
    duration: '1 Full Day',
    scheduleOutline: ['05:30 - Depart Siem Reap', '08:00 - Arrive Ang Trapeang Thmor (meet rangers)', '08:30 - Bird watching on reservoir berm', '12:00 - Lunch at ranger station', '13:30 - Ox-cart ride to viewing platform', '15:00 - Depart for Siem Reap'],
    suitableTiming: 'Feb - Apr (Dry season when cranes gather)',
    capacityBands: [{ min: 15, max: 25, pricePerStudent: 25 }, { min: 26, max: 40, pricePerStudent: 20 }, { min: 41, max: 55, pricePerStudent: 18 }],
    includes: ['Transport from Siem Reap', 'Ranger guides', 'Binoculars (shared)', 'Lunch', 'Protected area entry fee'],
    excludes: ['Travel insurance', 'Personal binoculars', 'Personal expenses', 'Tips'],
    depositDetails: { percentage: 20, deadlineDays: 7 },
    learningOutcomes: ['Observe endangered waterbirds (Eastern Sarus Crane) in the wild', 'Understand wetland management and its role in wildlife conservation', 'Discuss historical human impact (Khmer Rouge dam) and modern conservation efforts'],
    safetyInfo: {
      activityLevel: 'Low',
      riskNotes: 'Outdoor walking and ox-cart riding. Sun exposure and heat are the main concerns; insect bites possible in grassland.',
      facilities: ['Ranger station with basic toilet', 'Observation tower', 'Drinking water provided'],
      guideRatio: '1:15',
      firstAid: true
    },
    bookingConditions: { minLeadTimeDays: 7, minGroupSize: 15, maxGroupSize: 40, cancellationPolicy: 'Full refund 5 days prior. 50% refund 2 days prior.', transportNotes: 'Travel by minibus (~2 hours from Siem Reap) on paved and dirt roads. On-site transport by ox-cart and foot to minimize disturbance to wildlife.' }
  },
  {
    id: 'CBET-014',
    name: 'Koh Han Mekong Islands',
    location: 'Mekong Ramsar, Stung Treng',
    cbetSite: 'Koh Han Community',
    managingOrg: 'NTFP-EP Cambodia',
    ecoLinkRole: 'Facilitator',
    description: 'A serene Mekong island ecotourism site in the Stung Treng Ramsar wetlands. Students will camp on sandbars, explore the rich birdlife and flooded forests by boat, and engage with the local community\'s initiatives led by women to promote sustainable tourism and conservation.',
    activities: ['Boat Excursion', 'Island Camping', 'Bird Watching', 'Fishing with Locals'],
    imageUrl: 'https://placehold.co/600x400?text=Koh+Han+Island',
    // Coordinates near Koh Han
    coordinates: { lat: 13.75, lng: 105.97 },
    duration: '2 Days 1 Night',
    scheduleOutline: ['Day 1 - Morning boat from Stung Treng to Koh Han island camp', 'Day 1 - Afternoon guided walk and birding on island', 'Evening camping on sandbar (campfire dinner)', 'Day 2 - Sunrise boat tour through flooded forest', 'Day 2 - Community fishing activity and brunch', 'Late morning - Return boat to Stung Treng'],
    suitableTiming: 'Nov - Mar (Dry season camping and river navigation)',
    capacityBands: [{ min: 15, max: 25, pricePerStudent: 65 }, { min: 26, max: 40, pricePerStudent: 55 }, { min: 41, max: 55, pricePerStudent: 45 }],
    includes: ['Boat charter', 'Camping gear (tents, mats)', 'Meals (Day1 lunch/dinner, Day2 breakfast)', 'Local guides', 'Life jackets'],
    excludes: ['Travel insurance', 'Personal snacks', 'Alcoholic drinks', 'Tips'],
    depositDetails: { percentage: 30, deadlineDays: 14 },
    learningOutcomes: ['Discover Mekong river island ecosystems and biodiversity', 'Learn teamwork through setting up camp and group activities', 'Understand how community tourism can empower local women leaders'],
    safetyInfo: {
      activityLevel: 'Moderate',
      riskNotes: 'Camping outdoors on river islands. Must use life jackets on boats; caution at camp near water; insects and heat during day.',
      facilities: ['Camping tents provided', 'No fixed toilets (portable or cat-hole practice)', 'Safe drinking water supplied'],
      guideRatio: '1:10',
      firstAid: true
    },
    bookingConditions: { minLeadTimeDays: 14, minGroupSize: 15, maxGroupSize: 20, cancellationPolicy: 'Full refund 7 days prior. 50% refund 3 days prior.', transportNotes: 'Boat journey (~1 hour) from Stung Treng to Koh Han. Boats carry ~10-15 pax with life jackets. No road access; all travel by boat.' }
  },
  {
    id: 'CBET-015',
    name: 'Koh Samseb Mekong Archipelago',
    location: 'Sambo Wildlife Sanctuary, Kratie',
    cbetSite: 'Koh Samseb Community',
    managingOrg: 'WWF Cambodia',
    ecoLinkRole: 'Facilitator',
    description: 'An ecotourism experience spanning 30 islands in the Mekong’s biodiversity-rich landscape of Kratie. Students will navigate between islands to spot rare birds and aquatic life, partake in fishing and farming activities with locals, and understand how community tourism can preserve a critical riverine habitat.',
    activities: ['Boat Island Hopping', 'Bird Watching', 'Fishing Experience', 'Camping'],
    imageUrl: 'https://placehold.co/600x400?text=Koh+Samseb+Islands',
    // Coordinates near Koh Samseb
    coordinates: { lat: 12.85, lng: 106.05 },
    duration: '3 Days 2 Nights',
    scheduleOutline: ['Day 1 - Drive from Kratie to Koh Samseb, boat to main island camp', 'Day 1 - Afternoon nature walk and community orientation', 'Day 2 - Full-day boat exploration of islands (wildlife spotting, fishing with locals)', 'Day 2 - Homestay overnight in island village', 'Day 3 - Morning bird watching & free time', 'Day 3 - Return boat to mainland and depart to Kratie'],
    suitableTiming: 'Nov - Mar (Dry season for navigable channels)',
    capacityBands: [{ min: 15, max: 25, pricePerStudent: 110 }, { min: 26, max: 40, pricePerStudent: 95 }, { min: 41, max: 55, pricePerStudent: 85 }],
    includes: ['Boat transport between islands', 'Homestay and camping accommodation', 'Guides', 'All meals', 'Camping equipment'],
    excludes: ['Travel insurance', 'Personal gear (sleeping bag, flashlight)', 'Snacks', 'Tips'],
    depositDetails: { percentage: 30, deadlineDays: 21 },
    learningOutcomes: ['Observe diverse bird species and riverine wildlife in their habitats', 'Understand challenges of protecting large river ecosystems', 'Analyze how ecotourism provides alternatives to overfishing and deforestation'],
    safetyInfo: {
      activityLevel: 'Moderate',
      riskNotes: 'Extended river travel and outdoor camping. Life jackets required on boats; caution for wildlife (snakes) and sun exposure; basic medical facilities only.',
      facilities: ['Homestay and tent lodging', 'Basic toilets', 'Clean water provided'],
      guideRatio: '1:10',
      firstAid: true
    },
    bookingConditions: { minLeadTimeDays: 21, minGroupSize: 15, maxGroupSize: 25, cancellationPolicy: 'Full refund 14 days prior. 50% refund 7 days prior.', transportNotes: 'Combination of road (2 hours from Kratie) and boat travel to reach islands. Small boats (5-8 people) used for island hopping to minimize impact and ensure safety.' }
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
    groupSize: 22,
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
    groupSize: 45,
    purpose: 'Community Service Club',
    status: ProjectStatus.PENDING,
    transportStatus: 'Pending',
    siteNotified: false
  }
];

export const useCBETPackages = () => CBET_PACKAGES;
export const useFacultyTrips = () => MOCK_TRIPS;

export const ADDITIONAL_MOCK_TRIPS: Trip[] = [
  {
    id: 'EL-2025-001',
    packageId: 'CBET-002',
    packageName: 'Chi Phat Ecotourism Village',
    facultyName: 'Dr. Lim Sothy',
    department: 'Forestry & Biology',
    requestorContact: 'l.sothy@ecolink.edu',
    date: '2025-01-20',
    groupSize: 30,
    purpose: 'Deforestation Impact Study',
    status: ProjectStatus.APPROVED,
    transportStatus: 'Booked',
    siteNotified: true
  },
  {
    id: 'EL-2025-002',
    packageId: 'CBET-004',
    packageName: 'Banteay Chhmar Temple Stay',
    facultyName: 'Prof. Chan Vanna',
    department: 'History',
    requestorContact: 'c.vanna@ecolink.edu',
    date: '2025-02-15',
    groupSize: 20,
    purpose: 'Khmer Empire Heritage Tour',
    status: ProjectStatus.PENDING,
    transportStatus: 'Pending',
    siteNotified: false
  },
  {
    id: 'EL-2025-003',
    packageId: 'CBET-005',
    packageName: 'Tmatboey Birding Adventure',
    facultyName: 'Dr. Sarah Jenning',
    department: 'Environmental Science',
    requestorContact: 's.jenning@ecolink.edu',
    date: '2025-03-10',
    groupSize: 15,
    purpose: 'Ornithology Specialization',
    status: ProjectStatus.PENDING,
    transportStatus: 'Pending',
    siteNotified: false
  },
  {
    id: 'EL-2025-004',
    packageId: 'CBET-009',
    packageName: 'Virachey Rainforest Trek',
    facultyName: 'Mr. Keo Piseth',
    department: 'Sports & Recreation',
    requestorContact: 'k.piseth@ecolink.edu',
    date: '2025-01-05',
    groupSize: 18,
    purpose: 'Leadership & Survival Skills',
    status: ProjectStatus.LOCKED,
    transportStatus: 'Booked',
    siteNotified: true,
    approvalPack: {
      tripId: 'EL-2025-004',
      files: [
        { name: 'Park_Permits_Approved.pdf', url: '#' },
        { name: 'Ranger_Assignments.pdf', url: '#' }
      ],
      publishedAt: '2024-12-15'
    }
  },
  {
    id: 'EL-2025-005',
    packageId: 'CBET-011',
    packageName: 'Yeak Laom Crater Lake',
    facultyName: 'Ms. Long Davy',
    department: 'Earth Sciences',
    requestorContact: 'l.davy@ecolink.edu',
    date: '2025-02-28',
    groupSize: 45,
    purpose: 'Volcanology 101 Field Day',
    status: ProjectStatus.PENDING,
    transportStatus: 'Pending',
    siteNotified: true
  },
  {
    id: 'EL-2025-006',
    packageId: 'CBET-015',
    packageName: 'Koh Samseb Mekong Archipelago',
    facultyName: 'Dr. James Wright',
    department: 'International Relations',
    requestorContact: 'j.wright@ecolink.edu',
    date: '2025-03-22',
    groupSize: 25,
    purpose: 'Transboundary Water Politics',
    status: ProjectStatus.PENDING,
    transportStatus: 'Pending',
    siteNotified: false
  }
];

export const ALL_MOCK_TRIPS = [...MOCK_TRIPS, ...ADDITIONAL_MOCK_TRIPS];