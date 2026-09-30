<?php

namespace App\Filament\Resources;

use App\Models\Milestone;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class MilestoneResource extends Resource
{
    protected static ?string $model = Milestone::class;

    protected static ?string $navigationIcon = 'heroicon-o-chart-bar';

    protected static ?string $navigationGroup = 'About Us';

    protected static ?string $navigationLabel = 'Growth Milestones';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Milestone / Metric')->schema([
                Forms\Components\TextInput::make('metric')
                    ->label('Metric / Number')
                    ->placeholder('e.g. 70,000+, 4,000 Sq.Ft., 3,00,000+')
                    ->required()
                    ->helperText('The highlighted large statistic number or size.'),

                Forms\Components\TextInput::make('label')
                    ->label('Metric Label')
                    ->placeholder('e.g. Sites Automated, Patparganj Factory')
                    ->required(),

                Forms\Components\Textarea::make('detail')
                    ->label('Engineering Detail / Context')
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
                Tables\Columns\TextColumn::make('metric')->searchable()->weight('bold')->color('danger'),
                Tables\Columns\TextColumn::make('label')->searchable()->weight('semibold'),
                Tables\Columns\TextColumn::make('detail')->limit(60),
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
            'index' => MilestoneResource\Pages\ListMilestones::route('/'),
            'create' => MilestoneResource\Pages\CreateMilestone::route('/create'),
            'edit' => MilestoneResource\Pages\EditMilestone::route('/{record}/edit'),
        ];
    }
}
