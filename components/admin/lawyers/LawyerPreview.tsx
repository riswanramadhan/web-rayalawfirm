import { LAWYER_PLACEHOLDER_IMAGE } from '@/lib/content/cache';

interface LawyerPreviewProps {
  name: string;
  position: string;
  specialization: string;
  /** URL foto tersimpan atau object URL dari file yang baru dipilih. */
  imageSrc: string | null;
  isActive: boolean;
}

/** Pratinjau kartu pengacara seperti di halaman /tim (tanpa hooks: aman untuk server & client). */
export default function LawyerPreview({ name, position, specialization, imageSrc, isActive }: LawyerPreviewProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-dark/45">Pratinjau di halaman Tim</p>
        {!isActive && (
          <span className="rounded-full bg-dark/5 px-2 py-0.5 text-[11px] font-semibold text-dark/55">Disembunyikan</span>
        )}
      </div>

      <div
        className={`mx-auto flex w-full max-w-[18rem] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg shadow-primary/10 ${
          isActive ? '' : 'opacity-60'
        }`}
        aria-hidden="true"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc || LAWYER_PLACEHOLDER_IMAGE}
            alt=""
            className={`absolute inset-0 h-full w-full ${imageSrc ? 'object-cover object-top' : 'object-contain p-10 opacity-60'}`}
          />
        </div>
        <div className="flex flex-col p-5">
          <p className="mb-1 break-words font-sans text-lg font-semibold leading-snug text-dark">
            {name.trim() || 'Nama Pengacara, S.H.'}
          </p>
          <p className="mb-3 break-words text-sm font-medium text-primary">{position.trim() || 'Jabatan'}</p>
          <span className="inline-block w-fit break-words rounded-full py-1 text-xs font-semibold text-primary">
            {specialization.trim() || 'Spesialisasi'}
          </span>
          <div className="mt-4 border-t border-gray-100 pt-4">
            <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary px-4 py-2.5 text-sm font-semibold text-primary">
              Lihat Profil
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <p className="text-center text-xs leading-relaxed text-dark/50">
        {imageSrc ? 'Tampilan perkiraan; ukuran menyesuaikan layar pengunjung.' : 'Belum ada foto — website memakai logo sebagai pengganti.'}
        {!isActive && ' Profil ini tidak tampil di website.'}
      </p>
    </div>
  );
}
