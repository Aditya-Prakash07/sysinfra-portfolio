<?php

namespace App\Filament\Resources;

use App\Models\NewsPost;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class NewsPostResource extends Resource
{
    protected static ?string $model = NewsPost::class;
    protected static ?string $navigationIcon = 'heroicon-o-newspaper';
    protected static ?string $navigationGroup = 'Company';
    protected static ?string $navigationLabel = 'Latest News';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('title')
                ->required()
                ->live(onBlur: true)
                ->afterStateUpdated(fn (string $state, Forms\Set $set) => $set('slug', Str::slug($state))),
            Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true),
            Forms\Components\DatePicker::make('published_at')->default(now()),
            Forms\Components\FileUpload::make('cover_image_path')
                ->image()->disk('public')->directory('news')
                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp']),
            Forms\Components\RichEditor::make('body')->required()->columnSpanFull(),
            Forms\Components\Toggle::make('is_published')->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\ImageColumn::make('cover_image_path')->label(''),
            Tables\Columns\TextColumn::make('title')->searchable(),
            Tables\Columns\TextColumn::make('published_at')->date(),
            Tables\Columns\IconColumn::make('is_published')->boolean(),
        ])->defaultSort('published_at', 'desc')
          ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => NewsPostResource\Pages\ListNewsPosts::route('/'),
            'create' => NewsPostResource\Pages\CreateNewsPost::route('/create'),
            'edit' => NewsPostResource\Pages\EditNewsPost::route('/{record}/edit'),
        ];
    }
}
