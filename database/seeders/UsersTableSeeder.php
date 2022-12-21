<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $employeeRole = config('roles.models.role')::where('slug', '=', 'employee')->first();
        $adminRole = config('roles.models.role')::where('slug', '=', 'admin')->first();
        $superadminRole = config('roles.models.role')::where('slug', '=', 'superadmin')->first();
        $permissions = config('roles.models.permission')::all();

        /*
         * Add Users
         *
         */
        // Superadmin
        if (config('roles.models.defaultUser')::where('email', '=', 'superadmin@company.com')->first() === null) {
            $newUser = config('roles.models.defaultUser')::create([
                'name'     => 'Superadmin',
                'email'    => 'superadmin@company.com',
                'password' => bcrypt('superadminpassword'),
            ]);

            $newUser->attachRole($superadminRole);
        }

        // Admin
        if (config('roles.models.defaultUser')::where('email', '=', 'admin@company.com')->first() === null) {
            $newUser = config('roles.models.defaultUser')::create([
                'name'     => 'Admin',
                'email'    => 'admin@company.com',
                'password' => bcrypt('adminpassword'),
            ]);

            $newUser->attachRole($adminRole);
        }

        // Employee
        if (config('roles.models.defaultUser')::where('email', '=', 'employee@company.com')->first() === null) {
            $newUser = config('roles.models.defaultUser')::create([
                'name'     => 'Employee',
                'email'    => 'employee@company.com',
                'password' => bcrypt('employeepassword'),
            ]);

            $newUser->attachRole($employeeRole);
        }

    }
}
