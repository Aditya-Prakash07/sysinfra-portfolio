<?php

namespace App\Filament\Resources\CompanyStatResource\Pages;

use App\Filament\Resources\CompanyStatResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCompanyStat extends EditRecord
{
    protected static string $resource = CompanyStatResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\DeleteAction::make()];
    }
}
