<?php

namespace App\Filament\Resources;

use App\Models\CompanyValue;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CompanyValueResource extends Resource
{
    protected static ?string $model = CompanyValue::class;

    protected static ?string $navigationIcon = 'heroicon-o-shield-check';

    protected static ?string $navigationGroup = 'About Us';

    protected static ?string $navigationLabel = 'Core Values';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Core Value')->schema([
                Forms\Components\TextInput::make('code')
                    ->label('Index Code')
                    ->placeholder('e.g. 01, 02, 03')
                    ->maxLength(10),

                Forms\Components\TextInput::make('title')
                    ->label('Value Title')
                    ->placeholder('e.g. Always Customer First, Continuous Improvement')
                    ->required(),

                Forms\Components\TextInput::make('badge')
                    ->label('Pill Badge')
                    ->placeholder('e.g. Priority, Execution, R&D, Ethics')
                    ->maxLength(40),

                Forms\Components\Textarea::make('description')
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
                Tables\Columns\TextColumn::make('code')->label('#')->sortable(),
                Tables\Columns\TextColumn::make('title')->searchable()->weight('bold'),
                Tables\Columns\TextColumn::make('badge')->badge(),
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
            'index' => CompanyValueResource\Pages\ListCompanyValues::route('/'),
            'create' => CompanyValueResource\Pages\CreateCompanyValue::route('/create'),
            'edit' => CompanyValueResource\Pages\EditCompanyValue::route('/{record}/edit'),
        ];
    }
}
