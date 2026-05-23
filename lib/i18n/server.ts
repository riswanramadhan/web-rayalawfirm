import { cookies } from 'next/headers';
import {
  localeCookieName,
  normalizeLocale,
  type Locale,
} from './config';

export function getCurrentLocale(): Locale {
  return normalizeLocale(cookies().get(localeCookieName)?.value);
}
