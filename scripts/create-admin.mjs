#!/usr/bin/env node
/**
 * Membuat (atau memperbarui password) akun admin di Supabase Auth dan
 * memastikan emailnya terdaftar di public.admin_allowlist.
 *
 *   npm run admin:create -- admin@rayalawfirm.com "PasswordAnda"
 *
 * Membutuhkan NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di
 * .env.local. Service role key JANGAN pernah dipakai di kode frontend.
 */
import { createClient } from '@supabase/supabase-js';

const [emailArg, password] = process.argv.slice(2);
const email = emailArg?.trim().toLowerCase();

if (!email || !password) {
  console.error('Pemakaian: npm run admin:create -- <email> <password>');
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY wajib diisi di .env.local');
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function findUserByEmail(target) {
  for (let page = 1; page <= 20; page += 1) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw error;
    const found = data.users.find((user) => user.email?.toLowerCase() === target);
    if (found) return found;
    if (data.users.length < 200) return null;
  }
  return null;
}

const existing = await findUserByEmail(email);

if (existing) {
  const { error } = await supabase.auth.admin.updateUserById(existing.id, {
    password,
    email_confirm: true,
  });
  if (error) throw error;
  console.log(`✔ Password akun ${email} diperbarui & email dikonfirmasi.`);
} else {
  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) throw error;
  console.log(`✔ Akun admin ${email} dibuat.`);
}

const { error: allowError } = await supabase
  .from('admin_allowlist')
  .upsert({ email }, { onConflict: 'email', ignoreDuplicates: true });

if (allowError) {
  console.error('⚠ Gagal menambahkan ke admin_allowlist (sudah jalankan migration?):', allowError.message);
  process.exit(1);
}

console.log(`✔ ${email} terdaftar sebagai admin. Login di /admin/login`);
