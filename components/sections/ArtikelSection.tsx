import Image from 'next/image';
import Link from 'next/link';
import { articles } from '../../lib/data/articles';

const getFeaturedArticles = () => {
  const featured = articles.filter((article) => article.featured);
  const fallback = articles.filter((article) => !article.featured);
  return [...featured, ...fallback].slice(0, 3);
};

export default function ArtikelSection() {
  const featuredArticles = getFeaturedArticles();
  const [mainArticle, ...secondaryArticles] = featuredArticles;

  if (!mainArticle) {
    return null;
  }

  return (
    <section className="bg-offwhite py-16 sm:py-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col space-y-12 px-6 sm:px-8 lg:px-16">
        <div data-aos="fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary">
            Insight Hukum
          </span>
          <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight text-dark lg:text-5xl">
            Artikel dan Analisis Terkini
          </h2>
          <p className="mt-4 font-body text-base text-dark/70 lg:text-lg">
            Rangkuman topik penting untuk membantu Anda memahami risiko dan peluang
            hukum secara tepat.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          <Link
            href={`/artikel/${mainArticle.slug}`}
            data-aos="fade-right"
            className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl lg:col-span-2"
          >
            <div className="relative h-[420px] w-full">
              <Image
                src={mainArticle.image}
                alt={mainArticle.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 720px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/40 to-transparent" />
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
              <span className="inline-flex w-fit items-center rounded-full bg-primary/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                {mainArticle.category}
              </span>
              <h3 className="mt-4 font-sans text-2xl font-bold tracking-tight lg:text-3xl">
                {mainArticle.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm text-white/80">
                {mainArticle.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-white/70">
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.25a7.5 7.5 0 0115 0" />
                  </svg>
                  {mainArticle.author}
                </span>
                <span>·</span>
                <span>{mainArticle.date}</span>
                <span>·</span>
                <span>{mainArticle.readTime}</span>
              </div>
            </div>
          </Link>

          <div className="flex flex-col gap-6">
            {secondaryArticles.map((article, index) => (
              <Link
                key={article.slug}
                href={`/artikel/${article.slug}`}
                data-aos="fade-left"
                data-aos-delay={100 + index * 100}
                className="group flex overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative w-2/5">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 40vw, 240px"
                  />
                </div>
                <div className="flex w-3/5 flex-col justify-between p-4">
                  <div>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                      {article.category}
                    </span>
                    <h4 className="mt-3 font-sans text-lg font-semibold text-dark">
                      {article.title}
                    </h4>
                    <p className="mt-2 text-sm text-dark/70">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 text-xs text-dark/50">
                    {article.date} · {article.readTime}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-center" data-aos="fade-up">
          <Link
            href="/artikel"
            className="inline-flex items-center gap-2 rounded-xl border border-primary/30 px-6 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10"
          >
            Baca Semua Artikel
            <svg
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8.22 5.22a.75.75 0 011.06 0l5 5a.75.75 0 010 1.06l-5 5a.75.75 0 11-1.06-1.06L12.19 11 8.22 7.03a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
