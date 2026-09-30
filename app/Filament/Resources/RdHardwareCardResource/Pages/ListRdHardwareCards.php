<?php

namespace App\Filament\Resources\RdHardwareCardResource\Pages;

use App\Filament\Resources\RdHardwareCardResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListRdHardwareCards extends ListRecords
{
    protected static string $resource = RdHardwareCardResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\CreateAction::make()];
    }
}
