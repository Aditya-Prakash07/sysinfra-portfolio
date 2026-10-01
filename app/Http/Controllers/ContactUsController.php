<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class ContactUsController extends Controller
{
    public function index(): Response
    {
        $contactSettings = [
            'boardlines' => [
                SiteSetting::get('boardline_1', '+91-011-35004142'),
                SiteSetting::get('boardline_2', '+91-011-35004143'),
                SiteSetting::get('boardline_3', '+91-011-35004144'),
                SiteSetting::get('boardline_4', '+91-011-35004145'),
            ],
            'helplines' => [
                SiteSetting::get('helpline_mobile_1', '+91-9899905475'),
                SiteSetting::get('helpline_mobile_2', '+91-7668609810'),
            ],
            'emails' => [
                'sales' => SiteSetting::get('email_sales', 'sales@sysinfra.in'),
                'support' => SiteSetting::get('email_support', 'support@sysinfra.in'),
                'info' => SiteSetting::get('email_info', 'info@sysinfra.in'),
            ],
            'hq_address' => SiteSetting::get('hq_address', 'Plot No. 382, Third Floor, Functional Industrial Estate (F.I.E.), Patparganj Industrial Area, New Delhi - 110092'),
            'google_maps_embed' => SiteSetting::get('google_maps_embed', null),
            'branches' => [
                [
                    'city' => 'Patna',
                    'title' => SiteSetting::get('branch_patna_title', 'Patna Branch Office'),
                    'address' => SiteSetting::get('branch_patna_address', 'House No. 12, Sri Krishna Nagar, Kidwaipuri, Patna, Bihar - 800001'),
                    'phone' => SiteSetting::get('branch_patna_phone', '+91-9899905475'),
                ],
                [
                    'city' => 'Lucknow',
                    'title' => SiteSetting::get('branch_up_title', 'Uttar Pradesh Branch Office'),
                    'address' => SiteSetting::get('branch_up_address', 'Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh - 226010'),
                    'phone' => SiteSetting::get('branch_up_phone', '+91-7668609810'),
                ],
                [
                    'city' => 'Bhopal',
                    'title' => SiteSetting::get('branch_mp_title', 'Madhya Pradesh Branch Office'),
                    'address' => SiteSetting::get('branch_mp_address', 'Plot No. 44, Commercial Complex, MP Nagar Zone-II, Bhopal, Madhya Pradesh - 462011'),
                    'phone' => SiteSetting::get('branch_mp_phone', '+91-9899905475'),
                ],
            ],
        ];

        return Inertia::render('Contact', [
            'contactSettings' => $contactSettings,
            'seo' => [
                'title' => 'Contact Us — System Infra Solutions',
                'description' => 'Reach System Infra Solutions at Plot No. 382, Third Floor, F.I.E., Patparganj Industrial Area, New Delhi - 110092.',
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse|JsonResponse
    {
        // Support common field aliases (msg / message, mobile / phone)
        if ($request->has('msg') && !$request->has('message')) {
            $request->merge(['message' => $request->input('msg')]);
        }
        if ($request->has('mobile') && !$request->has('phone')) {
            $request->merge(['phone' => $request->input('mobile')]);
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:150'],
            'phone' => ['nullable', 'string', 'max:30'],
            'subject' => ['nullable', 'string', 'max:150'],
            'message' => ['required', 'string', 'max:3000'],
            // Honeypot field — must stay empty
            'website' => ['prohibited'],
        ]);

        try {
            ContactMessage::create(collect($validated)->except('website')->toArray());
        } catch (\Throwable $e) {
            Log::error('Contact message database error: ' . $e->getMessage());
        }

        Log::info('Contact message received successfully', [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'subject' => $validated['subject'] ?? null,
        ]);

        $successText = 'Message has been sent successfully.';

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json([
                'success' => true,
                'message' => $successText,
            ]);
        }

        return redirect()->back()->with('success', $successText);
    }
}
