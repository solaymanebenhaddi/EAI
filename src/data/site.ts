export type Locale = 'fr' | 'en' | 'ar';

type LocalizedText = Record<Locale, string>;

interface LocalizedProject {
  slug: string;
  title: LocalizedText;
  category: LocalizedText;
  location: LocalizedText;
  year: string;
  image: string;
  client: LocalizedText;
  surface: string;
  status: LocalizedText;
  description: LocalizedText;
  gallery: string[];
}

interface LocalizedService {
  id: string;
  title: LocalizedText;
  value: LocalizedText;
  description: LocalizedText;
  bullets: Record<Locale, string[]>;
  image: string;
}

interface LocalizedEvent {
  slug: string;
  title: LocalizedText;
  date: LocalizedText;
  startDate: string;
  endDate: string;
  location: LocalizedText;
  type: LocalizedText;
  description: LocalizedText;
  image: string;
  cta: LocalizedText;
}

interface LocalizedTestimonial {
  text: LocalizedText;
  name: string;
  title: LocalizedText;
  proof: LocalizedText;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
  client: string;
  surface: string;
  status: string;
  description: string;
  gallery: string[];
}

export interface Service {
  id: string;
  title: string;
  value: string;
  description: string;
  bullets: string[];
  image: string;
}

export interface EventItem {
  slug: string;
  title: string;
  date: string;
  startDate: string;
  endDate: string;
  location: string;
  type: string;
  description: string;
  image: string;
  cta: string;
}

export interface Testimonial {
  text: string;
  name: string;
  title: string;
  proof: string;
}

const text = (fr: string, en: string, ar: string): LocalizedText => ({ fr, en, ar });

const pick = (value: LocalizedText, locale: Locale) => value[locale] ?? value.fr;

export const projectStats = [
  { value: '50+', label: text('Projets', 'Projects', 'مشاريع') },
  { value: '10K+', label: text('Visiteurs FIDI', 'FIDI Visitors', 'زوار FIDI') },
  { value: '1', label: text('Équipe intégrée', 'Integrated Team', 'فريق متكامل') },
];

export const manifestoStats = [
  { value: 8, suffix: '+', label: text('Années d’expertise', 'Years of expertise', 'سنوات خبرة') },
  { value: 50, suffix: '+', label: text('Projets & Études', 'Projects & Studies', 'مشاريع ودراسات') },
  { value: 1, suffix: '', label: text('Équipe intégrée', 'Integrated team', 'فريق متكامل') },
  { value: 100, suffix: '%', label: text('Engagement de livraison', 'Delivery commitment', 'التزام التسليم') },
];

const localizedServices: LocalizedService[] = [
  {
    id: '01',
    title: text('Architecture', 'Architecture', 'الهندسة المعمارية'),
    value: text('Concevoir des lieux avec sens, précision et caractère.', 'Designing spaces with meaning, precision, and character.', 'تصميم المساحات بمعنى ودقة وشخصية.'),
    description: text(
      "Nous développons des projets architecturaux qui répondent aux usages, au contexte et à l’identité du client. Chaque conception est pensée pour équilibrer esthétique, fonctionnalité, réglementation, faisabilité et durabilité.",
      'We develop architectural projects that respond to the uses, context, and identity of the client. Each design is conceived to balance aesthetics, functionality, regulation, feasibility, and sustainability.',
      'نحن نطور مشاريع معمارية تستجيب للاستخدامات والسياق وهوية العميل. تم تصميم كل تصميم لتحقيق التوازن بين الجمال والوظيفة والتنظيم والجدوى والاستدامة.'
    ),
    bullets: {
      fr: ['Conception architecturale', 'Plans et dossiers de permis', 'Optimisation des espaces', 'Coordination avec les études techniques', 'Accompagnement jusqu’à la réalisation'],
      en: ['Architectural design', 'Permit plans and dossiers', 'Space optimization', 'Coordination with technical studies', 'Support until realization'],
      ar: ['التصميم المعmاري', 'خطط وملفات الترخيص', 'تحسين المساحة', 'التنسيق مع الدراسات الفنية', 'الدعم حتى الإنجاز'],
    },
    image: '/images/service1.webp',
  },
  {
    id: '02',
    title: text('Ingénierie & études techniques', 'Engineering & technical studies', 'الهندسة والدраسات الفنية'),
    value: text('Transformer la vision architecturale en solution maîtrisée.', 'Transforming the architectural vision into a controlled solution.', 'تحويل الرؤية المعمارية إلى حل هندسي متكامل.'),
    description: text(
      "Nos études techniques permettent d’analyser, structurer et fiabiliser les projets avant et pendant leur réalisation. L’objectif est de réduire les imprévus, clarifier les décisions et garantir une exécution cohérente.",
      'Our technical studies allow us to analyze, structure, and secure projects before and during their realization. The goal is to reduce unforeseen issues, clarify decisions, and guarantee coherent execution.',
      'تسمح لنا دراساتنا الفنية بتحليل المشاريع وهيكلتها وتأمينها قبل وأثناء إنجازها. الهدف هو تقليل المشكلات غير المتوقعة وتوضيح القرارات وضمان التنفيذ المتماسك.'
    ),
    bullets: {
      fr: ['Études techniques et économiques', 'Calculs et analyse structurelle', 'Études de faisabilité', 'Estimation des coûts', 'Préparation des dossiers techniques'],
      en: ['Technical and economic studies', 'Calculations and structural analysis', 'Feasibility studies', 'Cost estimation', 'Preparation of technical dossiers'],
      ar: ['الدراسات الفنية والاقتصادية', 'الحسابات والتحليل الهيكلي', 'دراسات الجدوى', 'تقدير التكاليف', 'إعداد الملفات الفنية'],
    },
    image: '/images/service3.webp',
  },
  {
    id: '03',
    title: text('BIM Consulting', 'BIM Consulting', 'استشارات BIM'),
    value: text('La précision numérique au service du projet réel.', 'Digital precision at the service of the real project.', 'الدقة الرقمية في خدمة المشروع الحقيقي.'),
    description: text(
      "Le BIM permet de mieux concevoir, coordonner et anticiper. Nous accompagnons les projets dans la modélisation, la coordination et l’exploitation des données afin de réduire les conflits techniques et améliorer la lecture globale du projet.",
      'BIM enables better design, coordination, and anticipation. We support projects in modeling, coordination, and data exploitation in order to reduce technical conflicts and improve the overall reading of the project.',
      'تتيح نمذجة معلومات البناء تصميمًا وتنسيقًا وتوقعًا أفضل. نحن ندعم المشاريع في النمذجة والتنسيق واستغلال البيانات من أجل تقليل التعارضات الفنية وتحسين القراءة العامة للمشروع.'
    ),
    bullets: {
      fr: ['Modélisation 3D', 'Coordination interdisciplinaire', 'Détection des conflits', 'Optimisation des échanges techniques', 'Support à la gestion du projet'],
      en: ['3D modeling', 'Interdisciplinary coordination', 'Conflict detection', 'Optimization of technical exchanges', 'Support for project management'],
      ar: ['النمذجة ثلاثية الأبعاد', 'التنسيق بين التخصصات', 'كشف التعارضات', 'تحسين التبادلات الفنية', 'الدعم لإدارة المشاريع'],
    },
    image: '/images/service2.webp',
  },
  {
    id: '04',
    title: text('Maîtrise d’œuvre & coordination', 'Works coordination & project management', 'إدارة المشاريع وتنسيق الأشغال'),
    value: text('Piloter le chantier avec méthode, clarté et exigence.', 'Steering the construction site with method, clarity, and standards.', 'قيادة ورش البناء بمنهجية ووضوح ومعايير عالية.'),
    description: text(
      "Nous assurons le suivi, la coordination et le contrôle des différentes phases du chantier. Notre rôle est de maintenir l’alignement entre conception, qualité d’exécution, délais, budget et attentes du maître d’ouvrage.",
      'We ensure the monitoring, coordination, and control of the different phases of the construction site. Our role is to maintain alignment between design, execution quality, deadlines, budget, and the client\'s expectations.',
      'نحن نضمن المراقبة والتنسيق والتحكم في المراحل المختلفة لورش البناء. دورنا هو الحفاظ على التوافق entre التصميم وجودة التنفيذ والمواعيد النهائية والميزانية وتوقعات العميل.'
    ),
    bullets: {
      fr: ['Suivi de chantier', 'Coordination des entreprises', 'Contrôle qualité', 'Gestion des délais', 'Reporting technique'],
      en: ['Site monitoring', 'Company coordination', 'Quality control', 'Deadline management', 'Technical reporting'],
      ar: ['مراقبة الموقع', 'تنسيق الشركات', 'مراقبة الجودة', 'إدارة المواعيد النهائية', 'التقارير الفنية'],
    },
    image: '/images/service3.webp',
  },
  {
    id: '05',
    title: text('Design intérieur', 'Interior Design', 'التصميم الداخلي'),
    value: text('Créer des expériences spatiales cohérentes, élégantes et fonctionnelles.', 'Creating coherent, elegant, and functional spatial experiences.', 'خلق تجارب مكانية متماسكة وأنيقة وعملية.'),
    description: text(
      "Nous concevons des intérieurs où chaque détail participe à l’expérience globale : circulation, lumière, matières, mobilier, ergonomie et atmosphère. L’objectif est de créer des espaces à la fois beaux, confortables et parfaitement adaptés aux usages.",
      'We design interiors where every detail contributes to the overall experience: circulation, light, materials, furniture, ergonomics, and atmosphere. The goal is to create spaces that are beautiful, comfortable, and perfectly adapted to use.',
      'نحن نصمم تصميمات داخلية حيث يساهم كل تفصيل في التجربة العامة: الحركة، الضوء، المواد، الأثاث، بيئة العمل، والأجواء. الهدف هو خلق مساحات جميلة ومريحة ومتكيفة تمامًا مع الاستخدام.'
    ),
    bullets: {
      fr: ['Concept intérieur', 'Plans d’aménagement', 'Choix des matériaux', 'Moodboards et ambiance', 'Accompagnement réalisation'],
      en: ['Interior concept', 'Layout plans', 'Material selection', 'Moodboards and atmosphere', 'Support during realization'],
      ar: ['مفهوم التصميم الداخلي', 'خطط التخطيط', 'اختيار المواد', 'لوحات المزاج والأجواء', 'الدعم أثناء الإنجاز'],
    },
    image: '/images/service1.webp',
  },
  {
    id: '06',
    title: text('Urbanisme & aménagement', 'Urbanism & masterplanning', 'التعمير والتخطيط'),
    value: text('Penser l’espace à l’échelle du territoire.', 'Thinking about space at the territorial scale.', 'التفكير في المساحة على مستوى المجال الترابي.'),
    description: text(
      "Nous accompagnons les projets d’aménagement urbain, d’espaces publics et privés, de lotissements et de planification territoriale avec une approche durable, fonctionnelle et adaptée au contexte local.",
      'We support urban development projects, public and private spaces, subdivisions, and territorial planning with a sustainable, functional approach adapted to the local context.',
      'نحن ندعم مشاريع التنمية الحضرية، والمساحات العامة والخاصة، والتجزئة، والتخطيط الترابي بنهج مستدام وعملي يتكيف مع السياق المحلي.'
    ),
    bullets: {
      fr: ['Plans d’aménagement', 'Plans de lotissement', 'Espaces publics et privés', 'Analyse urbaine', 'Solutions durables'],
      en: ['Development plans', 'Subdivision plans', 'Public and private spaces', 'Urban analysis', 'Sustainable solutions'],
      ar: ['مخططات التهيئة', 'مخططات التجزئة', 'المساحات العامة والخاصة', 'التحليل الحضري', 'الحلول المستدامة'],
    },
    image: '/images/service2.webp',
  },
  {
    id: '07',
    title: text('Topographie', 'Topography', 'المسح الطبوغرافي'),
    value: text('Comprendre le terrain avant de transformer le projet.', 'Understanding the terrain before transforming the project.', 'فهم الأرض قبل تحويل المشروع.'),
    description: text(
      "Les relevés et données topographiques constituent une base essentielle pour sécuriser la conception et la réalisation. Nous intégrons cette lecture du terrain dans une démarche globale de précision et de maîtrise technique.",
      'Topographical surveys and data constitute an essential base for securing design and realization. We integrate this reading of the terrain into a global approach of precision and technical control.',
      'تشكل المسوحات والبيانات الطبوغرافية قاعدة أساسية لتأمين التصميم والإنجاز. نحن ندمج هذه القراءة للأرض في نهج عالمي من الدقة والتحكم الفني.'
    ),
    bullets: {
      fr: ['Relevés du terrain', 'Analyse des contraintes', 'Support aux études', 'Base technique pour la conception', 'Fiabilisation des décisions'],
      en: ['Terrain surveys', 'Constraint analysis', 'Support for studies', 'Technical base for design', 'Reliability of decisions'],
      ar: ['مسوحات الأراضي', 'تحليل القيود', 'دعم الدراسات', 'القاعدة الفنية للتصميم', 'موثوقية القرارات'],
    },
    image: '/images/service3.webp',
  },
  {
    id: '08',
    title: text('Formations professionnelles', 'Professional training', 'التكوين المهني'),
    value: text('Transmettre les compétences qui construisent les métiers de demain.', 'Transmitting the skills that build tomorrow\'s professions.', 'نقل المهارات التي تبني مهن الغد.'),
    description: text(
      "À travers ELAOUAD Courses, nous développons des formations spécialisées en architecture, construction, BIM, gestion de projet, logiciels 3D, design intérieur et conduite de chantier. Notre objectif est de former des profils opérationnels, compétents et alignés avec les besoins réels du marché.",
      'Through ELAOUAD Courses, we develop specialized training in architecture, construction, BIM, project management, 3D software, interior design, and site supervision. Our goal is to train operational, competent profiles aligned with real market needs.',
      'من خلال دورات ELAOUAD، نطور تدريبًا متخصصًا في الهندسة المعمارية، والبناء، ونمذجة معلومات البناء، وإدارة المشاريع، والبرمجيات ثلاثية الأبعاد، والتصميم الداخلي، والإشراف على الموقع. هدفنا هو تدريب الكفاءات التشغيلية والمؤهلة المتوافقة مع احتياجات السوق الحقيقية.'
    ),
    bullets: {
      fr: ['BIM, Revit, AutoCAD, SketchUp, 3ds Max', 'Gestion de projets de construction', 'Conduite de chantier', 'Décoration et design intérieur', 'Formations pratiques et professionnalisantes'],
      en: ['BIM, Revit, AutoCAD, SketchUp, 3ds Max', 'Construction project management', 'Site supervision', 'Decoration and interior design', 'Practical and professionalizing training'],
      ar: ['BIM، Revit، AutoCAD، SketchUp، 3ds Max', 'إدارة مشاريع البناء', 'الإشراف على الموقع', 'الديكور والتصميم الداخلي', 'التدريب العملي والمهني'],
    },
    image: '/images/service1.webp',
  },
];

const localizedProjects: LocalizedProject[] = [
  {
    slug: 'villa-privee-casablanca',
    title: text('Villa privée', 'Private Villa', 'فيلا خاصة'),
    category: text('Architecture résidentielle', 'Residential architecture', 'عمارة سكنية'),
    location: text('Casablanca, Maroc', 'Casablanca, Morocco', 'الدار البيضاء، المغرب'),
    year: '2025',
    image: '/images/project1.webp',
    client: text('Client privé', 'Private client', 'عميل خاص'),
    surface: '950 m²',
    status: text('En cours', 'In progress', 'جاري الإنجاز'),
    description: text(
      "Une villa contemporaine pensée pour conjuguer qualité spatiale, précision technique et expérience d’usage en milieu urbain.",
      'A contemporary villa designed to combine spatial quality, technical precision, and experience of use in an urban environment.',
      'فيلا معاصرة مصممة للجمع بين جودة المساحة والدقة الفنية وتجربة الاستخدام في بيئة حضرية.'
    ),
    gallery: ['/images/project1.webp', '/images/project2.webp', '/images/project3.webp'],
  },
  {
    slug: 'projet-residentiel-marrakech',
    title: text('Projet résidentiel', 'Residential Project', 'مشروع سكني'),
    category: text('Résidentiel premium', 'Premium residential', 'سكن راق'),
    location: text('Marrakech, Maroc', 'Marrakech, Morocco', 'مراكش، المغرب'),
    year: '2024',
    image: '/images/project2.webp',
    client: text('Promoteur immobilier', 'Real estate developer', 'مطور عقاري'),
    surface: '12 000 m²',
    status: text('Livré', 'Delivered', 'منجز'),
    description: text(
      "Un ensemble résidentiel haut de gamme privilégiant les seuils, les patios traditionnels et l'apport de lumière naturelle.",
      'A high-end residential complex focusing on thresholds, traditional patios, and the intake of natural light.',
      'مجمع سكني راق يركز على العتبات والفناءات التقليدية وتدفق الضوء الطبيعي.'
    ),
    gallery: ['/images/project2.webp', '/images/project3.webp', '/images/project4.webp'],
  },
  {
    slug: 'espace-professionnel-rabat',
    title: text('Espace professionnel', 'Professional Space', 'مساحة مهنية'),
    category: text('Design intérieur / Tertiaire', 'Interior design / Commercial', 'تصميم داخلي / تجاري'),
    location: text('Rabat, Maroc', 'Rabat, Morocco', 'الرباط، المغرب'),
    year: '2024',
    image: '/images/project3.webp',
    client: text('Institution privée', 'Private institution', 'مؤسسة خاصة'),
    surface: '5 800 m²',
    status: text('Livré', 'Delivered', 'منجز'),
    description: text(
      "Une transformation intérieure de bureaux orientée vers la clarté, la confidentialité acoustique et l'ergonomie fonctionnelle.",
      'An interior office transformation oriented towards clarity, acoustic confidentiality, and functional ergonomics.',
      'تحول مكتبي داخلي موجه نحو الوضوح والسرية الصوتية وبيئة العمل الوظيفية.'
    ),
    gallery: ['/images/project3.webp', '/images/service1.webp', '/images/service2.webp'],
  },
  {
    slug: 'amenagement-urbain-tanger',
    title: text('Aménagement urbain', 'Urban Development', 'تنمية حضرية'),
    category: text('Urbanisme & Aménagement', 'Urbanism & Masterplanning', 'التعمير والتخطيط'),
    location: text('Tanger, Maroc', 'Tangier, Morocco', 'طنجة، المغرب'),
    year: '2023',
    image: '/images/project4.webp',
    client: text('Aménageur', 'Developer', 'مطور'),
    surface: '42 ha',
    status: text('Étude validée', 'Study approved', 'دراسة مصادق عليها'),
    description: text(
      "Une étude et planification de lotissement durable intégrant mobilités douces et gestion écologique des espaces publics.",
      'A study and planning of a sustainable subdivision integrating soft mobility and ecological management of public spaces.',
      'دراسة وتخطيط لتجزئة مستدامة تدمج التنقل الناعم والإدارة البيئية للمساحات العامة.'
    ),
    gallery: ['/images/project4.webp', '/images/project1.webp', '/images/service3.webp'],
  },
  {
    slug: 'hotel-boutique-marrakech',
    title: text('Hôtel Boutique', 'Boutique Hotel', 'فندق بوتيك'),
    category: text('Hospitality / Design intérieur', 'Hospitality / Interior design', 'ضيافة / تصميم داخلي'),
    location: text('Marrakech, Maroc', 'Marrakech, Morocco', 'مراكش، المغرب'),
    year: '2025',
    image: '/images/service2.webp',
    client: text('Groupe privé', 'Private group', 'مجموعة خاصة'),
    surface: '7 400 m²',
    status: text('Études en cours', 'Studies in progress', 'الدراسات جارية'),
    description: text(
      "Un concept d'hébergement intime transposant l'essence des architectures locales dans une écriture contemporaine et épurée.",
      'An intimate lodging concept translating the essence of local architecture into a contemporary and refined writing.',
      'مفهوم إقامة حميم يترجم جوهر العمارة المحلية إلى كتابة معاصرة وراقية.'
    ),
    gallery: ['/images/service2.webp', '/images/event.webp', '/images/project1.webp'],
  },
  {
    slug: 'centre-culturel-essaouira',
    title: text('Centre Culturel', 'Cultural Center', 'مركز ثقافي'),
    category: text('Équipement public', 'Public facility', 'تجهيز عمومي'),
    location: text('Essaouira, Maroc', 'Essaouira, Morocco', 'الصويرة، المغرب'),
    year: '2024',
    image: '/images/service3.webp',
    client: text('Fondation', 'Foundation', 'مؤسسة'),
    surface: '4 200 m²',
    status: text('Études en cours', 'Studies in progress', 'الدраسات جارية'),
    description: text(
      "Un projet culturel conçu comme un parcours ouvert sur la ville, articulé autour de patios d'exposition et d'ateliers créatifs.",
      'A cultural project conceived as a path open to the city, articulated around exhibition patios and creative workshops.',
      'مشروع ثقافي مصمم كمسار مفتوح على المدينة، متمحور حول فناءات العرض والورش الإبداعية.'
    ),
    gallery: ['/images/service3.webp', '/images/project3.webp', '/images/hero.webp'],
  },
  {
    slug: 'residence-luxe-agadir',
    title: text('Résidence de luxe', 'Luxury Residence', 'إقامة فاخرة'),
    category: text('Architecture résidentielle', 'Residential architecture', 'عمارة سكنية'),
    location: text('Agadir, Maroc', 'Agadir, Morocco', 'أكادير، المغرب'),
    year: '2025',
    image: '/images/hero.webp',
    client: text('Investisseur privé', 'Private investor', 'مستثمر خاص'),
    surface: '3 200 m²',
    status: text('En cours', 'In progress', 'جاري الإنجاز'),
    description: text(
      "Une résidence balnéaire haut de gamme intégrant piscines à débordement, jardins paysagers et finitions d'exception.",
      'A high-end seaside residence integrating infinity pools, landscaped gardens, and exceptional finishes.',
      'إقامة ساحلية راقية تدمج مسابح لا متناهية وحدائق منسقة وتشطيبات استثنائية.'
    ),
    gallery: ['/images/hero.webp', '/images/project1.webp', '/images/project2.webp'],
  },
  {
    slug: 'complexe-sportif-fes',
    title: text('Complexe sportif', 'Sports Complex', 'مجمع رياضي'),
    category: text('Équipement public', 'Public facility', 'تجهيز عمومي'),
    location: text('Fès, Maroc', 'Fez, Morocco', 'فاس، المغرب'),
    year: '2023',
    image: '/images/founder.webp',
    client: text('Collectivité territoriale', 'Local authority', 'جماعة ترابية'),
    surface: '18 500 m²',
    status: text('Livré', 'Delivered', 'منجز'),
    description: text(
      "Un complexe sportif multifonctionnel conçu pour accueillir compétitions, formations et événements communautaires.",
      'A multifunctional sports complex designed to host competitions, training, and community events.',
      'مجمع رياضي متعدد الوظائف مصمم لاستضافة المنافسات والتدريبات والفعاليات المجتمعية.'
    ),
    gallery: ['/images/founder.webp', '/images/project4.webp', '/images/service1.webp'],
  },
];

const localizedEvents: LocalizedEvent[] = [
  {
    slug: 'fidi-2026',
    title: text('FIDI 2026', 'FIDI 2026', 'FIDI 2026'),
    date: text('3 - 5 Décembre 2026', 'December 3 - 5, 2026', '3 - 5 ديسمبر 2026'),
    startDate: '2026-12-03',
    endDate: '2026-12-05',
    location: text('Casablanca, Maroc', 'Casablanca, Morocco', 'الدار البيضاء، المغرب'),
    type: text('Forum international', 'International forum', 'منتدى دولي'),
    description: text(
      "ELAOUAD Events assemble architectes, industriels, décideurs et exposants autour du design intérieur, des matériaux et de la construction premium.",
      'ELAOUAD Events brings together architects, industry leaders, decision makers, and exhibitors around interior design, materials, and premium construction.',
      'تجمع فعاليات ELAOUAD المعماريين والفاعلين الصناعيين وصناع القرار والعارضين حول التصميم الداخلي والمواد والبناء الراقي.'
    ),
    image: '/images/forum.jpeg',
    cta: text('Découvrir FIDI', 'Discover FIDI', 'اكتشف FIDI'),
  },
  {
    slug: 'eai-masterclass',
    title: text('EAI Masterclass', 'EAI Masterclass', 'ماستر كلاس EAI'),
    date: text('Septembre 2026', 'September 2026', 'سبتمبر 2026'),
    startDate: '2026-09-15',
    endDate: '2026-09-15',
    location: text('Rabat, Maroc', 'Rabat, Morocco', 'الرباط، المغرب'),
    type: text('Masterclass', 'Masterclass', 'ماستر كلاس'),
    description: text(
      "Une session dédiée au design intérieur premium, aux matières vernaculaires et à la coordination entre concept et exécution.",
      'A session dedicated to premium interior design, vernacular materials, and coordination between concept and execution.',
      'جلسة مخصصة للتصميم الداخلي الراقي والمواد المحلية والتنسيق بين الفكرة والتنفيذ.'
    ),
    image: '/images/service1.webp',
    cta: text('Voir le programme', 'View program', 'عرض البرنامج'),
  },
];

export const eventStats = [
  { value: '10 000+', label: text('Visiteurs', 'Visitors', 'زائر') },
  { value: '450+', label: text('Exposants', 'Exhibitors', 'عارض') },
  { value: '100+', label: text('Pays', 'Countries', 'دولة') },
  { value: '60+', label: text('Conférences', 'Conferences', 'محاضرة') },
];

const localizedTestimonials: LocalizedTestimonial[] = [
  {
    text: text(
      "Chaque mission commence par un cadrage précis : besoin, budget, contraintes, objectifs, livrables et calendrier.",
      'Every mission starts with a precise framework: need, budget, constraints, objectives, deliverables, and schedule.',
      'تبدأ كل مهمة بإطار عمل دقيق: الاحتياجات، الميزانية، القيود، الأهداف، المخرجات والجدول الزمني.'
    ),
    name: 'Clarté dès le départ',
    title: text('Engagement 01', 'Commitment 01', 'الالتزام 01'),
    proof: text('Cadrage & Calendrier', 'Framework & Schedule', 'التأطير والجدول الزمني'),
  },
  {
    text: text(
      "Nous facilitons le dialogue entre les acteurs du projet pour éviter les malentendus et améliorer la fluidité d’exécution.",
      'We facilitate dialogue between project stakeholders to avoid misunderstandings and improve execution fluidity.',
      'نحن نسهل الحوار بين الفاعلين في المشروع لتجنب سوء الفهم وتحسين مرونة التنفيذ.'
    ),
    name: 'Coordination maîtrisée',
    title: text('Engagement 02', 'Commitment 02', 'الالتزام 02'),
    proof: text('Dialogue & Fluidité', 'Dialogue & Fluidity', 'الحوار والمرونة'),
  },
  {
    text: text(
      "Nos plans, études, modèles et recommandations sont pensés pour être compris, transmis et utilisés efficacement.",
      'Our plans, studies, models, and recommendations are designed to be understood, transmitted, and used effectively.',
      'تم تصميم خططنا ودراساتنا ونماذجنا وتوصياتنا لتكون مفهومة ومنقولة ومستخدمة بشكل فعال.'
    ),
    name: 'Livrables exploitables',
    title: text('Engagement 03', 'Commitment 03', 'الالتزام 03'),
    proof: text('Précision & Clarté', 'Precision & Clarity', 'الدقة والوضوح'),
  },
  {
    text: text(
      "Nous cherchons des solutions qui restent cohérentes dans le temps, techniquement, esthétiquement et économiquement.",
      'We look for solutions that remain coherent over time, technically, aesthetically, and economically.',
      'نحن نبحث عن حلول تظل متماسكة بمرور الوقت، تقنيًا وجمالياً واقتصاديًا.'
    ),
    name: 'Exigence durable',
    title: text('Engagement 04', 'Commitment 04', 'الالتزام 04'),
    proof: text('Esthétique & Technique', 'Aesthetics & Technique', 'الجماليات والتقنيات'),
  },
];

export function getServices(locale: Locale): Service[] {
  return localizedServices.map((service) => ({
    id: service.id,
    title: pick(service.title, locale),
    value: pick(service.value, locale),
    description: pick(service.description, locale),
    bullets: service.bullets[locale] ?? service.bullets.fr,
    image: service.image,
  }));
}

export function getProjects(locale: Locale): Project[] {
  return localizedProjects.map((project) => ({
    slug: project.slug,
    title: pick(project.title, locale),
    category: pick(project.category, locale),
    location: pick(project.location, locale),
    year: project.year,
    image: project.image,
    client: pick(project.client, locale),
    surface: project.surface,
    status: pick(project.status, locale),
    description: pick(project.description, locale),
    gallery: project.gallery,
  }));
}

export function getProject(locale: Locale, slug: string): Project | undefined {
  return getProjects(locale).find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return localizedProjects.map((project) => project.slug);
}

export function getEvents(locale: Locale): EventItem[] {
  return localizedEvents.map((event) => ({
    slug: event.slug,
    title: pick(event.title, locale),
    date: pick(event.date, locale),
    startDate: event.startDate,
    endDate: event.endDate,
    location: pick(event.location, locale),
    type: pick(event.type, locale),
    description: pick(event.description, locale),
    image: event.image,
    cta: pick(event.cta, locale),
  }));
}

export function getEvent(locale: Locale, slug: string): EventItem | undefined {
  return getEvents(locale).find((event) => event.slug === slug);
}

export function getEventSlugs(): string[] {
  return localizedEvents.map((event) => event.slug);
}

export function getTestimonials(locale: Locale): Testimonial[] {
  return localizedTestimonials.map((testimonial) => ({
    text: pick(testimonial.text, locale),
    name: testimonial.name,
    title: pick(testimonial.title, locale),
    proof: pick(testimonial.proof, locale),
  }));
}

export function getLocalizedStats<T extends { label: LocalizedText }>(
  stats: T[],
  locale: Locale
): Array<Omit<T, 'label'> & { label: string }> {
  return stats.map((stat) => ({
    ...stat,
    label: pick(stat.label, locale),
  }));
}
