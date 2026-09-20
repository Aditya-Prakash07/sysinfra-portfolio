# Sanchar Telesystems — Setup & HostGator Deployment Guide

This overlay contains the Laravel/Filament/Inertia application layer on top
of a fresh Breeze install. Everything below assumes macOS locally and
HostGator shared hosting (cPanel) in production.

---

## 0. Before you write a line of code — check your HostGator plan

Shared hosting plans vary a lot. Log into cPanel and confirm, or open a
support ticket to ask:

1. **SSH access** — cPanel → "SSH Access". Some Baby/Hatchling plans don't
   include it; Business plans usually do. Without SSH you'll be running
   `composer install` and `artisan` commands via cPanel's "Terminal" app
   (if present) or the "Setup PHP App" tool, which is slower but works.
2. **PHP version** — cPanel → "Select PHP Version" (MultiPHP Manager).
   Laravel 11 requires **PHP 8.2+**. Set this *before* deploying, or Composer
   will silently install the wrong dependency versions.
3. **Composer availability** — cPanel → "Terminal" or SSH: run `composer -V`.
   If missing, HostGator's "Softaculous" doesn't help here; you'll need to
   upload a Composer phar or (simpler) run `composer install` locally and
   upload the populated `vendor/` folder via FTP/File Manager instead.
4. **Cron jobs** — cPanel → "Cron Jobs". You need at least one, for Laravel's
   scheduler (sitemap regeneration) and, if you ever add queued jobs, for
   `queue:work` alternatives (see step 6 below — shared hosting has no
   persistent worker process, so we avoid real queues entirely).

If SSH/Composer turn out to be unavailable, tell me and I'll adjust the
deployment steps to a pure-upload workflow.

---

## 1. Local setup (macOS)

```bash
composer create-project laravel/laravel sanchar-telesystems
cd sanchar-telesystems
php artisan breeze:install react
npm install
```

Now copy every file from this overlay's `overlay/` folder into your project,
preserving paths (e.g. `overlay/app/Models/PortfolioItem.php` →
`app/Models/PortfolioItem.php`). This **replaces** Breeze's default
`routes/web.php`, `resources/js/app.jsx`, `tailwind.config.js`, and
`resources/css/app.css` — that's expected, they've been rebuilt for this
project. It **adds** everything else (models, controllers, Filament
resources, migrations, pages, components).

```bash
composer require filament/filament:"^3.2"
php artisan filament:install --panels
php artisan make:filament-user     # create your own /admin login

php artisan storage:link
```

Set up your local database (MySQL, to match production) in `.env`, then:

```bash
php artisan migrate
php artisan db:seed
npm run dev     # in one terminal
php artisan serve   # in another
```

Visit `http://localhost:8000` for the public site and `/admin` for the
dashboard. Log in with the user you just created, then start uploading the
company's real product photos, banners, team photos, testimonial logos and
OEM logos through the admin UI — that's the whole point of Filament here:
no more touching code or cPanel File Manager to update content.

---

## 2. Content you still need to add through /admin

The seeder (`database/seeders/DatabaseSeeder.php`) recreates the category
tree, leadership team text, testimonial text, and stat labels from the
current live site — but **images, datasheets, and product-level data are
not seeded** (I don't have the company's raw image files). Go through:

- **Banners** — 4 hero images the company already has
- **Products** — for each subcategory, add the actual product models with
  photos, specs, and datasheets
- **OEM Partners** — replace the placeholder logo with each real OEM logo
- **Team** — add photos to the 5 leadership entries already seeded
- **Testimonials** — add the Parliament/SDB/Delhi Police logos
- **Company Stats** — set the real "Units Sold" / "Projects Delivered" /
  "Dealers" numbers (seeded as 0 for now)

---

## 3. Build for production

```bash
npm run build
```

This compiles React/Tailwind into static, hashed files in `public/build/`.
**Never run `npm run dev` or a Node server on HostGator** — shared hosting
has no persistent Node process, which is exactly why Inertia (SPA-feel,
server-rendered routing) was the right call here instead of a separate
Next.js frontend.

---

## 4. HostGator directory layout

HostGator's shared hosting serves whatever is in `public_html`. Laravel
assumes its own `public/` folder *is* the web root and everything else
(`app/`, `vendor/`, `.env`, etc.) sits one level above it, outside the
webroot. On shared hosting we simulate that by hand:

```
/home/yourcpaneluser/
├── sanchar_core/              ← everything EXCEPT the public/ folder
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── routes/
│   ├── storage/
│   ├── vendor/
│   ├── .env
│   ├── artisan
│   └── composer.json
└── public_html/                ← this is what the browser sees
    ├── build/                  ← from npm run build
    ├── storage/                ← symlink, see step 5c
    ├── index.php               ← MODIFIED, see step 4b
    ├── .htaccess
    ├── robots.txt
    └── sitemap.xml
```

### 4a. Upload

Via FTP (FileZilla) or cPanel File Manager:

1. Zip your whole project locally *excluding* `node_modules` and
   `.git`, upload, and extract in `/home/yourcpaneluser/sanchar_core/`.
2. Move the **contents** of `sanchar_core/public/` up into `public_html/`
   (not the `public` folder itself — its *contents*).
3. Delete the now-empty `public/` folder inside `sanchar_core/` — or leave
   it, doesn't matter, it's outside the webroot either way.

### 4b. Edit `public_html/index.php`

Open it and change the two `require` paths to point one level up and into
`sanchar_core`:

```php
require __DIR__.'/../sanchar_core/vendor/autoload.php';

$app = require_once __DIR__.'/../sanchar_core/bootstrap/app.php';
```

### 4c. Edit `public_html/.htaccess`

The default Laravel `.htaccess` doesn't need changes for this layout — it
already routes everything through `index.php`. Just confirm HostGator's
Apache has `mod_rewrite` on (it does, by default, on all HostGator shared
plans).

---

## 5. Environment, database & storage on HostGator

### 5a. Database

cPanel → "MySQL Databases" → create a database, a user, and grant the user
"All Privileges" on that database. HostGator prefixes both database and
username with your cPanel username automatically — copy the *exact*
generated names into `.env`.

### 5b. `.env` in `sanchar_core/`

```env
APP_NAME="Sanchar Telesystems"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://www.sanchartelesystems.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=cpaneluser_sanchar
DB_USERNAME=cpaneluser_sanchar
DB_PASSWORD=your-strong-password

FILESYSTEM_DISK=public
SESSION_DRIVER=database
QUEUE_CONNECTION=sync
```

`APP_DEBUG=false` is not optional in production — a stack trace exposed to
the public is a real security/SEO problem (crawlers index error pages).

`QUEUE_CONNECTION=sync` is deliberate: HostGator shared hosting has no
persistent worker process to run `php artisan queue:work` continuously.
Filament's image uploads and everything else in this build run
synchronously, which is fine at this scale — don't reach for Redis/Horizon
here, they need a dedicated process HostGator shared hosting won't give you.

### 5c. Storage symlink (the step people forget)

Locally, `php artisan storage:link` creates a symlink. Many HostGator
accounts allow this fine over SSH:

```bash
cd sanchar_core
php artisan storage:link
```

If your plan disallows symlinks (some restrictive shared configs do), the
fallback is to point `public_html/storage` at the real storage folder using
cPanel File Manager's "Create Symlink"-equivalent, or — simplest and most
portable — set `FILESYSTEM_DISK=public` and manually copy
`sanchar_core/storage/app/public` into `public_html/storage` after every
deploy via a small script. Tell me which situation you're in and I'll give
you the exact fallback.

### 5d. File permissions

```bash
chmod -R 755 sanchar_core/storage sanchar_core/bootstrap/cache
```

### 5e. Run migrations & seed on the server

```bash
cd sanchar_core
php artisan migrate --force
php artisan db:seed --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

`--force` is required because `APP_ENV=production` blocks destructive
commands without it. The three `:cache` commands matter more on shared
hosting than anywhere else — they remove per-request filesystem scanning
that's slow on HostGator's shared disk I/O.

---

## 6. Cron (sitemap regeneration)

cPanel → "Cron Jobs" → add one job:

```
*/5 * * * * php /home/yourcpaneluser/sanchar_core/artisan schedule:run >> /dev/null 2>&1
```

Laravel's own scheduler (see `routes/console.php`) decides that
`sanchar:generate-sitemap` only actually runs once a day — the cron entry
just needs to *check* frequently enough.

---

## 7. Security checklist specific to shared hosting

- `sanchar_core/` sits **outside** `public_html` — the single biggest win
  here, since `.env`, `vendor/`, and application source are never
  web-accessible even if `.htaccess` rewrite rules ever misbehave.
- Filament's `FileUpload` fields (already configured in every resource) are
  restricted to `jpg`/`png`/`webp` (or `pdf` for datasheets) and Filament
  renames every upload to a random hash on disk — nothing user-named or
  executable ever lands in `storage/app/public`.
- `/admin` is protected by Filament's own auth out of the box — make sure
  the user you create in step 1 uses a strong, unique password, since it's
  the only login surface on the whole site.
- Keep `APP_DEBUG=false` in production, always.
- Turn on HostGator's free AutoSSL (cPanel → SSL/TLS Status) so the whole
  site runs on HTTPS — Google treats this as a ranking factor and browsers
  flag HTTP forms (like your contact form) as "not secure" otherwise.

---

## 8. Redeploying after future changes

Every time you change PHP code, React code, or run new migrations:

```bash
# locally
npm run build
git add -A && git commit -m "..."   # if using git
# upload changed files to sanchar_core/ (or public_html/build for frontend-only changes)

# on the server
cd sanchar_core
php artisan migrate --force
php artisan config:cache && php artisan route:cache && php artisan view:cache
```

Content changes (new products, banners, team members) never need a deploy
at all — that's handled entirely through `/admin`.
