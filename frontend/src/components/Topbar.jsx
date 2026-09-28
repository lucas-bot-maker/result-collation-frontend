export const Topbar = ({ title, subtitle, onMenuClick, action }) => (
  <header className="sticky top-0 z-20 bg-paper/90 backdrop-blur border-b border-line">
    <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-8">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="md:hidden rounded-md border border-line p-2 shrink-0"
          aria-label="Open menu"
        >
          <span className="block w-4 h-0.5 bg-ink mb-1" />
          <span className="block w-4 h-0.5 bg-ink mb-1" />
          <span className="block w-4 h-0.5 bg-ink" />
        </button>
        <div className="min-w-0">
          <h1 className="font-display text-2xl leading-tight text-ink truncate">{title}</h1>
          {subtitle && <p className="text-sm text-slate mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  </header>
);
