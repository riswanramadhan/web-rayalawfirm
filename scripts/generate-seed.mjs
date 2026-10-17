#!/usr/bin/env node
/**
 * Membuat supabase/seed.sql dari data statis (lib/data/* + terjemahan EN).
 *
 *   npm run db:seed:generate
 *
 * Seed memakai `on conflict (slug) do nothing`, jadi aman dijalankan ulang dan
 * tidak menimpa data yang sudah diedit admin.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';

const root = process.cwd();
const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'raya-seed-'));
const require = createRequire(import.meta.url);

const files = [
  'lib/data/articles.ts',
  'lib/data/team.ts',
  'lib/data/services.ts',
  'lib/data/testimonials.ts',
  'lib/i18n/config.ts',
  'lib/i18n/localized-data.ts',
  'lib/content/fallback.ts',
];

for (const rel of files) {
  const source = fs.readFileSync(path.join(root, rel), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    fileName: rel,
  });
  const rewritten = outputText.replace(/require\("@\/([^"]+)"\)/g, (_, target) =>
    `require(${JSON.stringify(path.join(outDir, `${target}.js`))})`
  );
  const dest = path.join(outDir, rel.replace(/\.ts$/, '.js'));
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, rewritten);
}

const { getStaticLawyerRows, getStaticArticleRows } = require(path.join(outDir, 'lib/content/fallback.js'));

const sqlText = (value) => (value === null || value === undefined ? 'null' : `'${String(value).replace(/'/g, "''")}'`);
const sqlArray = (items) =>
  !items || items.length === 0 ? `'{}'::text[]` : `array[${items.map((item) => sqlText(item)).join(', ')}]::text[]`;
const sqlJson = (value) => `${sqlText(JSON.stringify(value ?? []))}::jsonb`;
const sqlBool = (value) => (value ? 'true' : 'false');

const lawyerColumns = [
  'slug', 'name', 'position', 'position_en', 'specialization', 'specialization_en', 'bio', 'bio_en',
  'expertise', 'expertise_en', 'achievements', 'achievements_en', 'handled_cases', 'handled_cases_en',
  'education', 'image_url', 'linkedin', 'instagram', 'facebook', 'phone', 'email', 'sort_order', 'is_active',
];
const lawyerArrays = new Set(['expertise', 'expertise_en', 'achievements', 'achievements_en', 'handled_cases', 'handled_cases_en', 'education']);

const articleColumns = [
  'slug', 'title', 'title_en', 'excerpt', 'excerpt_en', 'content', 'content_en', 'category', 'category_en',
  'tags', 'tags_en', 'key_points', 'key_points_en', 'faqs', 'faqs_en', 'cover_image_url', 'cover_image_alt',
  'author_name', 'author_name_en', 'meta_title', 'meta_title_en', 'meta_description', 'meta_description_en',
  'featured', 'is_published', 'published_at', 'created_at', 'updated_at',
];
const articleArrays = new Set(['tags', 'tags_en', 'key_points', 'key_points_en']);
const articleJson = new Set(['faqs', 'faqs_en']);
const booleans = new Set(['featured', 'is_published', 'is_active']);
const timestamps = new Set(['published_at', 'created_at', 'updated_at']);

function valueFor(column, row, arrays, json = new Set()) {
  const value = row[column];
  if (arrays.has(column)) return sqlArray(value);
  if (json.has(column)) return sqlJson(value);
  if (booleans.has(column)) return sqlBool(value);
  if (timestamps.has(column)) return `${sqlText(value)}::timestamptz`;
  if (typeof value === 'number') return String(value);
  return sqlText(value);
}

const lawyers = getStaticLawyerRows();
const articles = getStaticArticleRows();

const lines = [
  '-- =============================================================================',
  '-- Raya Law Firm — data awal (pengacara & artikel). Dibuat otomatis oleh',
  '-- scripts/generate-seed.mjs — jangan edit manual.',
  '-- Jalankan SETELAH supabase/migrations/20261017000000_init.sql.',
  '-- Aman dijalankan ulang: data yang sudah ada (berdasarkan slug) tidak ditimpa.',
  '-- =============================================================================',
  '',
  `insert into public.lawyers (${lawyerColumns.join(', ')}) values`,
  lawyers
    .map((row) => `  (${lawyerColumns.map((column) => valueFor(column, row, lawyerArrays)).join(', ')})`)
    .join(',\n'),
  'on conflict (slug) do nothing;',
  '',
  `insert into public.articles (${articleColumns.join(', ')}) values`,
  articles
    .map((row) => `  (${articleColumns.map((column) => valueFor(column, row, articleArrays, articleJson)).join(', ')})`)
    .join(',\n'),
  'on conflict (slug) do nothing;',
  '',
];

const target = path.join(root, 'supabase', 'seed.sql');
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, lines.join('\n'));
fs.rmSync(outDir, { recursive: true, force: true });

console.log(`✔ ${path.relative(root, target)} — ${lawyers.length} pengacara, ${articles.length} artikel`);
