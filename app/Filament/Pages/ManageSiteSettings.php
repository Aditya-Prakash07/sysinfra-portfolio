<?php

namespace App\Filament\Pages;

use App\Models\SiteSetting;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class ManageSiteSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static ?string $navigationGroup = 'Site Administration';

    protected static ?string $navigationLabel = 'Site Settings & Media';

    protected static ?string $title = 'Website Settings, Video & Contact Configuration';

    protected static string $view = 'filament.pages.manage-site-settings';

    public ?array $data = [];

    public function mount(): void
    {
        $settings = SiteSetting::all()->pluck('value', 'key')->toArray();
        foreach ($settings as $k => $v) {
            $decoded = json_decode($v, true);
            if (json_last_error() === JSON_ERROR_NONE && (is_array($decoded) || is_object($decoded))) {
                $settings[$k] = $decoded;
            }
        }
        $this->form->fill($settings);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Settings')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('Hero & Video Banner')
                            ->icon('heroicon-o-video-camera')
                            ->schema([
                                Forms\Components\FileUpload::make('hero_video_path')
                                    ->label('Hero Video File (MP4/WebM)')
                                    ->disk('public')
                                    ->directory('videos')
                                    ->acceptedFileTypes(['video/mp4', 'video/webm', 'video/quicktime', 'video/x-matroska', 'video/avi', 'video/x-msvideo'])
                                    ->maxSize(102400) // 100MB
                                    ->openable()
                                    ->downloadable()
                                    ->helperText('Upload the high-definition looping facility video banner (up to 100MB).'),
                                Forms\Components\TextInput::make('hero_video_url')
                                    ->label('External Video Stream URL (Optional fallback)')
                                    ->placeholder('/img/sysinfra-video-banner.mp4 or https://...'),
                                Forms\Components\FileUpload::make('hero_video_poster')
                                    ->label('Video Poster Image')
                                    ->image()
                                    ->disk('public')
                                    ->directory('videos')
                                    ->maxSize(20480) // 20MB
                                    ->openable()
                                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp']),
                                Forms\Components\TextInput::make('hero_video_badge')
                                    ->label('Top Eyebrow Badge')
                                    ->default('8,000 SQ. FT. ADVANCED MANUFACTURING FACILITY • PATPARGANJ NEW DELHI'),
                                Forms\Components\TextInput::make('hero_video_title')
                                    ->label('Video Headline')
                                    ->default('Inside Our Patparganj Electronics Facility'),
                                Forms\Components\Textarea::make('hero_video_subtitle')
                                    ->label('Video Subheading')
                                    ->rows(2)
                                    ->default('Watch how our state-of-the-art Delhi manufacturing facility produces high-reliability AMF panels, IoT telemetry systems, and precision power electronics.'),
                                Forms\Components\Repeater::make('hero_video_highlights')
                                    ->label('Facility Highlights Cards')
                                    ->schema([
                                        Forms\Components\TextInput::make('title')->required(),
                                        Forms\Components\TextInput::make('desc')->required(),
                                    ])
                                    ->columns(2)
                                    ->collapsible()
                                    ->addActionLabel('Add Highlight Card'),
                            ]),

                        Forms\Components\Tabs\Tab::make('Branding & Identity')
                            ->icon('heroicon-o-paint-brush')
                            ->schema([
                                Forms\Components\TextInput::make('site_name')
                                    ->label('Site / Company Name')
                                    ->default('System Infra Solutions Private Limited'),
                                Forms\Components\FileUpload::make('site_logo_light')
                                    ->label('Header Logo (Light Mode)')
                                    ->image()
                                    ->disk('public')
                                    ->directory('branding')
                                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
                                Forms\Components\FileUpload::make('site_logo_dark')
                                    ->label('Header Logo (Dark Mode)')
                                    ->image()
                                    ->disk('public')
                                    ->directory('branding')
                                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
                                Forms\Components\TextInput::make('footer_tagline')
                                    ->label('Footer Tagline')
                                    ->default('Mission-Critical Telecom Power, AMF Panels & NOC IoT Telemetry'),
                                Forms\Components\TextInput::make('footer_copyright')
                                    ->label('Footer Copyright Notice')
                                    ->default('System Infra Solutions Private Limited. All Rights Reserved.'),
                            ])->columns(2),

                        Forms\Components\Tabs\Tab::make('Contact & Board Lines')
                            ->icon('heroicon-o-phone')
                            ->schema([
                                Forms\Components\TextInput::make('boardline_1')->label('Board Line 1')->default('+91-011-35004142'),
                                Forms\Components\TextInput::make('boardline_2')->label('Board Line 2')->default('+91-011-35004143'),
                                Forms\Components\TextInput::make('boardline_3')->label('Board Line 3')->default('+91-011-35004144'),
                                Forms\Components\TextInput::make('boardline_4')->label('Board Line 4')->default('+91-011-35004145'),
                                Forms\Components\TextInput::make('helpline_mobile_1')->label('Mobile Helpline 1')->default('+91-9899905475'),
                                Forms\Components\TextInput::make('helpline_mobile_2')->label('Mobile Helpline 2')->default('+91-7668609810'),
                                Forms\Components\TextInput::make('email_sales')->label('Sales Email')->default('sales@sysinfra.in'),
                                Forms\Components\TextInput::make('email_support')->label('Support Email')->default('support@sysinfra.in'),
                                Forms\Components\TextInput::make('email_info')->label('General Email')->default('info@sysinfra.in'),
                                Forms\Components\Textarea::make('hq_address')
                                    ->label('Head Office Address (Patparganj)')
                                    ->default('Plot No. 382, Third Floor, Functional Industrial Estate (F.I.E.), Patparganj Industrial Area, New Delhi - 110092')
                                    ->columnSpanFull(),
                                Forms\Components\Textarea::make('google_maps_embed')
                                    ->label('Google Maps Embed URL / Iframe src')
                                    ->rows(3)
                                    ->columnSpanFull(),
                            ])->columns(3),

                        Forms\Components\Tabs\Tab::make('Regional Branches')
                            ->icon('heroicon-o-building-office-2')
                            ->schema([
                                Forms\Components\Section::make('Patna Branch (Bihar)')->schema([
                                    Forms\Components\TextInput::make('branch_patna_title')->default('Patna Branch Office'),
                                    Forms\Components\TextInput::make('branch_patna_phone')->default('+91-9899905475'),
                                    Forms\Components\Textarea::make('branch_patna_address')->default('House No. 12, Sri Krishna Nagar, Kidwaipuri, Patna, Bihar - 800001'),
                                ]),
                                Forms\Components\Section::make('Uttar Pradesh Branch')->schema([
                                    Forms\Components\TextInput::make('branch_up_title')->default('Uttar Pradesh Branch Office'),
                                    Forms\Components\TextInput::make('branch_up_phone')->default('+91-7668609810'),
                                    Forms\Components\Textarea::make('branch_up_address')->default('Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh - 226010'),
                                ]),
                                Forms\Components\Section::make('Madhya Pradesh Branch')->schema([
                                    Forms\Components\TextInput::make('branch_mp_title')->default('Madhya Pradesh Branch Office'),
                                    Forms\Components\TextInput::make('branch_mp_phone')->default('+91-9899905475'),
                                    Forms\Components\Textarea::make('branch_mp_address')->default('Plot No. 44, Commercial Complex, MP Nagar Zone-II, Bhopal, Madhya Pradesh - 462011'),
                                ]),
                            ]),

                        Forms\Components\Tabs\Tab::make('Manufacturing Plant')
                            ->icon('heroicon-o-wrench-screwdriver')
                            ->schema([
                                Forms\Components\TextInput::make('plant_headline')
                                    ->label('Plant Headline')
                                    ->default('4,000 Sq. Ft. International Standard Manufacturing Plant')
                                    ->required(),
                                Forms\Components\Textarea::make('plant_description')
                                    ->label('Plant Overview')
                                    ->rows(3)
                                    ->default('System Infra Solutions Private Limited (SISPL) operates an international quality standard manufacturing facility of 4,000 square feet for complete assembly, wiring, and testing of AMF panels, power controllers, and IoT telemetry products at Patparganj Industrial Area, New Delhi.'),
                                Forms\Components\Repeater::make('plant_bullets')
                                    ->label('Facility Highlights & Capabilities')
                                    ->schema([
                                        Forms\Components\TextInput::make('text')->required(),
                                    ])
                                    ->addActionLabel('Add Capability Bullet'),
                            ]),
                    ])
                    ->columnSpanFull(),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $state = $this->form->getState();
        foreach ($state as $key => $val) {
            SiteSetting::set($key, $val);
        }

        Notification::make()
            ->title('Settings Saved')
            ->body('Website settings, video banner, and contact information have been updated successfully.')
            ->success()
            ->send();
    }
}
