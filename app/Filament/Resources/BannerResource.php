<?php

namespace App\Filament\Resources;

use App\Models\Banner;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class BannerResource extends Resource
{
    protected static ?string $model = Banner::class;
    protected static ?string $navigationIcon = 'heroicon-o-photo';
    protected static ?string $navigationGroup = 'Homepage';
    protected static ?string $navigationLabel = 'Hero Banners';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('heading')->required(),
            Forms\Components\TextInput::make('subheading'),
            Forms\Components\FileUpload::make('image_path')
                ->image()->disk('public')->directory('banners')->required()
                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                ->helperText('Recommended 2400×1350px for a crisp full-bleed hero on large screens.'),
            Forms\Components\TextInput::make('cta_label'),
            Forms\Components\TextInput::make('cta_url'),
            Forms\Components\TextInput::make('sort_order')->numeric()->default(0),
            Forms\Components\Toggle::make('is_published')->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\ImageColumn::make('image_path')->label(''),
            Tables\Columns\TextColumn::make('heading'),
            Tables\Columns\IconColumn::make('is_published')->boolean(),
        ])->reorderable('sort_order')->defaultSort('sort_order')
          ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => BannerResource\Pages\ListBanners::route('/'),
            'create' => BannerResource\Pages\CreateBanner::route('/create'),
            'edit' => BannerResource\Pages\EditBanner::route('/{record}/edit'),
        ];
    }
}
