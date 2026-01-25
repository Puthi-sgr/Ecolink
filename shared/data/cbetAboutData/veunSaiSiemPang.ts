import { CBETAbout } from '../../types';

export const veunSaiSiemPangAbout: CBETAbout = {
    snapshot: {
        title: 'Snapshot',
        description: 'Veun Sai-Siem Pang is a community-run ecotourism site in northeast Cambodia, known for rainforest treks, gibbon tracking, and indigenous culture. Visits directly support local livelihoods and conservation work through locally managed services.',
        imageKey: 'cbet.package.veunsaisiampang.snapshot'
    },
    communityStory: {
        title: 'Community Story',
        subtitle: 'CBET committee and youth rangers',
        description: 'The site is managed by a community committee with a youth ranger team. EcoLink works with the local CBET committee and conservation partners to coordinate training, safety, and visitor protocols. Homestay hosts rotate by family to ensure fair income.',
        avatarKey: 'cbet.package.veunsaisiampang.community.profile',
        imageKey: 'cbet.package.veunsaisiampang.community.story'
    },
    conservation: {
        title: 'Conservation Significance',
        description: 'The site protects critical rainforest habitat and serves as a sanctuary corridor for rare primates, forest birds, and native flora. Ethical wildlife rules keep the experience safe and non-intrusive for students and wildlife.',
        imageKey: 'cbet.package.veunsaisiampang.significance',
        ethicsRules: [
            { title: 'Respect Space', description: 'Keep a respectful distance from wildlife and follow guide instructions.', icon: 'paw' },
            { title: 'Silent Observation', description: 'No feeding, no flash photography, and keep noise low on trails.', icon: 'mute' },
            { title: 'Stay on Trail', description: 'Stay on marked paths to protect habitat and reduce erosion.', icon: 'trail' },
            { title: 'Leave No Trace', description: 'Pack out waste and avoid single-use plastics during the visit.', icon: 'leaf' }
        ]
    },
    seasonality: {
        title: 'Best Season & Changes',
        rangeStartMonth: 11,
        rangeEndMonth: 5,
        peakStartMonth: 12,
        peakEndMonth: 3,
        peakLabel: 'Peak Season',
        bestSeasonNote: 'Dry season offers safer trails, clearer river crossings, and higher wildlife visibility.',
        wetSeasonNote: 'Rain can limit access, reduce visibility, and increase leech activity on forest paths.'
    },
    impact: {
        title: 'Your Impact',
        subtitle: 'Impact sent on professional report',
        breakdown: [
            { label: 'Local Guides & Staff', value: 40, color: 'amber' },
            { label: 'Community Fund', value: 30, color: 'primary' },
            { label: 'Operations & Maintenance', value: 30, color: 'emerald' }
        ],
        localLabel: '100% Local'
    },
    quickFacts: [
        { label: 'Capacity', value: '15-35 students', icon: 'users' },
        { label: 'Facilities', value: 'Basic toilets, drinking water, shelter', icon: 'home' },
        { label: 'Best Season', value: 'Nov - Mar (dry season)', icon: 'sun' },
        { label: 'Difficulty', value: 'Moderate trekking', icon: 'mountain' },
        { label: 'Safety', value: 'First aid kit, local guides, permits', icon: 'shield' }
    ],
    accordion: [
        { title: 'FAQs', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at nisi non sapien gravida posuere a vitae massa.' },
        { title: 'Facilities', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies, nisi sit amet auctor viverra, massa lectus vehicula nisl, non sodales arcu mi id metus.' },
        { title: 'Seasonality', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. In sed lectus sed nibh sollicitudin convallis.' }
    ]
};
