
export enum Edibility {
  EDIBLE = 'Edible',
  POISONOUS = 'Poisonous',
  INEDIBLE = 'Inedible',
  UNKNOWN = 'Unknown',
}

export interface MushroomAnalysis {
  species: string;
  edibility: Edibility;
  description: string;
  confidence: number;
}
