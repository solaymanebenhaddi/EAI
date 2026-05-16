export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  return (
    <main className="pt-40 pb-20 container mx-auto px-6 min-h-screen">
      <h1 className="font-display text-display-lg text-parchment italic mb-12">
        Projet: {params.slug}
      </h1>
      <p className="font-body text-[18px] text-mortar max-w-[600px]">
        Détails du projet à venir.
      </p>
    </main>
  );
}
