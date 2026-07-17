export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-lilac-100 text-lilac-500"
        aria-hidden
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 12 L8 21 M12 12 L16 21" />
          <path d="M12 12 C9 6 4 8 7 14" />
          <path d="M12 12 C15 6 20 8 17 14" />
        </svg>
      </div>
      <p className="text-base text-ink-muted leading-relaxed max-w-[16rem]">
        Nessuna registrazione per questo giorno.
      </p>
      <p className="mt-2 text-sm text-lilac-600/80">
        Usa il pulsante + per aggiungerne una.
      </p>
    </div>
  );
}
