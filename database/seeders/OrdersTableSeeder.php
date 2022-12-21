<?php

namespace Database\Seeders;

use App\Models\Order;
use Illuminate\Database\Seeder;

class OrdersTableSeeder extends Seeder
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

        for($i = 1; $i <= 10; $i++) {
            Order::create([
                'name'          => "Order $i",
                'detail'   => "Order $i details"
            ]);
        }
    }
}
