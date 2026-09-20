<?php

namespace App\Filament\Resources;

use App\Models\Testimonial;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class TestimonialResource extends Resource
{
    protected static ?string $model = Testimonial::class;
    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-right';
    protected static ?string $navigationGroup = 'Company';
    protected static ?string $navigationLabel = 'Case Studies';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('client_name')->label('Client / Project')->required(),
            Forms\Components\Textarea::make('story')->rows(5)->required()->columnSpanFull(),
            Forms\Components\FileUpload::make('logo_path')
                ->image()->disk('public')->directory('testimonials')
                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp']),
            Forms\Components\TextInput::make('sort_order')->numeric()->default(0),
            Forms\Components\Toggle::make('is_published')->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\ImageColumn::make('logo_path')->label(''),
            Tables\Columns\TextColumn::make('client_name')->searchable(),
            Tables\Columns\TextColumn::make('story')->limit(60),
            Tables\Columns\IconColumn::make('is_published')->boolean(),
        ])->reorderable('sort_order')->defaultSort('sort_order')
          ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => TestimonialResource\Pages\ListTestimonials::route('/'),
            'create' => TestimonialResource\Pages\CreateTestimonial::route('/create'),
            'edit' => TestimonialResource\Pages\EditTestimonial::route('/{record}/edit'),
        ];
    }
}
