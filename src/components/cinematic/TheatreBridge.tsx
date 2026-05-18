'use client';

export const shotLabels = [
  'shot_hero_establishing',
  'shot_enter_blueprint',
  'shot_blueprint_top_view',
  'shot_foundation_tilt',
  'shot_structure_tracking',
  'shot_expertise_architecture',
  'shot_expertise_bim',
  'shot_expertise_interior',
  'shot_gallery_flythrough',
  'shot_founder_dolly',
  'shot_event_crane',
  'shot_testimonials_pan',
  'shot_final_pullback',
] as const;

export type ShotLabel = typeof shotLabels[number];

export const shotRanges: Record<ShotLabel, [number, number]> = {
  shot_hero_establishing: [0, 0.077],
  shot_enter_blueprint: [0.077, 0.154],
  shot_blueprint_top_view: [0.154, 0.231],
  shot_foundation_tilt: [0.231, 0.308],
  shot_structure_tracking: [0.308, 0.385],
  shot_expertise_architecture: [0.385, 0.462],
  shot_expertise_bim: [0.462, 0.539],
  shot_expertise_interior: [0.539, 0.615],
  shot_gallery_flythrough: [0.615, 0.692],
  shot_founder_dolly: [0.692, 0.769],
  shot_event_crane: [0.769, 0.846],
  shot_testimonials_pan: [0.846, 0.923],
  shot_final_pullback: [0.923, 1.0],
};

export function getCurrentShot(progress: number): ShotLabel {
  for (const [shot, [start, end]] of Object.entries(shotRanges)) {
    if (progress >= start && progress < end) {
      return shot as ShotLabel;
    }
  }
  return 'shot_final_pullback';
}

export function getShotLabel(index: number): ShotLabel {
  return shotLabels[index] ?? 'shot_final_pullback';
}

export const shotDescriptions: Record<ShotLabel, string> = {
  shot_hero_establishing: 'Vue d\'ensemble héroïque',
  shot_enter_blueprint: 'Entrée dans les plans architecturaux',
  shot_blueprint_top_view: 'Vue de dessus des fondations',
  shot_foundation_tilt: 'Inclinaison vers la structure',
  shot_structure_tracking: 'Suivi de la structure en elevation',
  shot_expertise_architecture: 'Architecture & Design',
  shot_expertise_bim: 'Modélisation BIM',
  shot_expertise_interior: 'Design Intérieur',
  shot_gallery_flythrough: 'Parcours galerie de projets',
  shot_founder_dolly: 'Approche du fondateur',
  shot_event_crane: 'Mouvement événementiel',
  shot_testimonials_pan: 'Panoramique témoignages',
  shot_final_pullback: 'Recul final révélateur',
};