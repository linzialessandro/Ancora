import {
  BookOpen,
  Layers,
  User,
  PieChart,
  Settings as SettingsIcon,
} from 'lucide-react';
import type { AppSection } from '../types/models';
import { SectionHeader } from './SectionHeader';

type Props = {
  onOpenSection: (section: AppSection) => void;
  onOpenInfo: () => void;
  onOpenDonate: () => void;
  onOpenSettings: () => void;
};

const CARDS: {
  id: AppSection;
  title: string;
  description: string;
  icon: typeof BookOpen;
}[] = [
  {
    id: 'diary',
    title: 'Diario alimentare',
    description: 'Registrazioni quotidiane ed export PDF',
    icon: BookOpen,
  },
  {
    id: 'pyramid',
    title: 'Piramide dei cibifobici',
    description: 'Ordina i cibi per quanto ti spaventano',
    icon: Layers,
  },
  {
    id: 'body',
    title: 'Il mio corpo',
    description: 'Stereotipi e spiegazioni scientifiche',
    icon: User,
  },
  {
    id: 'plate',
    title: 'Il piatto',
    description: 'Componenti di un pasto, in modo chiaro',
    icon: PieChart,
  },
];

function LilacRibbonIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 12 L8 21 M12 12 L16 21" />
      <path d="M12 12 C9 6 4 8 7 14" />
      <path d="M12 12 C15 6 20 8 17 14" />
    </svg>
  );
}

export function HomeScreen({
  onOpenSection,
  onOpenInfo,
  onOpenDonate,
  onOpenSettings,
}: Props) {
  return (
    <>
      <SectionHeader
        title="Ancora"
        homeBrand
        brandIcon={<LilacRibbonIcon />}
        onInfo={onOpenInfo}
        onDonate={onOpenDonate}
        extraActions={
          <button
            type="button"
            onClick={onOpenSettings}
            className="p-2.5 min-w-11 min-h-11 hover:bg-white/20 rounded-full transition-colors"
            title="Impostazioni"
            aria-label="Apri impostazioni"
          >
            <SettingsIcon size={22} />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-lilac-50 to-lilac-100/40 px-4 py-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <p className="text-center text-sm text-ink-muted mb-6">Scegli uno strumento</p>

        <div className="grid gap-3">
          {CARDS.map(({ id, title, description, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => onOpenSection(id)}
              className="section-card w-full text-left p-4 flex items-center gap-4 hover:border-lilac-300 hover:bg-lilac-50/50 active:scale-[0.99] transition-all min-h-[4.5rem]"
              aria-label={`Apri ${title}`}
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lilac-100 text-lilac-600"
                aria-hidden
              >
                <Icon size={24} strokeWidth={1.75} />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-ink">{title}</span>
                <span className="block text-sm text-ink-muted mt-0.5 leading-snug">
                  {description}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
