<?php

namespace App\Filament\Resources;

use App\Models\Catalogue;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class CatalogueResource extends Resource
{
    protected static ?string $model = Catalogue::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-arrow-down';

    protected static ?string $navigationGroup = 'Catalog & Resources';

    protected static ?string $navigationLabel = 'PDF Catalogues';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Catalogue Details')->schema([
                Forms\Components\TextInput::make('title')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (string $state, Forms\Set $set) => $set('slug', Str::slug($state))),

                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->helperText('Unique URL identifier for downloading and linking.'),

                Forms\Components\TextInput::make('subtitle')
                    ->maxLength(200)
                    ->helperText('Short technical summary beneath the title.'),

                Forms\Components\TextInput::make('category')
                    ->datalist([
                        'Master Corporate',
                        'Security Telemetry',
                        'NOC Automation',
                        '5G Infrastructure',
                        'Power Automation',
                        'Defence & Tactical',
                    ])
                    ->required(),

                Forms\Components\TextInput::make('badge')
                    ->placeholder('e.g. Flagship Catalog, Patented IoT, 70,000+ Deployed')
                    ->maxLength(50),

                Forms\Components\Textarea::make('description')
                    ->rows(3)
                    ->columnSpanFull()
                    ->helperText('Detailed overview of specifications and components covered in this document.'),
            ])->columns(2),

            Forms\Components\Section::make('Files & Media')->schema([
                Forms\Components\FileUpload::make('file_path')
                    ->label('PDF Document')
                    ->disk('public')
                    ->directory('catalogue')
                    ->acceptedFileTypes(['application/pdf', 'application/x-pdf', 'application/acrobat', 'applications/vnd.pdf', 'text/pdf', 'text/x-pdf'])
                    ->maxSize(51200) // 50MB
                    ->openable()
                    ->downloadable()
                    ->required()
                    ->helperText('Upload the official PDF file (up to 50MB).'),

                Forms\Components\FileUpload::make('cover_image_path')
                    ->label('Cover / Thumbnail Image')
                    ->image()
                    ->disk('public')
                    ->directory('catalogue/covers')
                    ->maxSize(20480) // 20MB
                    ->openable()
                    ->downloadable()
                    ->helperText('Optional preview image displayed on the resource card.'),

                Forms\Components\TextInput::make('file_size')
                    ->placeholder('e.g. 2.26 MB')
                    ->maxLength(30),

                Forms\Components\TextInput::make('pages')
                    ->placeholder('e.g. Technical Sheet, 16 Pages')
                    ->maxLength(50),
            ])->columns(2),

            Forms\Components\Section::make('Publishing & Flags')->schema([
                Forms\Components\Toggle::make('is_master')
                    ->label('Primary Master Catalogue')
                    ->helperText('If enabled, this document is served as the official Master Corporate Catalogue downloaded from the top hero button.')
                    ->default(false),

                Forms\Components\Toggle::make('is_popular')
                    ->label('Featured / Popular')
                    ->default(false),

                Forms\Components\Toggle::make('is_published')
                    ->label('Published')
                    ->default(true),

                Forms\Components\TextInput::make('sort_order')
                    ->numeric()
                    ->default(0),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')->searchable()->sortable()->weight('bold'),
                Tables\Columns\TextColumn::make('category')->sortable()->badge(),
                Tables\Columns\TextColumn::make('file_size')->label('Size'),
                Tables\Columns\IconColumn::make('is_master')
                    ->label('Master PDF')
                    ->icon(fn (bool $state): ?string => $state ? 'heroicon-s-check-circle' : null)
                    ->color('success')
                    ->alignCenter()
                    ->placeholder('—')
                    ->tooltip(fn (bool $state): string => $state ? 'Primary Master Corporate Catalogue (Featured in top hero banner)' : 'Standard Product Catalogue'),
                Tables\Columns\IconColumn::make('is_published')->label('Published')->boolean(),
                Tables\Columns\TextColumn::make('sort_order')->label('Order')->sortable(),
                Tables\Columns\TextColumn::make('updated_at')->dateTime()->since()->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category'),
                Tables\Filters\TernaryFilter::make('is_master')->label('Master PDF'),
                Tables\Filters\TernaryFilter::make('is_published')->label('Published'),
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
            'index' => CatalogueResource\Pages\ListCatalogues::route('/'),
            'create' => CatalogueResource\Pages\CreateCatalogue::route('/create'),
            'edit' => CatalogueResource\Pages\EditCatalogue::route('/{record}/edit'),
        ];
    }
}
