<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
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
        return Inertia::render('Contact', [
            'seo' => [
                'title' => 'Contact Us — System Infra Solutions',
                'description' => 'Reach System Infra Solutions at Plot No. 382, Third Floor, F.I.E., Patparganj Industrial Area, New Delhi - 110092.',
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse|JsonResponse
    {
        // Support field aliases from sysinfra.in (msg / message, mobile / phone)
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

        return back()->with('success', $successText);
    }
}
