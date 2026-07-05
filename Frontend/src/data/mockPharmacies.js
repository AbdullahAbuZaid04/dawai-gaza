export const pharmacies = [
  {
    id: 1,
    name: "صيدلية الرمال",
    category: "general",
    licenseNumber: "PH-2023-0001",
    verified: true,
    rating: 4.7,
    reviewsCount: 186,

    location: "غزة - حي الرمال",
    lat: 31.518141,
    lng: 34.452856,

    working: {
      open: "طوال اليوم",
      is24h: true,
    },

    delivery: {
      available: true,
      price: 5,
    },

    services: ["قياس ضغط", "قياس سكر", "توصيل", "استشارات دوائية"],

    connect: {
      email: "remal@gmail.com",
      phoneNumber: "0599102511",
    },

    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.258225089072!2d34.4569280507565!3d31.51706698104049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14fd7f5ec6aca111%3A0xdd65a45495d6e1d6!2z2LXZitiv2YTZitipINin2YTYsdmF2KfZhCAtIEFsUmVtYWwuUGhhcm1hY3k!5e0!3m2!1sar!2s!4v1769321658537!5m2!1sar!2s",

    medicines: [
      {
        id: "1-101",
        category: "analgesic",
        categoryAr: "مسكن",
        nameAr: "باراسيتامول",
        price: 10,
        available: false,
        prescriptionRequired: false,
        dateAdded: "2026-02-02",
      },
      {
        id: "1-102",
        category: "antibiotic",
        categoryAr: "مضاد حيوي",
        nameAr: "أموكسيسيلين",
        price: 15,
        available: true,
        prescriptionRequired: true,
        dateAdded: "2026-02-05",
      },
      {
        id: "1-103",
        category: "analgesic",
        categoryAr: "مسكن",
        nameAr: "بنادول",
        price: 12,
        available: true,
        prescriptionRequired: false,
        dateAdded: "2026-02-10",
      },
    ],
  },

  {
    id: 2,
    name: "صيدلية الأسرة فارما كير",
    category: "specialized",
    licenseNumber: "PH-2023-0002",
    verified: true,
    rating: 4.5,
    reviewsCount: 92,

    location: "خان يونس",
    lat: 31.345189469915955,
    lng: 34.29995357742547,

    working: {
      open: "8 صباحاً",
      close: "12:30 صباحاً",
      is24h: false,
    },

    delivery: {
      available: false,
    },

    services: ["أدوية أطفال", "استشارات"],

    connect: {
      email: "osra@gmail.com",
      phoneNumber: "0599195350",
    },

    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5019.111906110576!2d34.307799663932514!3d31.34306376972887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14fd91f96e1682f9%3A0x38ba060600022535!2z2LXZitiv2YTZitipINin2YTYp9iz2LHYqSDZgdin2LHZhdinINmD2YrYsQ!5e0!3m2!1sar!2s!4v1770283633785!5m2!1sar!2s",
    medicines: [
      {
        id: "2-201",
        category: "analgesic",
        categoryAr: "مسكن",
        nameAr: "باراسيتامول",
        price: 9,
        available: true,
        prescriptionRequired: false,
        dateAdded: "2026-01-01",
      },
    ],
  },

  {
    id: 3,
    name: "صيدلية مسلم",
    category: "specialized",
    licenseNumber: "PH-2023-0004",
    verified: true,
    rating: 4.8,
    reviewsCount: 210,

    location: "ديرالبلح - مستشفى شهداء الأقصى",
    lat: 31.42056563705439,
    lng: 34.35992153962316,

    working: {
      open: "طوال اليوم",
      is24h: true,
    },

    delivery: {
      available: true,
      price: 4,
    },

    services: ["أدوية مستشفيات", "أجهزة طبية"],

    connect: {
      email: "musallam@gmail.com",
      phoneNumber: "0590000000",
    },

    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462.2183146054213!2d34.36026419180948!3d31.420353341352957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14fd850627d67827%3A0xa50812e41cf55549!2z2LXZitiv2YTZitipINmF2LPZhNmF!5e0!3m2!1sar!2s!4v1770284180294!5m2!1sar!2s",

    medicines: [
      {
        id: "4-401",
        category: "vitamin",
        categoryAr: "فيتامين",
        nameAr: "مالتي فيتامين",
        price: 35,
        available: true,
        prescriptionRequired: false,
        dateAdded: "2026-02-01",
      },
      {
        id: "4-501",
        category: "panadol",
        categoryAr: "بنادول",
        nameAr: "بنادول",
        price: 5,
        available: true,
        prescriptionRequired: false,
        dateAdded: "2026-02-12",
      },
    ],
  },
];
