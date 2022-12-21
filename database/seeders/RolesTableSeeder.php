<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*
         * Role Types
         *
         */
        $roleItems = [
            [
                'name'        => 'Superadmin',
                'slug'        => 'superadmin',
                'description' => 'Superadmin Role',
                'level'       => 5,
            ],
            [
                'name'        => 'Admin',
                'slug'        => 'admin',
                'description' => 'Admin Role',
                'level'       => 4,
            ],
            [
                'name'        => 'Employee',
                'slug'        => 'employee',
                'description' => 'Employee Role',
                'level'       => 1,
            ]
        ];

        /*
         * Add Role Items
         *
         */
        foreach ($roleItems as $roleItem) {
            $newRoleItem = config('roles.models.role')::where('slug', '=', $roleItem['slug'])->first();
            if ($newRoleItem === null) {
                $newRoleItem = config('roles.models.role')::create([
                    'name'          => $roleItem['name'],
                    'slug'          => $roleItem['slug'],
                    'description'   => $roleItem['description'],
                    'level'         => $roleItem['level'],
                ]);
            }
        }
    }
}
