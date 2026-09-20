<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\PortfolioItem;
use App\Models\TeamMember;
use App\Models\OemPartner;

class ImportMedia extends Command
{
    protected $signature = 'import:media';
    protected $description = 'Bulk import company photos and videos';

    public function handle()
    {
        $this->info('Starting media import...');
        $files = Storage::disk('public')->files('media');
        $count = 0;

        foreach ($files as $file) {
            $filename = basename($file);
            $cleanName = str_replace(['-', '_'], ' ', pathinfo($filename, PATHINFO_FILENAME));
            $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
            $secureFilename = Str::random(32) . '.' . $extension;

            // 1. Try matching a Portfolio Item
            $portfolio = PortfolioItem::where('name', 'LIKE', '%' . $cleanName . '%')
                        ->orWhere('title', 'LIKE', '%' . $cleanName . '%')->first();
            
            // 2. Try matching a Team Member
            $team = TeamMember::where('name', 'LIKE', '%' . $cleanName . '%')->first();

            // 3. Try matching an OEM Partner
            $partner = OemPartner::where('name', 'LIKE', '%' . $cleanName . '%')->first();

            if ($portfolio) {
                Storage::disk('public')->copy($file, 'portfolio/' . $secureFilename);
                $portfolio->update(['image_path' => 'portfolio/' . $secureFilename]);
                $this->line("Linked Portfolio: {$filename}");
                $count++;
            } elseif ($team) {
                Storage::disk('public')->copy($file, 'team/' . $secureFilename);
                $team->update(['image_path' => 'team/' . $secureFilename]);
                $this->line("Linked Team: {$filename}");
                $count++;
            } elseif ($partner) {
                Storage::disk('public')->copy($file, 'partners/' . $secureFilename);
                $partner->update(['image_path' => 'partners/' . $secureFilename]);
                $this->line("Linked Partner: {$filename}");
                $count++;
            } else {
                $this->error("Skipped (No Match): {$filename}");
            }
        }

        $this->info("Import complete! Successfully linked {$count} files.");
    }
}