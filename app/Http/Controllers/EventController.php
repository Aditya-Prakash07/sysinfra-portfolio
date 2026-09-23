<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function index(): Response
    {
        $festivals = [
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
                'description' => 'Showcasing SISPL indigenously developed AMF Controllers, Smart Box 5G micro-enclosures, and SYS-AXS NOC telemetry at the premier telecom expo.',
            ],
        ];

        return Inertia::render('Events', [
            'events' => $festivals,
            'seo' => [
                'title' => 'Media & Event Gallery — System Infra Solutions',
                'description' => 'Explore life, culture, and corporate milestones at System Infra Solutions: Festival celebrations, New Year galas, and India Mobile Congress exhibitions.',
            ],
        ]);
    }
}
