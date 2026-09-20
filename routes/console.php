<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Regenerate sitemap.xml nightly. On HostGator, a single cron entry running
// `php artisan schedule:run` every 5 minutes (the finest granularity most
// shared-hosting cPanel cron UIs allow) is enough — Laravel's scheduler
// itself decides when 'daily' actually fires. See README-DEPLOYMENT.md.
Schedule::command('sanchar:generate-sitemap')->daily();
