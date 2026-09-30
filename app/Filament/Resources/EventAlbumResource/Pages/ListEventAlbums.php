<?php

namespace App\Filament\Resources\EventAlbumResource\Pages;

use App\Filament\Resources\EventAlbumResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListEventAlbums extends ListRecords
{
    protected static string $resource = EventAlbumResource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\CreateAction::make()];
    }
}
