<?php

namespace App\Filament\Resources\OemPartnerResource\Pages;

use App\Filament\Resources\OemPartnerResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditOemPartner extends EditRecord
{
    protected static string $resource = OemPartnerResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\DeleteAction::make()];
    }
}
