<?php

namespace App\Filament\Resources;

use App\Models\PortfolioItem;
use App\Models\ProductSubcategory;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class PortfolioItemResource extends Resource
{
    protected static ?string $model = PortfolioItem::class;

    protected static ?string $navigationIcon = 'heroicon-o-cube';

    protected static ?string $navigationGroup = 'Catalog';

    protected static ?string $navigationLabel = 'Products';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Basics')->schema([
                Forms\Components\Select::make('product_subcategory_id')
                    ->label('Subcategory')
                    ->options(fn () => ProductSubcategory::with('category')->get()
                        ->mapWithKeys(fn ($s) => [$s->id => "{$s->category->name} → {$s->name}"]))
                    ->searchable()
                    ->required(),

                Forms\Components\TextInput::make('name')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (string $state, Forms\Set $set) => $set('slug', Str::slug($state))),

                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->helperText('Used in the product URL. Auto-filled from the name — edit only if needed.'),

                Forms\Components\TextInput::make('model_number')->maxLength(120),

                Forms\Components\Textarea::make('short_description')
                    ->rows(2)
                    ->maxLength(300)
                    ->helperText('Shown on category grids and used as the fallback SEO description.'),

                Forms\Components\RichEditor::make('description')
                    ->columnSpanFull(),
            ])->columns(2),

            Forms\Components\Section::make('Specifications')->schema([
                Forms\Components\Repeater::make('specifications')
                    ->schema([
                        Forms\Components\TextInput::make('label')->required(),
                        Forms\Components\TextInput::make('value')->required(),
                    ])
                    ->columns(2)
                    ->reorderable()
                    ->collapsible()
                    ->defaultItems(0)
                    ->addActionLabel('Add specification row'),
            ]),

            Forms\Components\Section::make('Media')->schema([
                Forms\Components\FileUpload::make('cover_image_path')
                    ->label('Cover image')
                    ->image()
                    ->disk('public')
                    ->directory('products/covers')
                    // Hard rule: only these MIME types are accepted, and Filament renames
                    // every upload to a random hash — nothing user-named or executable
                    // ever lands in storage.
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                    ->imageEditor()
                    ->required(),

                Forms\Components\FileUpload::make('gallery')
                    ->label('Gallery images')
                    ->image()
                    ->multiple()
                    ->reorderable()
                    ->disk('public')
                    ->directory('products/gallery')
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                    ->maxFiles(8),

                Forms\Components\FileUpload::make('datasheet_path')
                    ->label('Datasheet (PDF)')
                    ->disk('public')
                    ->directory('products/datasheets')
                    ->acceptedFileTypes(['application/pdf'])
                    ->maxSize(10240), // 10MB
            ])->columns(1),

            Forms\Components\Section::make('SEO')->schema([
                Forms\Components\TextInput::make('meta_title')->maxLength(70),
                Forms\Components\Textarea::make('meta_description')->rows(2)->maxLength(160),
            ])->columns(2)->collapsed(),

            Forms\Components\Section::make('Publishing')->schema([
                Forms\Components\Toggle::make('is_published')->default(true),
                Forms\Components\TextInput::make('sort_order')->numeric()->default(0),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('cover_image_path')->label(''),
                Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('subcategory.name')->label('Subcategory')->sortable(),
                Tables\Columns\TextColumn::make('model_number')->label('Model #'),
                Tables\Columns\IconColumn::make('is_published')->boolean(),
                Tables\Columns\TextColumn::make('updated_at')->dateTime()->since()->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('product_subcategory_id')
                    ->label('Subcategory')
                    ->relationship('subcategory', 'name'),
                Tables\Filters\TernaryFilter::make('is_published'),
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
            'index' => \App\Filament\Resources\PortfolioItemResource\Pages\ListPortfolioItems::route('/'),
            'create' => \App\Filament\Resources\PortfolioItemResource\Pages\CreatePortfolioItem::route('/create'),
            'edit' => \App\Filament\Resources\PortfolioItemResource\Pages\EditPortfolioItem::route('/{record}/edit'),
        ];
    }
}
