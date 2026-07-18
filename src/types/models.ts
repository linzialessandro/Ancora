export type Settings = {
  pazienteNome: string;
};

export type Entry = {
  id: string;
  date: string;
  ora: string;
  dove: string;
  conChi: string;
  fame: number | null;
  alimenti: string;
  pensieri: string;
  emozioni: string;
  sazieta: number | null;
  soddisfazione: number | null;
  durataMinuti: number | null;
  createdAt: string;
  updatedAt: string;
};

export type DayDataMap = Record<string, string>;

export type PyramidLevelId = 1 | 2 | 3 | 4 | 5;

export type PyramidItem = {
  id: string;
  label: string;
};

export type FoodPhobiaPyramid = {
  levels: Record<PyramidLevelId, PyramidItem[]>;
};

export type BodyPartId =
  | 'head'
  | 'arms'
  | 'chest'
  | 'belly'
  | 'hips'
  | 'legs'
  | 'overall';

export type PlateComponentId =
  | 'vegetables'
  | 'carbs'
  | 'proteins'
  | 'fats'
  | 'sugars'
  | 'micronutrients';

export type AppSection = 'diary' | 'pyramid' | 'body' | 'plate';

export type AppView = 'home' | AppSection;

export function createEmptyPyramid(): FoodPhobiaPyramid {
  return {
    levels: {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
    },
  };
}
