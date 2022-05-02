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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->integer('pos_id');
            $table->integer('order');
            $table->integer('ref_number');
            $table->integer('discount');
            $table->string('customer');
            $table->string('status');
            $table->integer('subtotal');
            $table->integer('tax');
            $table->string('order_type');
            $table->string('items');
            $table->date('date');
            $table->string('payment_info');
            $table->string('payment_type');
            $table->string('user');
            $table->integer('user_id');
            $table->integer('paid');
            $table->integer('change');
            $table->integer('total');
            $table->bigInteger('_rev');
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
        Schema::dropIfExists('transactions');
    }
};
