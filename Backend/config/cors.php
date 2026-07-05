<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Settings for cross-origin requests. Set ALLOWED_ORIGINS in your .env
    | to the frontend URL (e.g., https://dawai.vercel.app).
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => explode(',', env('ALLOWED_ORIGINS', 'https://dawai-gaza.vercel.app,http://localhost:3000')),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
