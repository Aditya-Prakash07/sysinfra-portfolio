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
    protected static ?string $navigationIcon = 'heroicon-o-cpu-chip';
    protected static ?string $navigationGroup = 'Company';
    protected static ?string $navigationLabel = 'OEM Partners';
    protected static ?string $modelLabel = 'OEM Partner';
    protected static ?string $pluralModelLabel = 'OEM Partners';
    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')
                ->label('OEM Partner Name')
                ->required()
                ->placeholder('e.g. Kenwood Corporation, Japan / Motorola Solutions'),
            Forms\Components\Textarea::make('description')
                ->label('Partnership Overview & Credentials')
                ->rows(4)
                ->columnSpanFull(),
            Forms\Components\FileUpload::make('logo_path')
                ->label('Partner Logo')
                ->disk('public')
                ->directory('partners')
                ->image()
                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
            Forms\Components\TextInput::make('website_url')
                ->label('Official Website URL')
                ->url()
                ->placeholder('https://www.example.com'),
            Forms\Components\TextInput::make('sort_order')
                ->numeric()
                ->default(0),
            Forms\Components\Toggle::make('is_published')
                ->label('Published')
                ->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\ImageColumn::make('logo_path')
                ->label('Logo')
                ->height(36),
            Tables\Columns\TextColumn::make('name')
                ->label('OEM Partner')
                ->searchable()
                ->sortable(),
            Tables\Columns\TextColumn::make('description')
                ->limit(60)
                ->toggleable(),
            Tables\Columns\IconColumn::make('is_published')
                ->label('Visible')
                ->boolean()
                ->sortable(),
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
