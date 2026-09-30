<?php

namespace App\Http\Controllers;

use App\Models\EventAlbum;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public static function getDefaultEvents(): array
    {
        return [
            [
                'title' => 'Holi Celebration @ SIS Office — Delhi Team',
                'category' => 'Festival Celebration',
                'date' => 'March 2024',
                'cover' => 'img/eventGallery/festivalImg/FestivalCelebration.webp',
                'images' => [
                    'img/eventGallery/festivalImg/Festival0.webp',
                    'img/eventGallery/festivalImg/Festival1.webp',
                    'img/eventGallery/festivalImg/Festival2.webp',
                    'img/eventGallery/festivalImg/Festival3.webp',
                    'img/eventGallery/festivalImg/Festival4.webp',
                    'img/eventGallery/festivalImg/Festival5.webp',
                    'img/eventGallery/festivalImg/Festival6.webp',
                    'img/eventGallery/festivalImg/Festival7.webp',
                    'img/eventGallery/festivalImg/Festival8.webp',
                    'img/eventGallery/festivalImg/Festival9.webp',
                    'img/eventGallery/festivalImg/Festival10.webp',
                    'img/eventGallery/festivalImg/Festival11.webp',
                    'img/banner/holicelebration.png',
                ],
                'description' => 'Joyous colors, camaraderie, and team bonding as the System Infra Solutions corporate headquarters in Delhi celebrates Holi with energy and unity.',
            ],
            [
                'title' => 'New Year Celebration & Employee Milestones',
                'category' => 'New Year Celebration',
                'date' => 'January 2024',
                'cover' => 'img/eventGallery/newYearCelebration/birthDayBanner.webp',
                'images' => [
                    'img/eventGallery/newYearCelebration/birthDayBanner.webp',
                    'img/eventGallery/newYearCelebration/festival1.webp',
                    'img/eventGallery/newYearCelebration/festival2.webp',
                ],
                'description' => 'Welcoming the new year with milestone recognitions, team celebrations, and strategic infrastructure roadmap presentations.',
            ],
            [
                'title' => 'India Mobile Congress (IMC Expo) — 5G Launch',
                'category' => 'Technology & Industry Expos',
                'date' => 'October 2022',
                'cover' => 'img/eventGallery/imcImg/imcBanner.webp',
                'images' => [
                    'img/eventGallery/imcImg/imcBanner.webp',
                    'img/eventGallery/imcImg/galleryImg1.webp',
                    'img/eventGallery/imcImg/galleryImg2.webp',
                    'img/eventGallery/imcImg/galleryImg3.webp',
                    'img/eventGallery/imcImg/galleryImg4.webp',
                    'img/eventGallery/imcImg/galleryImg5.webp',
                    'img/eventGallery/imcImg/galleryImg6.webp',
                    'img/eventGallery/imcImg/galleryImg7.webp',
                    'img/eventGallery/imcImg/galleryImg8.webp',
                    'img/eventGallery/imcImg/galleryImg9.webp',
                    'img/eventGallery/imcImg/galleryImg10.webp',
                    'img/eventGallery/imcImg/galleryImg11.webp',
                    'img/eventGallery/imcImg/galleryImg12.webp',
                ],
                'description' => 'Unveiling 5G smart enclosures, tactical wireless solutions, and intelligent IoT telemetry alongside Prime Minister Shri Narendra Modi and industry leaders at Pragati Maidan, New Delhi.',
            ],
        ];
    }

    public function index(): Response
    {
        $dbAlbums = EventAlbum::where('is_published', true)
            ->orderBy('sort_order')
            ->get();

        if ($dbAlbums->isNotEmpty()) {
            $events = $dbAlbums->map(function ($album) {
                return [
                    'id' => $album->id,
                    'title' => $album->title,
                    'slug' => $album->slug,
                    'category' => $album->category,
                    'date' => $album->event_date,
                    'cover' => $album->cover_image_path,
                    'images' => $album->gallery_images ?? [],
                    'description' => $album->description,
                ];
            })->toArray();
        } else {
            $events = self::getDefaultEvents();
        }

        return Inertia::render('Events', [
            'events' => $events,
            'seo' => [
                'title' => 'Media & Corporate Events Gallery — System Infra Solutions',
                'description' => 'Explore authentic photo galleries of System Infra Solutions events, India Mobile Congress (IMC) 5G showcases, and corporate cultural celebrations.',
            ],
        ]);
    }
}
