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
