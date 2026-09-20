<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactUsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Contact', [
            'seo' => [
                'title' => 'Contact Us — Sanchar Telesystems',
                'description' => 'Reach Sanchar Telesystems at A-78, Ground Floor, Okhla Industrial Area, Phase-II, New Delhi-110020.',
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:150'],
            'phone' => ['nullable', 'string', 'max:30'],
            'subject' => ['nullable', 'string', 'max:150'],
            'message' => ['required', 'string', 'max:3000'],
            // Honeypot field — must stay empty. Name it something innocuous in the form.
            'website' => ['prohibited'],
        ]);

        ContactMessage::create(collect($validated)->except('website')->toArray());

        return back()->with('success', 'Thanks — we\'ll get back to you within one business day.');
    }
}
