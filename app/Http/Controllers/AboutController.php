<?php

namespace App\Http\Controllers;

use App\Models\CompanyValue;
use App\Models\Milestone;
use App\Models\RdHardwareCard;
use App\Models\SiteSetting;
use App\Models\TeamMember;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        $dbMilestones = Milestone::where('is_published', true)->orderBy('sort_order')->get(['metric', 'label', 'detail']);
        $dbValues = CompanyValue::where('is_published', true)->orderBy('sort_order')->get(['code', 'title', 'badge', 'description']);
        $dbCards = RdHardwareCard::where('is_published', true)->orderBy('sort_order')->get(['name', 'tag', 'description', 'image_path']);

        $plantHeadline = SiteSetting::get('plant_headline', '4,000 Sq. Ft. International Standard Manufacturing Plant');
        $plantDesc = SiteSetting::get('plant_description', 'System Infra Solutions Private Limited (SISPL) operates an international quality standard manufacturing facility of 4,000 square feet for complete assembly, wiring, and testing of AMF panels, power controllers, and IoT telemetry products at Patparganj Industrial Area, New Delhi.');
        $plantBullets = SiteSetting::get('plant_bullets', null);

        return Inertia::render('About', [
            'team' => TeamMember::where('is_published', true)
                ->orderBy('sort_order')
                ->get(['name', 'title', 'bio', 'photo_path']),
            'dbMilestones' => $dbMilestones->isNotEmpty() ? $dbMilestones : null,
            'dbCompanyValues' => $dbValues->isNotEmpty() ? $dbValues : null,
            'dbRdCards' => $dbCards->isNotEmpty() ? $dbCards : null,
            'plantSettings' => [
                'headline' => $plantHeadline,
                'description' => $plantDesc,
                'bullets' => $plantBullets,
            ],
            'seo' => [
                'title' => 'About Us — System Infra Solutions',
                'description' => 'System Infra Solutions is an ISO-certified engineering leader in telecom power automation, SYS-AXS NOC telemetry, 5G smart enclosures, and tactical wireless networks.',
            ],
        ]);
    }
}
