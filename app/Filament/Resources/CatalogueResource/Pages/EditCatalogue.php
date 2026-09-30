<?php

namespace App\Filament\Resources\CatalogueResource\Pages;

use App\Filament\Resources\CatalogueResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCatalogue extends EditRecord
{
    protected static string $resource = CatalogueResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\DeleteAction::make()];
    }
}
