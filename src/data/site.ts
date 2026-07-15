export const siteData = {
  heroBars: ['Architecture', 'Ingénierie', 'Coordination'],

  /* ═══════════════════════════════════════════
     VISION / ABOUT
     ═══════════════════════════════════════════ */
  vision: {
    eyebrow: 'Notre Vision',
    title: 'Une vision.\nUn groupe.\nUne transformation.',
    paragraphs: [
      'Fondé par Soukaina Elaouad, ingénieure civile et doctorante en architecture, ELAOUAD Architecture & Engineering Group est né d\'une conviction : les projets d\'exception exigent une expertise totale — de la conception architecturale à la gestion de projet, du BIM à l\'aménagement intérieur.',
      'En dix ans, le groupe a livré plus de 100 projets en résidentiel premium, commercial, urbanisme et design intérieur. Chaque réalisation porte la même signature : rigueur technique, esthétique maîtrisée et durabilité intégrée dès le premier trait.',
      'ELAOUAD ne construit pas des bâtiments. Nous sculptons les espaces où l\'avenir se vit.',
    ],
    stats: [
      { value: '100+', label: 'Projets livrés' },
      { value: '10', label: 'Années d\'expertise' },
      { value: '4', label: 'Continents' },
    ],
    image: '/assets/elaouad-plans-bim-interior.webp',
  },

  /* ═══════════════════════════════════════════
     FOUNDER
     ═══════════════════════════════════════════ */
  founder: {
    eyebrow: 'La Fondatrice',
    title: 'La Vision Derrière\nla Transformation',
    name: 'Soukaina Elaouad',
    role: 'Fondatrice & Architecte Ingénieure',
    intro: 'Ingénieure civile de formation, doctorante en architecture et manager de projets expérimentée, Soukaina Elaouad a créé ELAOUAD Group avec une idée centrale : l\'excellence architecturale ne doit jamais sacrifier la rigueur technique — ni l\'inverse.',
    philosophy: 'Sa méthode conjugue l\'approche scientifique de l\'ingénieur — chiffres, processus, optimisation — et la sensibilité créative de l\'architecte. Le résultat : des projets qui tiennent leurs promesses, esthétiquement et structurellement.',
    quote: 'L\'architecture est à la fois un acte artistique et une responsabilité technique. Chaque projet que nous livrons doit être beau, solide, durable et utile aux femmes et aux hommes qui l\'habiteront.',
    image: '/assets/soukaina-elaouad.jpeg',
  },

  /* ═══════════════════════════════════════════
     CORE SERVICES (5 premium categories)
     ═══════════════════════════════════════════ */
  coreServices: [
    {
      num: '01',
      title: 'Architecture',
      value: 'Des espaces qui racontent une histoire',
      description: 'Résidentiel de luxe, commercial, équipements publics — chaque projet intègre esthétique, fonctionnalité et durabilité pour créer des lieux de vie exceptionnels.',
      bullets: ['Conception architecturale complète', 'Permis et études réglementaires', 'Suivi de réalisation'],
    },
    {
      num: '02',
      title: 'BIM Consulting',
      value: 'Vos projets livrés 30% plus vite',
      description: 'Le Building Information Modeling d\'ELAOUAD réduit les imprévus chantier de 40% en moyenne grâce à une coordination numérique de précision.',
      bullets: ['Modélisation 3D complète', 'Coordination MEP et structure', 'Formation équipes projet'],
    },
    {
      num: '03',
      title: 'Ingénierie & PM',
      value: 'La complexité, maîtrisée',
      description: 'De la faisabilité à la réception des travaux, nous gérons la complexité pour que vous vous concentriez sur l\'essentiel.',
      bullets: ['Études techniques et structurelles', 'Planning et suivi budgétaire', 'Coordination tous corps d\'état'],
    },
    {
      num: '04',
      title: 'Design Intérieur',
      value: 'Des espaces qui incarnent votre identité',
      description: 'Chaque détail est pensé — matériaux, lumière, mobilier — pour créer une expérience mémorable qui reflète l\'identité unique de chaque client.',
      bullets: ['Concept design et moodboards', 'Sélection matériaux et fournitures', 'Direction artistique chantier'],
    },
    {
      num: '05',
      title: 'Urbanisme',
      value: 'Penser la ville de demain',
      description: 'Plans d\'aménagement, études d\'impact et développement durable à l\'échelle du territoire pour construire des villes plus humaines.',
      bullets: ['Plans de masse et zonage', 'Études d\'impact environnemental', 'Concertation et validation administrative'],
    },
  ],

  /* ═══════════════════════════════════════════
     PORTFOLIO (8 signature projects)
     ═══════════════════════════════════════════ */
  portfolio: [],

  /* ═══════════════════════════════════════════
     TESTIMONIALS
     ═══════════════════════════════════════════ */
  testimonials: [
    {
      quote: 'Le BIM d\'ELAOUAD nous a permis de détecter 23 conflits structurels avant le chantier. Résultat : 0 imprévu majeur, livraison à la date prévue.',
      author: 'Directeur technique',
      company: 'Groupe immobilier, Casablanca',
    },
    {
      quote: 'Nous cherchions un cabinet capable de gérer la complexité d\'un projet 5 000 m² avec des contraintes techniques sévères. ELAOUAD était le seul à proposer une équipe intégrée architecture + ingénierie.',
      author: 'CEO',
      company: 'Fonds d\'investissement',
    },
    {
      quote: 'Le FIDI est l\'événement incontournable de la décoration d\'intérieur en Afrique. En quatre éditions, nous avons signé des partenariats stratégiques sur 3 continents.',
      author: 'Directeur commercial',
      company: 'Fabricant matériaux',
    },
  ],

  /* ═══════════════════════════════════════════
     EVENTS
     ═══════════════════════════════════════════ */
  events: {
    eyebrow: 'ELAOUAD Events',
    title: 'Forum FIDI\n2026.',
    description: 'FIDI 2026 (Forum International de la Décoration d\'Intérieur) est le rendez-vous incontournable des professionnels du design d\'espace en Afrique. Organisé par le Groupe ELAOUAD, ce forum réunit en quatre éditions créateurs de renom, marques de prestige et décideurs du secteur pour dessiner les tendances de demain.',
    stats: [
      { value: '4ème', label: 'Édition FIDI' },
      { value: '500+', label: 'Professionnels' },
      { value: '30+', label: 'Conférenciers' },
    ],
    cta: 'Découvrir nos événements',
    image: '/assets/elaouad-events-formation.webp',
  },

  /* ═══════════════════════════════════════════
     LEGACY DATA (kept for backward compatibility)
     ═══════════════════════════════════════════ */
  services: [
    { num: '01', name: 'Architecture d\u2019intérieur', scope: 'Espaces, ambiances, matériaux, lumière.' },
    { num: '02', name: 'Plans de lotissements', scope: 'Organisation foncière, implantation, voirie.' },
    { num: '03', name: 'Urbanisme', scope: 'Vision territoriale, aménagement urbain.' },
    { num: '04', name: 'Topographie', scope: 'Lecture précise du terrain, relevés.' },
    { num: '05', name: 'Maîtrise d\u2019œuvre', scope: 'Suivi, coordination, contrôle qualité.' },
    { num: '06', name: 'Coordination des travaux', scope: 'Organisation des intervenants, suivi.' },
    { num: '07', name: 'Aménagements d\u2019espaces', scope: 'Espaces fonctionnels et esthétiques.' },
    { num: '08', name: 'Plans d\u2019aménagement', scope: 'Structuration, circulation, usages.' },
    { num: '09', name: 'BIM consulting', scope: 'Modélisation, coordination numérique.' },
    { num: '10', name: 'Études de faisabilité', scope: 'Potentiel, contraintes, viabilité.' },
  ],
  methodSteps: [
    { num: '01', title: 'Diagnostic & cadrage' },
    { num: '02', title: 'Étude de faisabilité' },
    { num: '03', title: 'Conception architecturale' },
    { num: '04', title: 'Développement technique' },
    { num: '05', title: 'Coordination & suivi' },
    { num: '06', title: 'Livraison & accompagnement' },
  ],
  ecosystem: [
    { num: '01', name: 'ELAOUAD Architecture et Ingénierie', text: 'Conception, études, coordination.' },
    { num: '02', name: 'EAI Events', text: 'Rencontres professionnelles et salons.' },
    { num: '03', name: 'EAI Courses / Formations', text: 'Transmission de compétences pratiques.' },
  ],
  contact: {
    email: 'contact@eai-construction.com',
    phone: '+212 666 798536 / +212 688018863',
    address: 'Casablanca, Maroc',
  },
  socials: [
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/elaouad-architecture-et-ingenierie', icon: 'linkedin' },
    { platform: 'Instagram', url: 'https://www.instagram.com/elaouad_architectureingenierie/', icon: 'instagram' },
    { platform: 'Facebook', url: 'https://www.facebook.com/elaouad.architecture.ingenierie', icon: 'facebook' },
  ],
  conception3D: {
    eyebrow: 'Conception 3D',
    title: 'Visualisez avant d\'exécuter',
    announcement: 'PRESTATION CLÉ : La conception 3D chez EAI est une étape essentielle pour valider le design, l\'éclairage et les volumes de votre projet avant travaux, réduisant les risques d\'ajustement sur chantier.',
    description: 'Chez EAI, nous aidons nos clients à visualiser, valider et affiner leur espace avant l\'exécution des travaux. Grâce à nos rendus 3D photoréalistes, chaque détail est maîtrisé.',
    categories: [
      { name: 'Cuisine', image: '/assets/c3d_cuisine.png', description: 'Cuisines ergonomiques et esthétiques, pensées pour l\'usage quotidien.' },
      { name: 'Bureau', image: '/assets/c3d_bureau.png', description: 'Espaces de travail optimisés pour la concentration et le bien-être.' },
      { name: 'Villa', image: '/assets/c3d_villa.png', description: 'Villas de prestige avec un design intérieur d\'exception.' },
      { name: 'Appartement', image: '/assets/c3d_appartement.png', description: 'Optimisation de l\'espace pour des appartements urbains élégants.' },
      { name: 'Dressing', image: '/assets/c3d_dressing.png', description: 'Dressings sur mesure alliant rangement et design.' },
      { name: 'Salle d\'eau', image: '/assets/c3d_salle_eau.png', description: 'Salles de bain modernes, apaisantes et fonctionnelles.' },
      { name: 'Chambre', image: '/assets/c3d_chambre.png', description: 'Chambres à coucher conçues pour le repos et l\'élégance.' },
      { name: 'Pièce de vie', image: '/assets/c3d_piece_de_vie.png', description: 'Salons et séjours chaleureux, véritables cœurs de la maison.' },
    ]
  },
  turnkeyServices: {
    eyebrow: 'Clé en main',
    title: 'Services d\'aménagement clé en main',
    description: 'Une gestion intégrale de votre projet, de l\'idée à la remise des clés.',
    benefits: [
      'Un interlocuteur unique et coordonné',
      'Un meilleur contrôle du budget',
      'Une cohérence totale entre conception et exécution',
      'Une réduction des risques de coordination',
      'Une supervision de projet professionnelle',
      'Une planification claire et respectée',
      'Une livraison axée sur la qualité'
    ],
    steps: [
      { num: '01', title: 'Brief client' },
      { num: '02', title: 'Relevé sur site' },
      { num: '03', title: 'Concept intérieur' },
      { num: '04', title: 'Plans 2D' },
      { num: '05', title: 'Conception 3D' },
      { num: '06', title: 'Choix des matériaux' },
      { num: '07', title: 'Préparation du budget' },
      { num: '08', title: 'Coordination technique' },
      { num: '09', title: 'Exécution' },
      { num: '10', title: 'Contrôle qualité' },
      { num: '11', title: 'Livraison finale' },
    ]
  },
  approachSteps: [
    { num: '01', title: 'Découverte et brief client', desc: 'Compréhension approfondie de vos besoins.' },
    { num: '02', title: 'Visite et relevé du site', desc: 'Analyse technique et spatiale des lieux.' },
    { num: '03', title: 'Analyse des besoins et du budget', desc: 'Cadrage économique du projet.' },
    { num: '04', title: 'Moodboard et direction créative', desc: 'Définition de l\'identité visuelle.' },
    { num: '05', title: 'Plans d\'aménagement 2D', desc: 'Structuration et flux de circulation.' },
    { num: '06', title: 'Conception et visualisation 3D', desc: 'Projections photoréalistes de l\'espace.' },
    { num: '07', title: 'Choix des matériaux et finitions', desc: 'Sélection soignée des textures et couleurs.' },
    { num: '08', title: 'Validation technique', desc: 'Vérification de la faisabilité.' },
    { num: '09', title: 'Planification et exécution', desc: 'Suivi rigoureux des travaux.' },
    { num: '10', title: 'Contrôle qualité et livraison', desc: 'Réception sans réserves.' }
  ],
  trainingOffer: {
    eyebrow: 'Formation & Expertise',
    title: 'Devenez un professionnel de l\'aménagement',
    description: 'EAI partage son expertise à travers des formations pratiques et orientées marché. Maîtrisez le design d\'intérieur, la modélisation 3D, et la gestion de projet.',
    topics: ['Design d\'intérieur résidentiel', 'Maîtrise des logiciels 3D et BIM', 'Coordination de chantier pour aménagements', 'Choix des matériaux et éclairage'],
    videoUrl: '/assets/formation.jpeg',
    externalUrl: 'https://courses.eai-construction.com' // Placeholder to be verified
  },
  mayushDesign: {
    eyebrow: 'Mayush Design',
    title: 'Découvrez notre plateforme d\'équipement intérieur',
    description: 'Accédez à une sélection pointue de mobilier et d\'objets de décoration à travers notre plateforme dédiée, Mayush Design.',
    url: 'https://mayushdesign.com',
    categories: [
      'Mobilier', 'Éclairage', 'Décoration', 'Cuisine', 'Dressing', 'Salle de bain', 'Mobilier de bureau', 'Accessoires intérieurs'
    ],
    image: '/assets/elaouad-after-interior.webp'
  },
  careers: [
    {
      id: 'interior-designer',
      title: 'Architecte d\'Intérieur Senior',
      department: 'Design',
      location: 'Casablanca, Maroc',
      contractType: 'CDI',
      experienceLevel: '5+ années',
      publishedAt: '2026-07-01',
      description: 'Nous recherchons un(e) architecte d\'intérieur passionné(e) pour concevoir et superviser des projets résidentiels et professionnels premium.',
      responsibilities: [
        'Élaboration des concepts créatifs et moodboards.',
        'Production de plans 2D détaillés et modèles 3D.',
        'Sélection des matériaux et relation avec les fournisseurs.',
        'Suivi architectural des chantiers.'
      ],
      requirements: [
        'Diplôme en Architecture d\'Intérieur.',
        'Maîtrise d\'AutoCAD, SketchUp, 3ds Max/V-Ray.',
        'Solide expérience en gestion de projets clés en main.'
      ]
    }
  ],
  locationMap: {
    address: 'Casablanca, Maroc',
    lat: 33.521534,
    lng: -7.639031,
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.225043258565!2d-7.639030923381117!3d33.52153414556517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda62d9cf51ddc95%3A0xe0baa79443c99b0d!2sElaouad%20Architecture%20et%20Ingenierie!5e0!3m2!1sen!2sus!4v1783786316071!5m2!1sen!2sus',
    directionsUrl: 'https://maps.app.goo.gl/neBRKnuFxWP7xwxK8'
  },
  images: {
    hero: '/assets/elaouad-hero-villa.webp',
    expertise: '/assets/elaouad-plans-bim-interior.webp',
    before: '/assets/elaouad-before-sketch.png',
    after: '/assets/elaouad-after-interior.webp',
    ecosystem: '/assets/elaouad-events-formation.webp',
  }
};
