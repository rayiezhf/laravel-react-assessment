<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ConnectRelationshipsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**
         * Get Available Permissions.
         */
        $permissions = config('roles.models.permission')::all();

        /**
         * Attach Permissions to Roles.
         */
        // Superadmin
        $role = config('roles.models.role')::where('slug', '=', 'superadmin')->first();
        foreach ($permissions as $permission) {
            $role->attachPermission($permission);
        }

        // Admin
        $role = config('roles.models.role')::where('slug', '=', 'admin')->first();
        foreach ($permissions as $permission) {
            $role->attachPermission($permission);
        }

        // Employee
        $permissions = config('roles.models.permission')::where('slug', 'like', '%.orders')->where('slug', '!=', 'approve.orders')->get();
        $role = config('roles.models.role')::where('slug', '=', 'employee')->first();
        foreach ($permissions as $permission) {
            $role->attachPermission($permission);
        }

    }
}
