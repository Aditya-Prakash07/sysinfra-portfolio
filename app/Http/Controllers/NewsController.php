<?php

namespace App\Http\Controllers;

use App\Models\NewsPost;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    /**
     * /latest-news — full news & announcements archive
     */
    public function index(): Response
    {
        $posts = NewsPost::where('is_published', true)
            ->orderByDesc('published_at')
            ->get(['id', 'title', 'slug', 'body', 'cover_image_path', 'published_at']);

        return Inertia::render('News/Index', [
            'posts' => $posts,
            'seo' => [
                'title' => 'Latest News & Updates — System Infra Solutions',
                'description' => 'Official press releases, wireless telecommunications news, and mission-critical milestones from System Infra Solutions.',
            ],
        ]);
    }

    /**
     * /latest-news/{post:slug} — single news article view
     */
    public function show(NewsPost $post): Response
    {
        abort_unless($post->is_published, 404);

        $recentPosts = NewsPost::where('is_published', true)
            ->where('id', '!=', $post->id)
            ->orderByDesc('published_at')
            ->take(3)
            ->get(['id', 'title', 'slug', 'body', 'cover_image_path', 'published_at']);

        // Plain text excerpt for meta description
        $excerpt = strip_tags($post->body);
        $excerpt = mb_substr($excerpt, 0, 155) . '...';

        return Inertia::render('News/Show', [
            'post' => $post,
            'recentPosts' => $recentPosts,
            'seo' => [
                'title' => "{$post->title} — System Infra Solutions",
                'description' => $excerpt,
            ],
        ]);
    }
}
