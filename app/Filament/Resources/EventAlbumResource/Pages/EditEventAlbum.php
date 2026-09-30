<?php

namespace App\Filament\Resources\EventAlbumResource\Pages;

use App\Filament\Resources\EventAlbumResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditEventAlbum extends EditRecord
{
    protected static string $resource = EventAlbumResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\DeleteAction::make()];
    }
}
