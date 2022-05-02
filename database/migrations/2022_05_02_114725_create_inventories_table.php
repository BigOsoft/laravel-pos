<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inventories', function (Blueprint $table) {
            $table->id();
            $table->integer('company');
            $table->bigInteger('SKU');
            $table->string('name');
            $table->string('price');
            $table->string('cost_price');
            $table->string('tax');
            $table->string('category');
            $table->string('vendor');
            $table->integer('quantity');
            $table->integer('stock');
            $table->integer('min_stock_allowed');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('inventories');
    }
};
