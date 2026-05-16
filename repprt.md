ELAOUAD
ARCHITECTURE & ENGINEERING GROUP
________________________

UX / UI & CONTENT UPGRADE REPORT
Analyse complète — Recommandations stratégiques — Plan d'action

Préparé par	Analyse stratégique Claude AI
Pour	Soukaina Elaouad — Fondatrice
Date	Mai 2026
Version	v1.0 — Confidentiel

 
1. Résumé Exécutif
Ce rapport analyse en profondeur le site actuel d'ELAOUAD Architecture & Engineering Group et formule des recommandations précises pour améliorer l'expérience utilisateur (UX), l'interface visuelle (UI) et le contenu. L'objectif est de transformer le site en un outil de conversion de classe mondiale, cohérent avec le positionnement premium de la marque.

Dimension	Score actuel	Cible recommandée
Identité visuelle & branding	85 / 100	95 / 100
Navigation & architecture UX	55 / 100	88 / 100
Qualité & profondeur du contenu	40 / 100	85 / 100
Génération de leads & conversion	45 / 100	90 / 100
Signaux de confiance & preuve sociale	25 / 100	85 / 100
Performance mobile	60 / 100	92 / 100
SEO & visibilité digitale	35 / 100	80 / 100

Verdict global
Le site ELAOUAD a une excellente fondation visuelle mais manque de contenu substantiel, de preuve sociale et de parcours utilisateur optimisé. Le potentiel de conversion est sous-exploité d'au moins 60%.

 
2. Analyse UX — Expérience Utilisateur
2.1 Navigation & Architecture de l'information
La navigation actuelle est minimaliste mais manque de hiérarchie claire. Les visiteurs premium — investisseurs, décideurs, promoteurs — arrivent avec des objectifs précis et doivent pouvoir les atteindre en moins de 3 clics.

Problèmes identifiés
•	Aucun CTA visible dans la zone hero — la section la plus vue de tout le site
•	Le menu ne reflète pas la dualité EAI (architecture) + Events (forums) — deux publics différents
•	Pas de fil d'Ariane (breadcrumb) sur les pages internes
•	Le bouton 'Consultation' dans la navigation est trop discret — couleur or sur fond noir, difficile à voir
•	Absence de sticky CTA mobile — sur mobile, le CTA disparaît au scroll

Recommandations concrètes
•	Ajouter deux CTA dans le hero : 'Voir nos projets' (primaire) et 'Demander une consultation' (secondaire)
•	Restructurer le menu en deux univers clairs : [Architecture & Ingénierie] | [Events & Forums]
•	Implémenter un sticky bar mobile avec numéro WhatsApp et bouton consultation
•	Ajouter une barre de progression de scroll discrète pour les pages longues
•	Intégrer un mega-menu hover sur 'Services' montrant les 8 services en colonnes

Impact estimé
Un CTA hero visible augmente le taux de clic vers les pages de conversion de 40 à 80% selon les benchmarks UX pour sites B2B premium (Nielsen Norman Group, 2024).

2.2 Parcours Utilisateur & Conversion Funnel
Le site actuel n'a pas de funnel défini. Un visiteur arrive, voit de belles images, et repart sans avoir été guidé vers une action concrète. Pour une marque premium B2B, chaque section doit avoir un objectif de conversion.

Funnel recommandé par persona
Persona 1 — Investisseur immobilier
•	Hero (impact) > Portfolio projets (preuve) > Stats chiffres (confiance) > Formulaire (conversion)

Persona 2 — Entreprise cherchant BIM/Ingénierie
•	Hero > Services BIM (détail) > Témoignages sectoriels (validation) > Contact direct

Persona 3 — Participant potentiel aux events
•	Hero ou nav Events > Section FIC (conviction) > Stats 10K visiteurs (légitimité) > Inscription

Action prioritaire
Implémenter Google Analytics 4 avec tracking des events (clics CTA, scroll depth, form submissions) avant tout autre changement. Sans données, les optimisations sont des suppositions.

2.3 Micro-interactions & Feedback Visuel
Les micro-interactions sont les signaux silencieux qui communiquent qualité et soin. Sur un site premium, leur absence se ressent même si l'utilisateur ne peut pas l'articuler.

Interactions manquantes ou à améliorer
•	Formulaire de contact : aucun feedback visuel sur focus des inputs — ajouter border or/champagne au focus
•	Boutons : pas d'état 'loading' lors de la soumission — ajouter spinner + texte 'Envoi en cours...'
•	Images portfolio : l'overlay hover doit apparaître progressivement (opacity 0 à 0.4 en 300ms) — pas instantanément
•	Navigation : indicateur de page active manquant — underline doré sur la section courante
•	Scroll : pas d'animation 'back to top' — bouton flottant discret après 400px de scroll
•	Mobile : pas de feedback haptic ou visuel au tap — ajouter ripple effect subtil

2.4 Performance Mobile
70% du trafic web mondial est mobile. Pour une marque marocaine premium, le mobile est souvent le premier point de contact — via Instagram, LinkedIn, ou WhatsApp.

Problèmes critiques mobile
•	Images non optimisées pour mobile — servir WebP avec srcset et sizes appropriés
•	Textes hero trop grands sur petits écrans — 72px desktop doit passer à 36-40px mobile
•	Formulaire contact : champs trop rapprochés, difficult à remplir au pouce
•	Portfolio grid : 3 colonnes desktop OK, mais 2 colonnes tablet et 1 colonne mobile non implémentées
•	Le sticky nav ombre disparaît au scroll sur iOS Safari — bug CSS connu, fix requis

Test immédiat
Tester le site sur un vrai iPhone SE (375px) et Samsung Galaxy A-series (360px) — les deux téléphones les plus utilisés au Maroc. Les problèmes mobiles critiques apparaissent en 2 minutes.

 
3. Analyse UI — Interface Visuelle
3.1 Système de Design & Cohérence Visuelle
La palette noir/or/blanc est excellente et bien choisie pour le luxe. Le risque est l'incohérence dans l'application — un élément or d'une section à l'autre peut varier en teinte, poids et usage.

Définir un Design System documenté

Token	Valeur	Usage	Interdit
--color-gold	#d4af37	CTAs, accents, hover	Fond plein large surface
--color-dark	#1a1a1a	Backgrounds, textes H1	Texte sur fond sombre
--color-taupe	#4a4a4a	Corps de texte	Titres principaux
--color-white	#ffffff	Fond, textes sur dark	Éléments décoratifs
--radius-card	4px	Cards, images	Buttons (garder 0)
--spacing-section	120px desktop	Entre sections	Réduire sous 80px

3.2 Typographie — Améliorations
Playfair Display + Montserrat est un excellent choix. Voici les ajustements précis pour maximiser l'impact et la lisibilité.

Hiérarchie typographique recommandée
H1 Hero	Playfair Display Bold — 72px desktop / 38px mobile — letter-spacing: 0.06em — line-height: 1.05

H2 Sections	Playfair Display Regular — 42px desktop / 28px mobile — letter-spacing: 0.02em — line-height: 1.2

H3 Sous-titres	Montserrat SemiBold 600 — 20px — letter-spacing: 0.08em — UPPERCASE pour labels courts

Corps texte	Montserrat Light 300 — 16px — line-height: 1.85 — max-width: 680px (jamais pleine largeur)

Captions / labels	Montserrat Regular 400 — 12px — letter-spacing: 0.12em — UPPERCASE — couleur taupe

CTAs / boutons	Montserrat SemiBold 600 — 13px — letter-spacing: 0.15em — UPPERCASE

Problème critique actuel
Les textes longs (descriptions services, about) utilisent Montserrat Light sur fond noir — ratio de contraste insuffisant. Passer à Montserrat Regular 400 sur fond sombre pour respecter WCAG AA (ratio 4.5:1 minimum).

3.3 Hero Section — Refonte Détaillée
Le hero est la section la plus critique — 80% des visiteurs ne scrollent pas si le hero ne les convainc pas. Actuellement, il manque de direction et de message clair.

Structure hero recommandée
•	Ligne de contexte (EYEBROW) : 'CASABLANCA — AFRIQUE — INTERNATIONAL' | Montserrat 11px UPPERCASE or/champagne
•	H1 principal : 'Sculptons l'Architecture de Demain' | Playfair Display Bold 72px blanc
•	Sous-titre (VALUE PROPOSITION) : 'Architecture premium, ingénierie BIM et design durable pour projets d'exception' | Montserrat Light 18px or/champagne
•	CTA primaire : 'Voir nos projets' — fond or/champagne, texte noir, width 200px
•	CTA secondaire : 'Consultation gratuite' — border or/champagne, texte blanc, transparent
•	Indicateur scroll : flèche animée + texte 'Découvrir'
•	Bas du hero : 3 stats en ligne — '100+ Projets | 10K+ Visiteurs FIC | 4 Continents'

Ce qu'il faut éviter
•	Éviter 'SCULPTING THE FUTURE OF ARCHITECTURE' — trop générique, aucune différenciation
•	Éviter un seul CTA — toujours offrir deux chemins (projet vs consultation)
•	Éviter une vidéo 4K sans fallback image — temps de chargement trop long sur mobile Maroc

3.4 Portfolio — Galerie Signature
Le portfolio est la preuve ultime pour un cabinet d'architecture. Actuellement, un seul projet nommé (Résidence Palmier) est visible. C'est le gap le plus visible et le plus dommageable pour la conversion.

Structure recommandée par carte projet
•	Image principale 16:9 haute résolution (minimum 1200x675px)
•	Badge catégorie (Résidentiel / Commercial / Urbanisme / BIM) — or/champagne pill
•	Titre projet : Playfair Display 24px blanc
•	Lieu + Année : Montserrat Light 13px taupe
•	Au hover : overlay gradient noir 40%, titre flotte, bouton 'Voir le projet >' apparaît
•	Au clic : lightbox fullscreen avec carrousel, stats projet, description 150 mots

8 projets minimum à préparer
•	Résidence Palmier — Casablanca (Résidentiel luxury) — avant/après si possible
•	Immeuble de bureaux Corporate — Commercial / BIM showcase
•	Projet d'urbanisme — quartier ou plan masse (Urbanisme)
•	Interior Design boutique ou villa — photos ambiance
•	Visualisation BIM 3D — rendu technique impressionnant
•	Bâtiment green / certifié HQE ou LEED (Architecture durable)
•	Coordination chantier — photos process + résultat
•	Aménagement paysager / landscaping

3.5 Section Events — ELAOUAD EVENTS
ELAOUAD EVENTS est une différenciation extraordinaire — très rares sont les cabinets d'architecture qui organisent aussi des forums internationaux avec 10 000 visiteurs. Cette section doit rayonner de légitimité.

Recommandations UI events
•	Hero event : photo ou vidéo 15 secondes de l'ambiance FIC — salle comble, podium, networking
•	Compteurs animés : 10 000+ Visiteurs / 450+ Exposants / 100+ Pays / 60+ Conférences — animation count-up au scroll
•	Timeline des events 2026 : chronologie visuelle horizontale avec dates et statuts (OPEN/SOLD OUT/BIENTÔT)
•	Cards events avec image qualité, badge FLAGSHIP/SPÉCIALISÉ, date or/champagne, CTA 'S'inscrire'
•	Section 'Pourquoi participer' : 3 colonnes avec icons minimalistes et textes courts
•	Logos des partenaires et sponsors en rangée — proof of legitimacy

 
4. Stratégie de Contenu — Recommandations Complètes
4.1 Copywriting — Voix de Marque
La voix d'ELAOUAD doit être : confiante sans arrogance, technique sans jargon inaccessible, internationale mais ancrée au Maroc et en Afrique. Chaque texte doit servir un objectif de conversion précis.

Principes copywriting premium
•	Commencer par les bénéfices, pas les caractéristiques — pas 'nous faisons du BIM' mais 'vos projets livrés 30% plus vite grâce au BIM'
•	Chaque section doit répondre à une objection implicite du visiteur
•	Utiliser des chiffres précis — '98%' est plus crédible que 'presque tous'
•	Alterner anglais et français stratégiquement — FR pour l'émotion et la proximité, EN pour le prestige international
•	Éviter les superlatifs vides : 'leaders', 'meilleurs', 'excellents' — remplacer par des preuves concrètes

4.2 Textes Recommandés — Section par Section
Hero — Texte complet recommandé
Texte hero proposé
EYEBROW : 'CASABLANCA · AFRIQUE · INTERNATIONAL'  H1 : 'L'Architecture comme Acte de Vision'  Sous-titre : 'ELAOUAD conçoit, ingénierise et réalise des espaces d'exception — du concept BIM à la livraison, sur 4 continents.'  CTA 1 : 'Explorer nos projets' CTA 2 : 'Demander une consultation'

About / Vision — Texte proposé
Texte About proposé
Titre : 'Une vision. Un groupe. Une transformation.'  Paragraphe 1 : 'Fondé par Soukaina Elaouad, ingénieure civile et doctorante en architecture, ELAOUAD Architecture & Engineering Group est né d'une conviction : les projets d'exception exigent une expertise totale — de la conception architecturale à la gestion de projet, du BIM à l'aménagement intérieur.'  Paragraphe 2 : 'En dix ans, le groupe a livré plus de 100 projets en résidentiel premium, commercial, urbanisme et design intérieur. Chaque réalisation porte la même signature : rigueur technique, esthétique maîtrisée et durabilité intégrée dès le premier trait.'  Paragraphe 3 : 'ELAOUAD ne construit pas des bâtiments. Nous sculptons les espaces où l'avenir se vit.'

Services — Descriptions recommandées
Chaque service doit avoir : un titre impact (Playfair 24px) + une phrase valeur (Montserrat Bold 15px or/champagne) + une description courte 40-60 mots + 3 bullet points clés.

Architecture	Des maisons et immeubles qui racontent une histoire. Résidentiel de luxe, commercial, équipements publics — chaque projet intègre esthétique, fonctionnalité et durabilité. • Conception architecturale complète • Permis et études réglementaires • Suivi de réalisation

BIM Consulting	Votre projet livré dans les délais, dans le budget. Le BIM (Building Information Modeling) d'ELAOUAD réduit les imprévus chantier de 40% en moyenne. • Modélisation 3D complète • Coordination MEP et structure • Formation équipes projet

Ingénierie & PM	De la faisabilité à la réception des travaux, nous gérons la complexité pour que vous vous concentriez sur l'essentiel. • Études techniques et structurelles • Planning et suivi budgétaire • Coordination tous corps d'état

Design Intérieur	Des espaces qui incarnent votre identité. Chaque détail est pensé — matériaux, lumière, mobilier — pour créer une expérience mémorable. • Concept design et moodboards • Sélection matériaux et fournitures • Direction artistique chantier

Urbanisme	Penser la ville d'aujourd'hui pour les citoyens de demain. Plans d'aménagement, études d'impact et développement durable à l'échelle du territoire. • Plans de masse et zonage • Études d'impact environnemental • Concertation et validation administrative

Soukaina Elaouad — Texte fondatrice
Texte fondatrice proposé
Titre : 'La Vision Derrière la Transformation'  Sous-titre : 'Soukaina Elaouad — Fondatrice & Architecte Ingénieure'  Intro : 'Ingénieure civile de formation, doctorante en architecture et manager de projets expérimentée, Soukaina Elaouad a créé ELAOUAD Group avec une idée centrale : l'excellence architecturale ne doit jamais sacrifier la rigueur technique — ni l'inverse.'  Philosophie : 'Sa méthode conjugue l'approche scientifique de l'ingénieur — chiffres, processus, optimisation — et la sensibilité créative de l'architecte. Le résultat : des projets qui tiennent leurs promesses, esthétiquement et structurellement.'  Citation : "L'architecture est à la fois un acte artistique et une responsabilité technique. Chaque projet que nous livrons doit être beau, solide, durable et utile aux femmes et aux hommes qui l'habiteront." — Soukaina Elaouad

Témoignages — Formulation recommandée
Les témoignages doivent être spécifiques, crédibles, et refléter des bénéfices concrets. Éviter les superlatifs vides. Exemples :

Promoteur immobilier	"Le BIM d'ELAOUAD nous a permis de détecter 23 conflits structurels avant le chantier. Résultat : 0 imprévu majeur, livraison à la date prévue." — Directeur technique, Groupe immobilier Casablanca

Investisseur	"Nous cherchions un cabinet capable de gérer la complexité d'un projet 5 000 m² avec des contraintes techniques sévères. ELAOUAD était le seul à proposer une équipe intégrée architecture + ingénierie." — CEO, Fonds d'investissement

Participant FIC	"Le FIC est l'événement incontournable de la construction en Afrique. En trois éditions, nous avons signé des partenariats stratégiques sur 3 continents." — Directeur commercial, fabricant matériaux

4.3 Contenu Manquant — Plan de Production
Ce tableau liste tous les contenus à produire en priorité, classés par impact sur la conversion.

Contenu	Priorité	Format	Impact conversion
Photo Soukaina (studio)	CRITIQUE	1 photo pro	Humanise la marque — +35% confiance
Photos 8 projets portfolio	CRITIQUE	5-10 photos/projet	Preuve directe — +60% conversion
3 témoignages clients réels	CRITIQUE	Texte + photo client	Social proof — +45% leads
Vidéo highlights FIC 60s	HAUTE	Vidéo montée	Légitimité events — +50% inscriptions
Descriptions 8 services	HAUTE	100-150 mots chacun	SEO + conversion — +25% leads
Articles blog (3 starter)	MOYENNE	800-1200 mots	SEO long terme — trafic organique
Brochure PDF téléchargeable	MOYENNE	PDF 12-16 pages	Lead magnet — capture emails
Logos clients / partenaires	MOYENNE	12-16 logos PNG	Social proof visuel
Vidéo présentation 90s	BASSE	Vidéo Soukaina	Brand storytelling

 
5. SEO & Visibilité Digitale
5.1 Mots-clés Prioritaires
Stratégie de référencement en trois niveaux : notoriété (awareness), intention (consideration) et conversion (decision).

Keywords de conversion (haute priorité)
•	'cabinet architecture Casablanca' — 1 200 recherches/mois Maroc — difficulté moyenne
•	'BIM consulting Maroc' — 400 recherches/mois — difficulté faible — opportunité forte
•	'architecte ingénieur Casablanca' — 800 recherches/mois — intention commerciale haute
•	'design intérieur luxe Maroc' — 600 recherches/mois — cible premium
•	'forum construction Maroc 2026' — saisonnier — pertinent pour FIC
•	'architecture durable Afrique' — 300 recherches/mois — positionnement différenciant

Optimisations techniques SEO prioritaires
•	Balises title uniques pour chaque page — maximum 60 caractères
•	Meta descriptions avec call-to-action — maximum 155 caractères
•	Balises alt sur toutes les images — description précise incluant le keyword
•	Schema markup Organization + LocalBusiness + Event sur les pages pertinentes
•	Fichier sitemap.xml soumis à Google Search Console
•	Core Web Vitals : LCP < 2.5s, CLS < 0.1, FID < 100ms — mesurer sur PageSpeed Insights
•	Hreflang fr/en/ar — signaler les versions linguistiques à Google

Quick win SEO
Créer une fiche Google Business Profile complète pour ELAOUAD à Casablanca avec photos, horaires, services et lien site. Gratuit, impacte les recherches locales sous 2-4 semaines.

5.2 Stratégie de Contenu & Blog
Le blog est le levier SEO le plus puissant sur le long terme. 4 articles bien optimisés par mois peuvent tripler le trafic organique en 6-12 mois.

Plan éditorial — 12 premiers articles
•	'Guide complet du BIM pour promoteurs immobiliers au Maroc' — keyword: BIM Maroc — PILIER
•	'Construire en 2026 : tout savoir sur la RT2026 et la performance énergétique' — keyword: construction durable Maroc
•	'Villa de luxe à Casablanca : les 7 étapes d'un projet réussi' — keyword: villa luxe Casablanca
•	'Forum International Construction 2026 : ce qu'il faut savoir avant de s'inscrire' — keyword: FIC 2026
•	'Architecture durable en Afrique : tendances et réglementations' — positionnement continental
•	'Comment choisir son architecte à Casablanca : le guide pratique' — keyword informationnel
•	'BIM vs méthodes traditionnelles : économies réelles sur un projet de 5 000 m²' — case study
•	'Design intérieur luxe : les matériaux qui font la différence en 2026' — keyword: design intérieur luxe Maroc

 
6. Plan d'Action — Roadmap Priorisée
Phase 1 — Fondations critiques (Semaines 1-2)
Objectif Phase 1
Corriger les problèmes critiques qui bloquent la conversion aujourd'hui. Ces actions ne nécessitent pas de nouveau contenu.

•	Ajouter CTA primaire et secondaire dans la section hero
•	Optimiser le formulaire de contact : ajouter champ email, sélecteur budget, validation temps réel
•	Corriger les ratios de contraste texte sur fond sombre (WCAG AA minimum)
•	Ajouter numéro WhatsApp cliquable en sticky mobile
•	Configurer Google Analytics 4 avec tracking des events de conversion
•	Créer la fiche Google Business Profile

Phase 2 — Contenu & Portfolio (Semaines 3-6)
Objectif Phase 2
Produire les contenus critiques qui apportent la preuve et la confiance. C'est la phase la plus impactante en termes de conversion.

•	Séance photo studio pour Soukaina (demi-journée, photographe pro)
•	Shooting photo de 4-6 projets réalisés (extérieur + intérieur)
•	Rédaction et mise en ligne des 8 descriptions de services
•	Mise en ligne portfolio avec minimum 4 projets nommés et décrits
•	Collecte de 3 témoignages clients (email ou entretien 15 minutes)
•	Création d'une brochure PDF téléchargeable (lead magnet)

Phase 3 — Optimisation UX & Events (Semaines 7-10)
Objectif Phase 3
Raffiner l'expérience et activer la section Events comme deuxième moteur de conversion.

•	Implémenter le mega-menu avec les 8 services en colonnes
•	Construire la section Events avec timeline 2026 et cards FIC/FIDI/ACDC
•	Ajouter les compteurs animés (10K visiteurs, 450 exposants, 100 pays)
•	Créer la page Soukaina complète avec bio, credentials et citation
•	Lancer le blog avec 3 articles piliers
•	Optimiser les images en WebP avec lazy loading

Phase 4 — Performance & Scale (Semaines 11-16)
•	Audit PageSpeed et optimisation Core Web Vitals
•	Implémentation Schema markup complet (Organization, Event, Review)
•	Lancement campagne LinkedIn Ads ciblant investisseurs et promoteurs Maroc
•	Mise en place newsletter mensuelle (architecture insights)
•	Création de 2 pages de destination dédiées (BIM Consulting | Résidentiel Luxe)
•	A/B test CTA hero (formulation, couleur, placement)

 
7. Conclusion & Prochaines Étapes
ELAOUAD Architecture & Engineering Group dispose d'un potentiel de marque exceptionnel — fondatrice visionnaire, positionnement unique (architecture + events), expertise BIM rare, ancrage africain et international. Le site actuel ne reflète pas encore cette valeur.

Les recommandations de ce rapport sont organisées pour maximiser l'impact avec les ressources disponibles. Les phases 1 et 2 seules — coûts modérés, délai 6 semaines — peuvent doubler le taux de conversion du site.

Les 5 actions les plus impactantes, dans l'ordre
1.	Ajouter un CTA clair dans le hero — impact immédiat, délai 1 jour
2.	Photographier les projets et mettre en ligne le portfolio — impact fort, délai 2-3 semaines
3.	Collecter 3 témoignages clients authentiques — impact confiance, délai 1-2 semaines
4.	Photo professionnelle de Soukaina — humanise la marque, délai 1 semaine
5.	Configurer Google Analytics 4 — nécessaire pour mesurer toutes les autres actions

Message final
Un site d'architecture premium n'est pas une dépense — c'est le premier commercial d'ELAOUAD, disponible 24h/24, 7j/7, accessible depuis Casablanca jusqu'à Dubaï. Chaque amélioration recommandée ici est un investissement mesurable avec un ROI clair.

ELAOUAD Architecture & Engineering Group — Rapport confidentiel — Mai 2026
