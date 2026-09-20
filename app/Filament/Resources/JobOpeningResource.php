<?php

namespace App\Filament\Resources;

use App\Models\JobOpening;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class JobOpeningResource extends Resource
{
    protected static ?string $model = JobOpening::class;
    protected static ?string $navigationIcon = 'heroicon-o-briefcase';
    protected static ?string $navigationGroup = 'Company';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('title')->required(),
            Forms\Components\TextInput::make('location')->placeholder('New Delhi'),
            Forms\Components\Select::make('employment_type')
                ->options(['Full-time' => 'Full-time', 'Contract' => 'Contract', 'Internship' => 'Internship']),
            Forms\Components\RichEditor::make('description')->required()->columnSpanFull(),
            Forms\Components\Toggle::make('is_published')->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('title')->searchable(),
            Tables\Columns\TextColumn::make('location'),
            Tables\Columns\TextColumn::make('employment_type'),
            Tables\Columns\IconColumn::make('is_published')->boolean(),
        ])->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => JobOpeningResource\Pages\ListJobOpenings::route('/'),
            'create' => JobOpeningResource\Pages\CreateJobOpening::route('/create'),
            'edit' => JobOpeningResource\Pages\EditJobOpening::route('/{record}/edit'),
        ];
    }
}
