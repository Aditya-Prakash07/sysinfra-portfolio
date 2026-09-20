<?php

namespace App\Filament\Resources;

use App\Models\ProductCategory;
use App\Models\ProductSubcategory;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProductSubcategoryResource extends Resource
{
    protected static ?string $model = ProductSubcategory::class;
    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationGroup = 'Catalog';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('product_category_id')
                ->label('Category')
                ->options(ProductCategory::pluck('name', 'id'))
                ->required(),
            Forms\Components\TextInput::make('name')
                ->required()
                ->live(onBlur: true)
                ->afterStateUpdated(fn (string $state, Forms\Set $set) => $set('slug', Str::slug($state))),
            Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true),
            Forms\Components\Textarea::make('description')->rows(3)->columnSpanFull(),
            Forms\Components\TextInput::make('sort_order')->numeric()->default(0),
            Forms\Components\Toggle::make('is_published')->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\TextColumn::make('name')->searchable(),
            Tables\Columns\TextColumn::make('category.name')->label('Category'),
            Tables\Columns\TextColumn::make('items_count')->counts('items')->label('Products'),
            Tables\Columns\IconColumn::make('is_published')->boolean(),
        ])->defaultSort('sort_order')->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ProductSubcategoryResource\Pages\ListProductSubcategorys::route('/'),
            'create' => ProductSubcategoryResource\Pages\CreateProductSubcategory::route('/create'),
            'edit' => ProductSubcategoryResource\Pages\EditProductSubcategory::route('/{record}/edit'),
        ];
    }
}
