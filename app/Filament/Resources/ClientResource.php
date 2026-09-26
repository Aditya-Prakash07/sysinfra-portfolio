<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ClientResource\Pages;
use App\Models\Client;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ClientResource extends Resource
{
    protected static ?string $model = Client::class;
    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $navigationGroup = 'Company';
    protected static ?string $navigationLabel = 'Our Clients';
    protected static ?string $modelLabel = 'Client';
    protected static ?string $pluralModelLabel = 'Our Clients';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')
                ->label('Client Name')
                ->required()
                ->placeholder('e.g. Bharti Airtel, Reliance Jio'),

            Forms\Components\Select::make('sector')
                ->label('Industry / Sector')
                ->options([
                    'Telecom Operators & TowerCos' => 'Telecom Operators & TowerCos',
                    'Energy, Power & Utilities' => 'Energy, Power & Utilities',
                    'Defence & Homeland Security' => 'Defence & Homeland Security',
                    'Transportation & Public Utilities' => 'Transportation & Public Utilities',
                    'Infrastructure & EPC Leaders' => 'Infrastructure & EPC Leaders',
                    'OEM Power & Equipment Partners' => 'OEM Power & Equipment Partners',
                    'HVAC & Climate Control' => 'HVAC & Climate Control',
                    'Genset & Power Generation' => 'Genset & Power Generation',
                ])
                ->searchable(),

            Forms\Components\TextInput::make('highlight')
                ->label('Key Deployment Highlight')
                ->placeholder('e.g. Nationwide AMF Deployment across 35,000+ Cell Sites')
                ->columnSpanFull(),

            Forms\Components\Textarea::make('description')
                ->rows(3)
                ->columnSpanFull(),

            Forms\Components\FileUpload::make('logo_path')
                ->label('Client Logo')
                ->disk('public')
                ->directory('clients')
                ->image()
                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),

            Forms\Components\TextInput::make('website_url')
                ->label('Website URL')
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
                ->label('Client Name')
                ->searchable()
                ->sortable(),
            Tables\Columns\TextColumn::make('sector')
                ->badge()
                ->searchable()
                ->sortable(),
            Tables\Columns\TextColumn::make('highlight')
                ->limit(40)
                ->toggleable(),
            Tables\Columns\IconColumn::make('is_published')
                ->label('Visible')
                ->boolean()
                ->sortable(),
        ])
        ->reorderable('sort_order')
        ->defaultSort('sort_order')
        ->actions([
            Tables\Actions\EditAction::make(),
            Tables\Actions\DeleteAction::make(),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListClients::route('/'),
            'create' => Pages\CreateClient::route('/create'),
            'edit' => Pages\EditClient::route('/{record}/edit'),
        ];
    }
}
