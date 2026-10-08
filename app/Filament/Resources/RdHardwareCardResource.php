<?php

namespace App\Filament\Resources;

use App\Models\RdHardwareCard;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class RdHardwareCardResource extends Resource
{
    protected static ?string $model = RdHardwareCard::class;

    protected static ?string $navigationIcon = 'heroicon-o-cpu-chip';

    protected static ?string $navigationGroup = 'About Us';

    protected static ?string $navigationLabel = 'R&D Prototype Boards';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Prototype Board Details')->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Board / Controller Name')
                    ->placeholder('e.g. SVR Card (Static Voltage Regulator)')
                    ->required(),

                Forms\Components\TextInput::make('tag')
                    ->label('Engineering Tag')
                    ->placeholder('e.g. Power Conditioning, Edge Analytics, DG Automation')
                    ->maxLength(50),

                Forms\Components\FileUpload::make('image_path')
                    ->label('Hardware PCB / Board Photo')
                    ->image()
                    ->disk('public')
                    ->directory('rd-cards')
                    ->maxSize(20480)
                    ->openable()
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
                    ->required()
                    ->helperText('Clear product image of the electronic card or telemetry PCB.'),

                Forms\Components\Textarea::make('description')
                    ->label('Technical Description')
                    ->rows(3)
                    ->required()
                    ->columnSpanFull(),

                Forms\Components\TextInput::make('sort_order')
                    ->numeric()
                    ->default(0),

                Forms\Components\Toggle::make('is_published')
                    ->default(true),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image_path')->label('Board'),
                Tables\Columns\TextColumn::make('name')->searchable()->weight('bold'),
                Tables\Columns\TextColumn::make('tag')->badge(),
                Tables\Columns\TextColumn::make('description')->limit(60),
                Tables\Columns\IconColumn::make('is_published')->boolean(),
                Tables\Columns\TextColumn::make('sort_order')->label('Order')->sortable(),
            ])
            ->reorderable('sort_order')
            ->defaultSort('sort_order')
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => RdHardwareCardResource\Pages\ListRdHardwareCards::route('/'),
            'create' => RdHardwareCardResource\Pages\CreateRdHardwareCard::route('/create'),
            'edit' => RdHardwareCardResource\Pages\EditRdHardwareCard::route('/{record}/edit'),
        ];
    }
}
