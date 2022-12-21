<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*
         * Permission Types
         *
         */
        $crudTypes = ['users', 'orders'];
        $actions = ['create', 'read', 'update', 'delete'];
        $permissionItems = [];
        foreach($crudTypes as $crudType) {
            foreach($actions as $action) {
                $permissionItems[] = [
                    'name'        => "Can $action $crudType",
                    'slug'        => "$action.$crudType",
                    'description' => "Can $action $crudType",
                    'model'       => 'Permission',
                ];

            }
        }
        $permissionItems[] = [
            'name'        => "Can approve orders",
            'slug'        => "approve.orders",
            'description' => "Can approve orders",
            'model'       => 'Permission',
        ];
        /*
         * Add Permission Items
         *
         */
        foreach ($permissionItems as $permissionItem) {
            $newPermissionitem = config('roles.models.permission')::where('slug', '=', $permissionItem['slug'])->first();
            if ($newPermissionitem === null) {
                config('roles.models.permission')::create([
                    'name'          => $permissionItem['name'],
                    'slug'          => $permissionItem['slug'],
                    'description'   => $permissionItem['description'],
                    'model'         => $permissionItem['model'],
                ]);
            }
        }
    }
}
