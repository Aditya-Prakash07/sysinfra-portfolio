<?php

namespace App\Filament\Resources;

use App\Models\EventAlbum;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class EventAlbumResource extends Resource
{
    protected static ?string $model = EventAlbum::class;

    protected static ?string $navigationIcon = 'heroicon-o-camera';

    protected static ?string $navigationGroup = 'Media & Events';

    protected static ?string $navigationLabel = 'Photo Galleries';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Event Information')->schema([
                Forms\Components\TextInput::make('title')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (string $state, Forms\Set $set) => $set('slug', Str::slug($state))),

                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true),

                Forms\Components\TextInput::make('category')
                    ->datalist([
                        'Festival Celebration',
                        'New Year Celebration',
                        'Technology & Industry Expos',
                        'Corporate Milestone',
                        'Team & Culture',
                    ])
                    ->required(),

                Forms\Components\TextInput::make('event_date')
                    ->placeholder('e.g. March 2024')
                    ->maxLength(50),

                Forms\Components\Textarea::make('description')
                    ->rows(3)
                    ->columnSpanFull(),
            ])->columns(2),

            Forms\Components\Section::make('Photographs & Gallery')->schema([
                Forms\Components\FileUpload::make('cover_image_path')
                    ->label('Cover Photo')
                    ->image()
                    ->disk('public')
                    ->directory('events/covers')
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                    ->required()
                    ->helperText('Main display photo shown on event story cards.'),

                Forms\Components\FileUpload::make('gallery_images')
                    ->label('Gallery Photos (Multiple)')
                    ->image()
                    ->multiple()
                    ->reorderable()
                    ->disk('public')
                    ->directory('events/gallery')
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                    ->helperText('Upload all photographs from this celebration or expo. Click any thumbnail to enlarge on the live page.')
                    ->columnSpanFull(),
            ]),

            Forms\Components\Section::make('Publishing')->schema([
                Forms\Components\Toggle::make('is_published')
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
                Tables\Columns\ImageColumn::make('cover_image_path')->label('Cover'),
                Tables\Columns\TextColumn::make('title')->searchable()->sortable()->weight('bold'),
                Tables\Columns\TextColumn::make('category')->sortable()->badge(),
                Tables\Columns\TextColumn::make('event_date')->label('Date'),
                Tables\Columns\IconColumn::make('is_published')->boolean(),
                Tables\Columns\TextColumn::make('sort_order')->label('Order')->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category'),
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
            'index' => EventAlbumResource\Pages\ListEventAlbums::route('/'),
            'create' => EventAlbumResource\Pages\CreateEventAlbum::route('/create'),
            'edit' => EventAlbumResource\Pages\EditEventAlbum::route('/{record}/edit'),
        ];
    }
}
