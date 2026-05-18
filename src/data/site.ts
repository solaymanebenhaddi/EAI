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
  { value: '100+', label: text('Projets', 'Projects', 'مشاريع') },
  { value: '10K+', label: text('Visiteurs FIC', 'FIC visitors', 'زوار FIC') },
  { value: '4', label: text('Continents', 'Continents', 'قارات') },
];

export const manifestoStats = [
  { value: 500, suffix: '+', label: text('Projets livrés', 'Delivered projects', 'مشاريع منجزة') },
  { value: 15, suffix: '+', label: text('Années d’expertise', 'Years of expertise', 'سنوات خبرة') },
  { value: 12, suffix: '', label: text('Pays d’intervention', 'Countries of operation', 'بلدا للتدخل') },
  { value: 60, suffix: '+', label: text('Collaborateurs', 'Collaborators', 'متعاونا') },
];

const localizedServices: LocalizedService[] = [
  {
    id: '01',
    title: text('Architecture', 'Architecture', 'الهندسة المعمارية'),
    value: text('Concevoir avec la lumière, bâtir avec la matière.', 'Design with light, build with matter.', 'نصمم بالضوء ونبني بالمادة.'),
    description: text(
      "Conception architecturale complète pour projets résidentiels, tertiaires et publics, avec une attention précise au contexte, à la lumière et aux usages.",
      'Complete architectural design for residential, commercial, and public projects, with precise attention to context, light, and use.',
      'تصميم معماري متكامل للمشاريع السكنية والتجارية والعامة، مع عناية دقيقة بالسياق والضوء والاستخدام.'
    ),
    bullets: {
      fr: ['Conception architecturale', 'Permis et études réglementaires', 'Suivi architectural'],
      en: ['Architectural design', 'Permits and regulatory studies', 'Architectural supervision'],
      ar: ['التصميم المعماري', 'الرخص والدراسات التنظيمية', 'التتبع المعماري'],
    },
    image: '/images/service1.webp',
  },
  {
    id: '02',
    title: text('BIM Consulting', 'BIM Consulting', 'استشارات BIM'),
    value: text('L’ingénierie prédictive au service de la précision.', 'Predictive engineering in service of precision.', 'هندسة تنبؤية في خدمة الدقة.'),
    description: text(
      "Modélisation intelligente, coordination spatiale et gestion des données pour anticiper les conflits avant le chantier.",
      'Intelligent modeling, spatial coordination, and data management to anticipate conflicts before construction.',
      'نمذجة ذكية وتنسيق مكاني وإدارة بيانات لتوقع التعارضات قبل الورش.'
    ),
    bullets: {
      fr: ['Maquette numérique BIM', 'Coordination MEP et structure', 'Gestion des données bâtiment'],
      en: ['BIM digital model', 'MEP and structural coordination', 'Building data management'],
      ar: ['نموذج رقمي BIM', 'تنسيق الأنظمة والهيكل', 'إدارة بيانات المبنى'],
    },
    image: '/images/service2.webp',
  },
  {
    id: '03',
    title: text('Ingénierie & Project Management', 'Engineering & Project Management', 'الهندسة وإدارة المشاريع'),
    value: text('De l’esquisse à la remise des clés, une maîtrise totale.', 'From sketch to handover, complete control.', 'من الرسم الأول إلى التسليم، تحكم كامل.'),
    description: text(
      "Pilotage technique, économie de la construction, coordination OPC et suivi d’exécution pour sécuriser délais, budget et qualité.",
      'Technical leadership, cost control, scheduling coordination, and execution monitoring to protect time, budget, and quality.',
      'قيادة تقنية ومراقبة للتكلفة والتنسيق والمتابعة لضمان الوقت والميزانية والجودة.'
    ),
    bullets: {
      fr: ['Études techniques', 'Pilotage et coordination OPC', 'Économie de la construction'],
      en: ['Technical studies', 'Planning and coordination', 'Construction economics'],
      ar: ['دراسات تقنية', 'التخطيط والتنسيق', 'اقتصاد البناء'],
    },
    image: '/images/service3.webp',
  },
  {
    id: '04',
    title: text('Design Intérieur', 'Interior Design', 'التصميم الداخلي'),
    value: text('L’expérience de l’espace poussée au détail.', 'Spatial experience refined to the detail.', 'تجربة المكان مصقولة حتى أدق التفاصيل.'),
    description: text(
      "Matériaux, lumière, mobilier et atmosphère sont pensés comme une continuité naturelle de l’architecture.",
      'Materials, light, furniture, and atmosphere are designed as a natural continuation of the architecture.',
      'المواد والضوء والأثاث والأجواء امتداد طبيعي للعمارة.'
    ),
    bullets: {
      fr: ['Concept design', 'Sélection matériaux', 'Mobilier sur mesure'],
      en: ['Concept design', 'Material selection', 'Bespoke furniture'],
      ar: ['تصميم المفهوم', 'اختيار المواد', 'أثاث حسب الطلب'],
    },
    image: '/images/service1.webp',
  },
  {
    id: '05',
    title: text('Urbanisme', 'Urban Planning', 'التعمير'),
    value: text('Penser la ville de demain à l’échelle du territoire.', 'Designing tomorrow’s city at territorial scale.', 'تصميم مدينة الغد على مستوى المجال.'),
    description: text(
      "Plans d’aménagement, études d’impact et stratégies urbaines pour des quartiers durables, lisibles et vivants.",
      'Masterplans, impact studies, and urban strategies for sustainable, legible, and lively districts.',
      'تصاميم تهيئة ودراسات أثر واستراتيجيات حضرية لأحياء مستدامة وواضحة وحية.'
    ),
    bullets: {
      fr: ['Plans d’aménagement', 'Design urbain', 'Études d’impact'],
      en: ['Masterplanning', 'Urban design', 'Impact studies'],
      ar: ['مخططات التهيئة', 'التصميم الحضري', 'دراسات الأثر'],
    },
    image: '/images/service2.webp',
  },
];

const localizedProjects: LocalizedProject[] = [
  {
    slug: 'tour-casa-finance-city',
    title: text('Tour Casa Finance City', 'Casa Finance City Tower', 'برج كازا فاينانس سيتي'),
    category: text('Architecture tertiaire', 'Commercial architecture', 'عمارة مكتبية'),
    location: text('Casablanca, Maroc', 'Casablanca, Morocco', 'الدار البيضاء، المغرب'),
    year: '2025',
    image: '/images/project1.webp',
    client: text('Groupe privé', 'Private group', 'مجموعة خاصة'),
    surface: '18 000 m²',
    status: text('En développement', 'In development', 'قيد التطوير'),
    description: text(
      "Une tour tertiaire pensée comme un signal urbain sobre, associant façade minérale, contrôle solaire et plateaux flexibles.",
      'A commercial tower designed as a restrained urban landmark, combining mineral facade work, solar control, and flexible floorplates.',
      'برج مكتبي كعلامة حضرية هادئة يجمع بين واجهة معدنية وتحكم شمسي ومساحات مرنة.'
    ),
    gallery: ['/images/project1.webp', '/images/project2.webp', '/images/project3.webp'],
  },
  {
    slug: 'complexe-residentiel-anfa',
    title: text('Complexe Résidentiel Anfa', 'Anfa Residential Complex', 'مجمع أنفا السكني'),
    category: text('Résidentiel premium', 'Premium residential', 'سكن راق'),
    location: text('Casablanca, Maroc', 'Casablanca, Morocco', 'الدار البيضاء، المغرب'),
    year: '2024',
    image: '/images/project2.webp',
    client: text('Promoteur immobilier', 'Real estate developer', 'مطور عقاري'),
    surface: '12 000 m²',
    status: text('Livré', 'Delivered', 'منجز'),
    description: text(
      "Un ensemble résidentiel qui privilégie les seuils, les patios et la qualité de la lumière dans les espaces communs.",
      'A residential ensemble focused on thresholds, patios, and the quality of light in shared spaces.',
      'مجمع سكني يركز على العتبات والفناءات وجودة الضوء في المساحات المشتركة.'
    ),
    gallery: ['/images/project2.webp', '/images/project3.webp', '/images/project4.webp'],
  },
  {
    slug: 'siege-corporate-banque',
    title: text('Siège Corporate Banque', 'Bank Corporate Headquarters', 'مقر مصرفي'),
    category: text('Design intérieur', 'Interior design', 'تصميم داخلي'),
    location: text('Rabat, Maroc', 'Rabat, Morocco', 'الرباط، المغرب'),
    year: '2024',
    image: '/images/project3.webp',
    client: text('Institution financière', 'Financial institution', 'مؤسسة مالية'),
    surface: '5 800 m²',
    status: text('Livré', 'Delivered', 'منجز'),
    description: text(
      "Une transformation intérieure orientée vers la clarté, la confidentialité et l’expérience client premium.",
      'An interior transformation focused on clarity, confidentiality, and a premium client experience.',
      'تحول داخلي يركز على الوضوح والخصوصية وتجربة عميل راقية.'
    ),
    gallery: ['/images/project3.webp', '/images/service1.webp', '/images/service2.webp'],
  },
  {
    slug: 'masterplan-eco-cite',
    title: text('Masterplan Éco-Cité', 'Eco-City Masterplan', 'مخطط المدينة البيئية'),
    category: text('Urbanisme', 'Urban planning', 'تعمير'),
    location: text('Marrakech, Maroc', 'Marrakech, Morocco', 'مراكش، المغرب'),
    year: '2023',
    image: '/images/project4.webp',
    client: text('Collectivité territoriale', 'Local authority', 'جماعة ترابية'),
    surface: '42 ha',
    status: text('Étude validée', 'Study approved', 'دراسة مصادق عليها'),
    description: text(
      "Une stratégie urbaine fondée sur la mobilité douce, les îlots de fraîcheur et la mixité fonctionnelle.",
      'An urban strategy based on soft mobility, cool islands, and functional diversity.',
      'استراتيجية حضرية تقوم على التنقل الناعم وجزر البرودة وتنوع الوظائف.'
    ),
    gallery: ['/images/project4.webp', '/images/project1.webp', '/images/service3.webp'],
  },
  {
    slug: 'villa-luma',
    title: text('Villa Luma', 'Villa Luma', 'فيلا لوما'),
    category: text('Architecture résidentielle', 'Residential architecture', 'عمارة سكنية'),
    location: text('Tanger, Maroc', 'Tangier, Morocco', 'طنجة، المغرب'),
    year: '2023',
    image: '/images/hero.webp',
    client: text('Client privé', 'Private client', 'عميل خاص'),
    surface: '950 m²',
    status: text('Livré', 'Delivered', 'منجز'),
    description: text(
      "Une villa familiale où pierre, ombre et cadrages paysagers organisent un rapport calme à l’horizon.",
      'A family villa where stone, shade, and framed landscapes create a calm relationship with the horizon.',
      'فيلا عائلية تنظم فيها الحجر والظل والمشاهد الطبيعية علاقة هادئة مع الأفق.'
    ),
    gallery: ['/images/hero.webp', '/images/founder.webp', '/images/project2.webp'],
  },
  {
    slug: 'campus-universitaire-tech',
    title: text('Campus Universitaire Tech', 'Tech University Campus', 'الحرم الجامعي التقني'),
    category: text('Équipement public', 'Public facility', 'تجهيز عمومي'),
    location: text('Benguerir, Maroc', 'Benguerir, Morocco', 'بنجرير، المغرب'),
    year: '2022',
    image: '/images/service1.webp',
    client: text('Institution académique', 'Academic institution', 'مؤسسة أكاديمية'),
    surface: '24 000 m²',
    status: text('Livré', 'Delivered', 'منجز'),
    description: text(
      "Un campus orienté vers l’apprentissage collaboratif, les circulations lisibles et les espaces extérieurs habités.",
      'A campus designed for collaborative learning, clear circulation, and active outdoor spaces.',
      'حرم جامعي موجه للتعلم التعاوني والتنقل الواضح والمساحات الخارجية النشطة.'
    ),
    gallery: ['/images/service1.webp', '/images/service2.webp', '/images/project4.webp'],
  },
  {
    slug: 'hotel-atlas-boutique',
    title: text('Hôtel Atlas Boutique', 'Atlas Boutique Hotel', 'فندق أطلس البوتيكي'),
    category: text('Hospitality', 'Hospitality', 'ضيافة'),
    location: text('Marrakech, Maroc', 'Marrakech, Morocco', 'مراكش، المغرب'),
    year: '2025',
    image: '/images/service2.webp',
    client: text('Groupe hôtelier', 'Hotel group', 'مجموعة فندقية'),
    surface: '7 400 m²',
    status: text('Concours', 'Competition', 'مسابقة'),
    description: text(
      "Un hôtel boutique qui transpose les codes du riad en expérience contemporaine, intime et lumineuse.",
      'A boutique hotel translating riad principles into a contemporary, intimate, light-filled experience.',
      'فندق بوتيكي يترجم مبادئ الرياض إلى تجربة معاصرة وحميمة ومضيئة.'
    ),
    gallery: ['/images/service2.webp', '/images/event.webp', '/images/project1.webp'],
  },
  {
    slug: 'centre-culturel-atlantique',
    title: text('Centre Culturel Atlantique', 'Atlantic Cultural Center', 'المركز الثقافي الأطلسي'),
    category: text('Culture', 'Culture', 'ثقافة'),
    location: text('Essaouira, Maroc', 'Essaouira, Morocco', 'الصويرة، المغرب'),
    year: '2024',
    image: '/images/service3.webp',
    client: text('Fondation culturelle', 'Cultural foundation', 'مؤسسة ثقافية'),
    surface: '4 200 m²',
    status: text('Études en cours', 'Studies in progress', 'الدراسات جارية'),
    description: text(
      "Un équipement culturel pensé comme une séquence de patios, galeries et ateliers ouverts sur la ville.",
      'A cultural facility conceived as a sequence of patios, galleries, and workshops open to the city.',
      'تجهيز ثقافي مصمم كسلسلة من الفناءات والمعارض والورش المفتوحة على المدينة.'
    ),
    gallery: ['/images/service3.webp', '/images/project3.webp', '/images/hero.webp'],
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
    image: '/images/event.webp',
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
      "Le BIM d’ELAOUAD nous a permis de détecter 23 conflits techniques avant le chantier. Le planning a été tenu sans imprévu majeur.",
      'ELAOUAD’s BIM process helped us detect 23 technical conflicts before construction. The schedule held without major surprises.',
      'مكننا مسار BIM لدى ELAOUAD من كشف 23 تعارضا تقنيا قبل الورش، وتم احترام الجدول دون مفاجآت كبرى.'
    ),
    name: 'Directeur Technique',
    title: text('Groupe immobilier, Casablanca', 'Real estate group, Casablanca', 'مجموعة عقارية، الدار البيضاء'),
    proof: text('23 conflits détectés avant chantier', '23 conflicts detected before construction', '23 تعارضا قبل الورش'),
  },
  {
    text: text(
      "Nous avions besoin d’une équipe capable de gérer architecture, ingénierie et exécution. ELAOUAD a donné une trajectoire claire au projet.",
      'We needed a team able to handle architecture, engineering, and execution. ELAOUAD gave the project a clear path.',
      'كنا نحتاج إلى فريق يدير العمارة والهندسة والتنفيذ. منحت ELAOUAD المشروع مسارا واضحا.'
    ),
    name: 'CEO',
    title: text('Fonds d’investissement', 'Investment fund', 'صندوق استثمار'),
    proof: text('Architecture + ingénierie intégrées', 'Integrated architecture + engineering', 'عمارة وهندسة مدمجتان'),
  },
  {
    text: text(
      "Le FIDI est devenu un rendez-vous stratégique. L’édition précédente nous a ouvert des discussions commerciales sur trois marchés.",
      'FIDI became a strategic gathering. The previous edition opened business conversations across three markets.',
      'أصبح FIDI موعدا استراتيجيا. فتحت النسخة السابقة نقاشات تجارية في ثلاثة أسواق.'
    ),
    name: 'Directrice Commerciale',
    title: text('Fabricant matériaux', 'Materials manufacturer', 'مصنعة مواد بناء'),
    proof: text('3 marchés activés après l’événement', '3 markets activated after the event', '3 أسواق بعد الحدث'),
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
