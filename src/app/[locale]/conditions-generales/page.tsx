import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return {
    title: 'Conditions Générales d\'Inscription | ELAOUAD Architecture & Ingénierie',
    description: 'Conditions générales d\'inscription et politique de confidentialité pour les formations LYKORA DESIGN SCHOOL.',
  };
}

export default async function ConditionsGeneralesPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <main className="min-h-screen pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="font-display text-4xl mb-12 text-eai-ink">CONDITIONS GÉNÉRALES D'INSCRIPTION</h1>
          <div className="prose prose-lg max-w-none text-eai-warm-grey">
            <h2 className="text-xl font-bold mb-4">Transparence · Engagement · Excellence</h2>
            <p className="mb-8">En validant votre inscription à une formation proposée par LYKORA DESIGN SCHOOL, vous reconnaissez avoir lu, compris et accepté l'intégralité des conditions ci-après. Ces conditions constituent un engagement contractuel entre le participant et LYKORA DESIGN SCHOOL, régi par le droit marocain.</p>
            
            <h3 className="text-lg font-bold mt-8 mb-4">Article 1. MODALITÉS D'INSCRIPTION ET DE PAIEMENT</h3>
            <p className="mb-4"><strong>1.1</strong> L'inscription est considérée comme définitive uniquement après réception du paiement total ou d'un acompte, selon les modalités précisées pour chaque formation.</p>
            <p className="mb-4"><strong>1.2</strong> LYKORA DESIGN SCHOOL se réserve le droit d'annuler toute inscription non réglée dans les délais communiqués.</p>
            <p className="mb-4"><strong>1.3</strong> Toute information communiquée lors de l'inscription doit être exacte, complète et à jour. Toute fausse déclaration peut entraîner l'annulation immédiate de l'inscription sans remboursement.</p>
            
            <h3 className="text-lg font-bold mt-8 mb-4">Article 2. POLITIQUE D'ANNULATION ET DE REMBOURSEMENT</h3>
            <p className="mb-4"><strong>2.1</strong> Remboursement intégral : le participant peut demander un remboursement complet jusqu'à la veille de la première séance de la formation.</p>
            <p className="mb-4"><strong>2.2</strong> En cas de réservation de place, une demande de remboursement peut être formulée dans un délai maximum de 48 heures après la réservation, à condition que la formation n'ait pas encore débuté.</p>
            <p className="mb-4 italic">ℹ Règle de priorité : les articles 2.1 et 2.2 sont cumulatifs. C'est la condition la plus favorable au participant qui s'applique en premier lieu.</p>
            <p className="mb-4"><strong>2.3</strong> Après le début de la formation, aucun remboursement n'est possible, sauf en cas de force majeure dûment justifiée (maladie grave, hospitalisation, accident, décès d'un proche du premier degré).</p>
            <p className="mb-4"><strong>2.4</strong> Les remboursements sont effectués dans un délai de 7 à 14 jours ouvrés, par le même moyen de paiement qu'à l'inscription.</p>

            <h3 className="text-lg font-bold mt-8 mb-4">Article 3. REPORT, ABSENCES ET ENGAGEMENT DU PARTICIPANT</h3>
            <p className="mb-4"><strong>3.1</strong> Le participant peut reporter au maximum deux séances successives et trois séances au total sur toute la durée de la formation. Les séances reportées doivent impérativement être rattrapées dans un délai de 30 jours calendaires suivant la séance reportée, dans la limite de la date de fin de formation.</p>
            <p className="mb-4"><strong>3.2</strong> Tout report doit être demandé au minimum 24 heures à l'avance. À défaut, la séance est considérée comme suivie et ne pourra pas être rattrapée.</p>
            <p className="mb-4"><strong>3.3</strong> Toute absence injustifiée est considérée comme une séance perdue et n'ouvre droit à aucun remboursement ni report.</p>
            <p className="mb-4"><strong>3.4</strong> LYKORA DESIGN SCHOOL peut exiger un justificatif (certificat médical ou équivalent) en cas d'absences répétées ou prolongées.</p>
            <p className="mb-4"><strong>3.5</strong> Le participant s'engage à respecter les horaires, la discipline interne et les consignes pédagogiques afin de garantir un déroulement optimal de la formation pour l'ensemble du groupe.</p>

            <h3 className="text-lg font-bold mt-8 mb-4">Article 4. TRANSFERT D'INSCRIPTION ET CHANGEMENT DE SESSION</h3>
            <p className="mb-4"><strong>4.1</strong> Le participant peut demander le transfert de son inscription vers une autre session, sous réserve de places disponibles.</p>
            <p className="mb-4"><strong>4.2</strong> Le transfert est possible uniquement si la formation initiale n'a pas encore débuté.</p>
            <p className="mb-4"><strong>4.3</strong> Des frais administratifs de 150 MAD sont applicables à partir du deuxième changement de session. Tout changement supplémentaire fera l'objet d'une facturation identique.</p>

            <h3 className="text-lg font-bold mt-8 mb-4">Article 5. RESPONSABILITÉ ET CONDITIONS DE FORMATION</h3>
            <p className="mb-4"><strong>5.1</strong> LYKORA DESIGN SCHOOL met en œuvre tous les moyens nécessaires pour assurer la qualité des contenus et de l'encadrement, mais ne peut être tenue responsable :</p>
            <ul className="list-disc pl-6 mb-4">
                <li>des retards ou absences du participant ;</li>
                <li>de la non-acquisition des compétences en cas de manque d'assiduité ou de travail personnel ;</li>
                <li>de tout usage non conforme des connaissances acquises.</li>
            </ul>
            <p className="mb-4"><strong>5.2</strong> Les supports fournis (documents, vidéos, plateformes en ligne, etc.) sont strictement réservés à un usage personnel. Toute copie, diffusion ou partage non autorisé constitue une violation des droits de propriété intellectuelle de LYKORA DESIGN SCHOOL et pourra faire l'objet de poursuites civiles et/ou pénales conformément à la législation marocaine en vigueur.</p>

            <h3 className="text-lg font-bold mt-8 mb-4">Article 6. MODIFICATION OU ANNULATION PAR L'ORGANISME</h3>
            <p className="mb-4"><strong>6.1</strong> LYKORA DESIGN SCHOOL peut reporter une formation ou modifier les dates en cas de nécessité pédagogique, d'indisponibilité d'un formateur ou de tout événement exceptionnel. Le participant en sera informé dans les meilleurs délais par tout moyen de communication disponible.</p>
            <p className="mb-4"><strong>6.2</strong> En cas d'annulation totale d'une formation par l'organisme, le participant est intégralement remboursé des sommes versées dans un délai de 7 à 14 jours ouvrés, sans autre indemnité complémentaire.</p>

            <h3 className="text-lg font-bold mt-8 mb-4">Article 7. FORCE MAJEURE</h3>
            <p className="mb-4">Sont considérés comme cas de force majeure les événements imprévisibles, irrésistibles et indépendants de la volonté des parties (catastrophe naturelle, arrêt de services essentiels, pandémie, maladie grave, décision gouvernementale, etc.). Ces situations peuvent conduire à une adaptation, suspension ou reprogrammation de la formation sans qu'aucune responsabilité ne puisse être engagée de part et d'autre.</p>

            <h3 className="text-lg font-bold mt-8 mb-4">Article 8. PROTECTION DES DONNÉES PERSONNELLES</h3>
            <p className="mb-4">Conformément à la Loi n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, LYKORA DESIGN SCHOOL s'engage à :</p>
            <ul className="list-disc pl-6 mb-4">
                <li>collecter uniquement les données strictement nécessaires à la gestion des inscriptions et des formations ;</li>
                <li>ne pas transmettre ces données à des tiers sans consentement préalable du participant ;</li>
                <li>garantir un droit d'accès, de rectification et de suppression sur simple demande écrite adressée à l'organisme ;</li>
                <li>conserver les données dans des conditions sécurisées pour la durée légale applicable.</li>
            </ul>

            <h3 className="text-lg font-bold mt-8 mb-4">Article 9. RÈGLEMENT DES LITIGES ET DROIT APPLICABLE</h3>
            <p className="mb-4"><strong>9.1</strong> En cas de différend relatif à l'interprétation ou à l'exécution des présentes conditions, les parties s'engagent à rechercher en priorité une solution amiable dans un délai de 30 jours à compter de la notification du litige.</p>
            <p className="mb-4"><strong>9.2</strong> À défaut d'accord amiable, tout litige sera soumis à la compétence exclusive du Tribunal de Commerce du ressort du siège social de LYKORA DESIGN SCHOOL.</p>
            <p className="mb-4"><strong>9.3</strong> Les présentes conditions sont régies et interprétées conformément au droit marocain.</p>

            <h3 className="text-lg font-bold mt-8 mb-4">Article 10. ACCEPTATION DES CONDITIONS</h3>
            <p className="mb-8">En validant le formulaire d'inscription et en cliquant sur le bouton de confirmation, le participant reconnaît avoir lu et accepter l'intégralité des présentes Conditions Générales d'Inscription, qui constituent un engagement contractuel ferme et opposable entre lui et LYKORA DESIGN SCHOOL.</p>

            <hr className="my-8 border-eai-line" />
            
            <h3 className="text-xl font-bold mt-8 mb-4">RÉSUMÉ EXÉCUTIF — POINTS CLÉS</h3>
            <ul className="list-disc pl-6 mb-8 space-y-2">
                <li><strong>📋 Inscription :</strong> Définitive après réception du paiement total ou de l'acompte convenu.</li>
                <li><strong>💰 Remboursement :</strong> Intégral jusqu'à la veille de la 1ʳᵉ séance, ou dans les 48h après réservation (si non démarrée).</li>
                <li><strong>🚫 Après début :</strong> Aucun remboursement, sauf force majeure dûment justifiée.</li>
                <li><strong>🔄 Report séances :</strong> Maximum 2 séances successives et 3 au total — demande 24h à l'avance.</li>
                <li><strong>⚖️ Litiges :</strong> Médiation amiable prioritaire — Tribunal de Commerce compétent (droit marocain).</li>
                <li><strong>🔒 Données & PI :</strong> Données protégées (Loi 09-08) — supports strictement à usage personnel.</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
