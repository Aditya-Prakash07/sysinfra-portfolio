<?php

namespace App\Filament\Resources;

use App\Models\CompanyStat;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CompanyStatResource extends Resource
{
    protected static ?string $model = CompanyStat::class;
    protected static ?string $navigationIcon = 'heroicon-o-chart-bar';
    protected static ?string $navigationGroup = 'Homepage';
    protected static ?string $navigationLabel = 'Key Stats';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('label')->required()->placeholder('UNITS SOLD'),
            Forms\Components\TextInput::make('value')->numeric()->required(),
            Forms\Components\TextInput::make('suffix')->default('+'),
            Forms\Components\Select::make('icon')
                ->options([
                    'briefcase' => 'Briefcase (Units Sold)',
                    'clipboard' => 'Clipboard / Projects Delivered',
                    'network' => 'Gear Network / Dealers Network',
                    'shield' => 'Shield (Security)',
                ])
                ->default('briefcase'),
            Forms\Components\TextInput::make('sort_order')->numeric()->default(0),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('label'),
            Tables\Columns\TextColumn::make('value'),
            Tables\Columns\TextColumn::make('suffix'),
            Tables\Columns\TextColumn::make('icon'),
        ])->reorderable('sort_order')->defaultSort('sort_order')
          ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => CompanyStatResource\Pages\ListCompanyStats::route('/'),
            'create' => CompanyStatResource\Pages\CreateCompanyStat::route('/create'),
            'edit' => CompanyStatResource\Pages\EditCompanyStat::route('/{record}/edit'),
        ];
    }
}
