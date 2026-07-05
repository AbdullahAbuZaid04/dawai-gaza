<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

/**
 * Re-hashes the seed users' passwords.
 * The original SQL inserts plain-text passwords which fail Sanctum's Hash::check().
 * Run once with: php artisan db:seed --class=UpdateUserPasswordsSeeder
 */
class UpdateUserPasswordsSeeder extends Seeder
{
    public function run(): void
    {
        $passwords = [
            'admin@dawai.ps'   => 'admin123',
            'ahmed.khaled@dawai.ps' => 'pharm123',
            'mona.sami@dawai.ps'    => 'pharm123',
            'yousef.adel@mail.ps'         => 'user123',
            'sara.nabil@mail.ps'          => 'user123',
        ];

        foreach ($passwords as $email => $plain) {
            User::where('email', $email)->update([
                'password' => Hash::make($plain),
            ]);
        }

        $this->command->info('✅ Seed user passwords have been re-hashed successfully.');
    }
}
