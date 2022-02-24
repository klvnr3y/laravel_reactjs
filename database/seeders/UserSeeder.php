<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'name'              => 'Admin Test',
                'email'             => 'admin@test.com',
                'email_verified_at' => now(),
                'password'          => Hash::make('admin123'),
                'remember_token'    => Str::random(10),
            ],
        ];

        foreach ($users as $key => $value) {
            User::create($value);
        }
    }
}