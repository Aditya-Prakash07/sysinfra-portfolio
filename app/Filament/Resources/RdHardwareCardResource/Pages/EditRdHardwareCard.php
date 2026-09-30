<?php

namespace App\Filament\Resources\RdHardwareCardResource\Pages;

use App\Filament\Resources\RdHardwareCardResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditRdHardwareCard extends EditRecord
{
    protected static string $resource = RdHardwareCardResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\DeleteAction::make()];
    }
}
