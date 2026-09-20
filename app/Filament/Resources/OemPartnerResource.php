<?php

namespace App\Filament\Resources;

use App\Models\OemPartner;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class OemPartnerResource extends Resource
{
    protected static ?string $model = OemPartner::class;
    protected static ?string $navigationIcon = 'heroicon-o-building-office-2';
    protected static ?string $navigationGroup = 'Company';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')->required(),
            Forms\Components\Textarea::make('description')->rows(4)->columnSpanFull(),
            Forms\Components\FileUpload::make('logo_path')
                ->image()->disk('public')->directory('partners')->required()
                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp']),
            Forms\Components\TextInput::make('website_url')->url(),
            Forms\Components\TextInput::make('sort_order')->numeric()->default(0),
            Forms\Components\Toggle::make('is_published')->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\ImageColumn::make('logo_path')->label(''),
            Tables\Columns\TextColumn::make('name')->searchable(),
            Tables\Columns\IconColumn::make('is_published')->boolean(),
        ])->reorderable('sort_order')->defaultSort('sort_order')
          ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => OemPartnerResource\Pages\ListOemPartners::route('/'),
            'create' => OemPartnerResource\Pages\CreateOemPartner::route('/create'),
            'edit' => OemPartnerResource\Pages\EditOemPartner::route('/{record}/edit'),
        ];
    }
}
