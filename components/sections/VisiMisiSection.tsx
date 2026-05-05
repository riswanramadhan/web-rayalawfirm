const missions: string[] = [
  'Memberikan layanan hukum profesional, integritas tinggi, dan berorientasi hasil.',
  'Mendampingi klien dengan pendekatan personal dan solusi strategis.',
  'Berkontribusi pada penegakan hukum dan keadilan di Indonesia.',
  'Membangun kepercayaan melalui transparansi dan komunikasi yang efektif.',
];

export default function VisiMisiSection() {
  return (
    <section className="relative bg-gradient-to-br from-navy to-navy/90 py-16 sm:py-20 lg:py-24 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full border border-primary/20 opacity-40" />
        <div className="absolute left-12 bottom-16 h-40 w-40 rounded-full border border-accent/20 opacity-50" />
        <svg
          className="absolute right-0 top-0 h-64 w-64 text-primary/20"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="1" />
          <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 sm:gap-16 lg:grid-cols-[1.1fr_1.4fr] lg:px-16">
        <div data-aos="fade-right" className="relative">
          <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle,_rgba(255,255,255,0.12)_1px,_transparent_1px)] [background-size:24px_24px] opacity-40" />
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-10">
            <p className="font-sans text-[200px] leading-none text-primary/20">"</p>
            <p className="-mt-20 font-body text-base text-white/80 lg:text-lg">
              Kami percaya bahwa keadilan lahir dari keberanian, integritas, dan
              dedikasi pada prinsip hukum yang benar.
            </p>
          </div>
        </div>

        <div data-aos="fade-left" className="space-y-8">
          <div
            data-aos="fade-left"
            data-aos-delay="100"
            className="rounded-2xl border border-white/10 bg-white/5 p-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v2m0 14v2M7 5h10l2 7-2 7H7l-2-7 2-7z" />
                </svg>
              </span>
              <h3 className="font-sans text-2xl font-bold">Visi</h3>
            </div>
            <p className="mt-4 font-body text-base text-white/80 lg:text-lg">
              Menjadi kantor hukum terdepan di Indonesia yang menghadirkan
              keadilan, kejujuran, dan pelayanan hukum berkualitas tinggi bagi
              seluruh lapisan masyarakat.
            </p>
          </div>

          <div data-aos="fade-left" data-aos-delay="200" className="space-y-4">
            <h3 className="font-sans text-2xl font-bold">Misi</h3>
            <div className="space-y-4">
              {missions.map((mission, index) => (
                <div key={mission} className="flex items-start gap-4">
                  <svg
                    className="mt-1 h-5 w-5 flex-shrink-0 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <p className="font-body text-base text-white/80 lg:text-lg">{mission}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
