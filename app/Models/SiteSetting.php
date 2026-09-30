<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'value',
        'group',
        'description',
    ];

    /**
     * Get a setting by key with optional default
     */
    public static function get(string $key, mixed $default = null): mixed
    {
        $setting = static::where('key', $key)->first();
        if (!$setting || $setting->value === null) {
            return $default;
        }

        $val = $setting->value;
        // Attempt json decode
        $decoded = json_decode($val, true);
        if (json_last_error() === JSON_ERROR_NONE && (is_array($decoded) || is_object($decoded))) {
            return $decoded;
        }

        return $val;
    }

    /**
     * Set a setting value
     */
    public static function set(string $key, mixed $value, string $group = 'general', ?string $description = null): static
    {
        $valToStore = (is_array($value) || is_object($value)) ? json_encode($value) : (string) $value;

        return static::updateOrCreate(
            ['key' => $key],
            [
                'value' => $valToStore,
                'group' => $group,
                'description' => $description,
            ]
        );
    }

    /**
     * Get all settings in a specific group as an associative array
     */
    public static function getGroup(string $group): array
    {
        $settings = static::where('group', $group)->get();
        $result = [];
        foreach ($settings as $setting) {
            $val = $setting->value;
            $decoded = json_decode($val, true);
            $result[$setting->key] = (json_last_error() === JSON_ERROR_NONE && (is_array($decoded) || is_object($decoded)))
                ? $decoded
                : $val;
        }
        return $result;
    }
}
