/** Jenis operasi tulis yang boleh dilakukan admin (sesuai cakupan). */
export type WriteAction = 'lawyer.create' | 'lawyer.update' | 'article.create';

export type WriteAccessResult =
  | { status: 'enabled' }
  | { status: 'hold' }
  | { status: 'unauthorized'; message: string }
  | { status: 'error'; message: string };

export type SaveResult<T = undefined> =
  | { status: 'ok'; data: T; message?: string }
  | { status: 'hold' }
  | { status: 'invalid'; message: string; fieldErrors: Record<string, string> }
  | { status: 'unauthorized'; message: string }
  | { status: 'error'; message: string };
