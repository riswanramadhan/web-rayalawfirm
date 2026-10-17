function Bar({ className }: { className: string }) {
  return <div className={`rounded-lg bg-dark/[0.07] ${className}`} />;
}

export default function AdminPanelLoading() {
  return (
    <div className="animate-pulse space-y-8" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Memuat halaman…</span>

      <div className="space-y-3">
        <Bar className="h-3 w-28" />
        <Bar className="h-8 w-56 sm:w-72" />
        <Bar className="h-4 w-48" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className={`rounded-2xl border border-dark/[0.06] bg-white p-4 shadow-sm sm:p-5 ${item === 2 ? 'col-span-2 sm:col-span-1' : ''}`}
          >
            <div className="flex items-start justify-between">
              <Bar className="h-3.5 w-24" />
              <Bar className="h-9 w-9 rounded-xl" />
            </div>
            <Bar className="mt-3 h-8 w-20" />
            <Bar className="mt-2 h-3 w-28" />
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
        {[0, 1, 2].map((item) => (
          <div key={item} className="flex items-center gap-4 rounded-2xl border border-dark/[0.06] bg-white p-4 shadow-sm sm:flex-col sm:items-start sm:p-5">
            <Bar className="h-11 w-11 shrink-0 rounded-xl" />
            <div className="w-full space-y-2">
              <Bar className="h-4 w-32" />
              <Bar className="h-3 w-full max-w-[12rem]" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="overflow-hidden rounded-2xl border border-dark/[0.06] bg-white shadow-sm lg:col-span-3">
          <div className="border-b border-dark/[0.06] px-4 py-4 sm:px-6">
            <Bar className="h-4 w-36" />
          </div>
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="space-y-2.5 border-b border-dark/[0.06] px-4 py-4 last:border-0 sm:px-6">
              <Bar className="h-4 w-11/12" />
              <Bar className="h-3 w-40" />
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-2xl border border-dark/[0.06] bg-white shadow-sm lg:col-span-2">
          <div className="border-b border-dark/[0.06] px-4 py-4 sm:px-5">
            <Bar className="h-4 w-32" />
          </div>
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-3 border-b border-dark/[0.06] px-4 py-3 last:border-0 sm:px-5">
              <Bar className="h-11 w-11 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <Bar className="h-3.5 w-3/4" />
                <Bar className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
