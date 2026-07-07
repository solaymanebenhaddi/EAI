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
  portfolio: [
    { 
      name: 'Résidence Privée', category: 'Résidentiel', year: '2025', location: 'Casablanca', image: '/assets/residence-casablanca.png', 
      description: 'Projet de construction d\'une résidence privée à Casablanca, avec accompagnement des études, du suivi de chantier et des aménagements intérieurs et extérieurs.',
      facts: [
        { label: 'Client', value: 'Privé' },
        { label: 'Surface', value: '400 m²' },
        { label: 'Délai', value: '8 mois' }
      ],
      missions: [
        'Études architecturales et techniques',
        'Suivi des travaux',
        'Aménagements extérieurs',
        'Aménagements intérieurs'
      ]
    },
    { 
      name: 'Résidence Privée', category: 'Résidentiel', year: '2024', location: 'Marrakech', image: '/assets/residence-marrakech.png', 
      description: 'Projet de construction d\'une résidence privée à Marrakech, avec études, suivi des travaux et coordination des aménagements intérieurs et extérieurs.',
      facts: [
        { label: 'Client', value: 'Privé' },
        { label: 'Usage', value: 'Résidentiel' },
        { label: 'Surface', value: '550 m²' },
        { label: 'Délai', value: '18 mois' }
      ],
      missions: [
        'Études',
        'Suivi des travaux',
        'Aménagements extérieurs',
        'Aménagements intérieurs'
      ]
    },
    { 
      name: 'Ferme Agricole', category: 'Agricole', year: '2024', location: 'Agadir', image: '/assets/parking-ferme-agadir.png', 
      description: 'Mission d\'aménagement de parkings pour une ferme, pensée pour les usages agricoles, les circulations, la performance des équipements et l\'optimisation jusqu\'à réception.',
      facts: [
        { label: 'Site', value: 'Ferme agricole' },
        { label: 'Mission', value: 'Études, conception 3D et suivi' },
        { label: 'Approche', value: 'Technique, économique et durable' }
      ],
      missions: [
        'Analyse des besoins spécifiques du site',
        'Études techniques et financières',
        'Adaptation aux pratiques agricoles',
        'Conception 3D des aménagements',
        'Assistance au choix des équipements écoénergétiques',
        'Recommandation des matériaux et fournisseurs',
        'Visites régulières de chantier',
        'Optimisation du projet jusqu\'à la réception finale'
      ]
    },
    { 
      name: 'Serre Agricole', category: 'Agro-industriel', year: '2025', location: 'Ben Guérir', image: '/assets/serre-agricole-benguerir.png', 
      description: 'Projet d\'infrastructure agricole technique intégrant hygiène, sécurité, stockage, gestion environnementale des déchets et optimisation des flux opérationnels.',
      facts: [
        { label: 'Localisation', value: 'Ben Guérir' },
        { label: 'Nature', value: 'Serre agricole / infrastructure technique' },
        { label: 'Mission', value: 'Conception fonctionnelle et réglementaire' }
      ],
      missions: [
        'Conception respectant les normes d\'hygiène et de sécurité',
        'Organisation des zones de réception, chambres froides et espaces de stockage',
        'Intégration d\'un système de gestion des déchets respectueux de l\'environnement',
        'Aménagement fonctionnel pour optimiser le flux des opérations',
        'Respect des réglementations locales et internationales'
      ]
    },
    { 
      name: 'Abattoir Alf Sahel', category: 'Agro-industriel', year: '2024', location: 'Maroc', image: '/assets/abattoir-alf-sahel.png', 
      description: 'Conception d\'un abattoir moderne répondant aux standards internationaux, avec organisation des flux, zones spécialisées et exigences sanitaires renforcées.',
      facts: [
        { label: 'Programme', value: 'Abattoir moderne' },
        { label: 'Standards', value: 'Hygiène, sécurité et traçabilité' },
        { label: 'Approche', value: 'Flux, conformité et distribution' }
      ],
      missions: [
        'Conception d\'un abattoir répondant aux standards internationaux',
        'Zones dédiées à la réception des animaux, l\'abattage, le froid, la découpe et le conditionnement',
        'Système de gestion des déchets écoresponsable',
        'Flux opérationnel optimisé pour hygiène, sécurité et efficacité',
        'Infrastructures adaptées au bien-être animal',
        'Conformité aux réglementations sanitaires',
        'Localisation pensée pour faciliter la distribution régionale'
      ]
    },
    { 
      name: 'Ferme d\'Élevage', category: 'Agricole', year: '2023', location: 'Had Soualem', image: '/assets/elevage-had-soualem.png', 
      description: 'Projet de ferme d\'élevage moderne combinant bâtiments adaptés, espaces de soins, systèmes environnementaux et intégration paysagère en contexte rural.',
      facts: [
        { label: 'Localisation', value: 'Had Soualem' },
        { label: 'Programme', value: 'Élevage bovin, ovin ou avicole' },
        { label: 'Objectif', value: 'Production durable et rendement local' }
      ],
      missions: [
        'Conception d\'une ferme d\'élevage moderne',
        'Infrastructures adaptées pour bovins, ovins ou volailles',
        'Espaces optimisés pour hébergement, alimentation et soins vétérinaires',
        'Gestion de l\'eau et des déchets respectueuse de l\'environnement',
        'Aménagement paysager intégré au contexte rural',
        'Recherche d\'une production durable et d\'un meilleur rendement agricole local'
      ]
    },
    { 
      name: 'Projet Ouled Saleh', category: 'Études & Suivi', year: '2024', location: 'Ouled Saleh', image: '/assets/etudes-ouled-saleh.png', 
      description: 'Mission complète d\'étude, de conception, d\'ingénierie, de suivi administratif et de gestion de chantier pour structurer le projet de manière cohérente.',
      facts: [
        { label: 'Localisation', value: 'Ouled Saleh' },
        { label: 'Mission', value: 'Études, conception et suivi' },
        { label: 'Pilotage', value: 'Délais, budget et qualité' }
      ],
      missions: [
        'Études préliminaires des besoins, de la faisabilité et des contraintes',
        'Conception architecturale adaptée au site et au client',
        'Ingénierie technique, calculs structuraux et dimensionnement des réseaux',
        'Suivi administratif, autorisations et conformité réglementaire',
        'Gestion de chantier, coordination et contrôle qualité',
        'Suivi des délais et du budget',
        'Solutions durables et optimisation de l\'efficacité du projet'
      ]
    },
    { 
      name: 'Formation Numérique', category: 'Formation', year: '2023', location: 'Maroc', image: '/assets/formation.jpeg', 
      description: 'Formation destinée aux acteurs de l\'architecture, du génie civil et de la construction pour renforcer la maîtrise des outils numériques essentiels aux projets modernes.',
      facts: [
        { label: 'Public', value: 'Architectes, ingénieurs, étudiants, techniciens' },
        { label: 'Objectif', value: 'Compétences numériques appliquées' },
        { label: 'Positionnement', value: 'Innovation, efficacité et pratique professionnelle' }
      ],
      missions: [
        'Former les architectes, ingénieurs civils, étudiants, techniciens et professionnels',
        'Développer la maîtrise des outils numériques de construction et d\'architecture',
        'Relier apprentissage logiciel, innovation et efficacité opérationnelle',
        'Préparer les participants à des projets de construction modernes'
      ]
    },
  ],

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
      quote: 'Le FIC est l\'événement incontournable de la construction en Afrique. En trois éditions, nous avons signé des partenariats stratégiques sur 3 continents.',
      author: 'Directeur commercial',
      company: 'Fabricant matériaux',
    },
  ],

  /* ═══════════════════════════════════════════
     EVENTS
     ═══════════════════════════════════════════ */
  events: {
    eyebrow: 'ELAOUAD Events',
    title: 'Construire,\nréunir et transmettre.',
    description: 'ELAOUAD Events organise des rencontres professionnelles qui façonnent l\'avenir de la construction en Afrique. Le Forum International de la Construction (FIC) réunit chaque année les décideurs, innovateurs et talents du secteur.',
    stats: [
      { value: '3', label: 'Éditions FIC' },
      { value: '2000+', label: 'Participants' },
      { value: '15', label: 'Pays représentés' },
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
    phone: '+212 520 19 87 38',
    address: 'Casablanca, Maroc',
  },
  images: {
    hero: '/assets/elaouad-hero-villa.webp',
    expertise: '/assets/elaouad-plans-bim-interior.webp',
    before: '/assets/elaouad-before-sketch.png',
    after: '/assets/elaouad-after-interior.webp',
    ecosystem: '/assets/elaouad-events-formation.webp',
  }
};
