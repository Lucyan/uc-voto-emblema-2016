<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('users', function($table){
            $table->increments('id');
            $table->string('name');
            $table->string('email');
            $table->string('fb_id');
            $table->string('oauth_token');
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('votos', function($table){
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('opcion');
            $table->softDeletes();
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
        //
        Schema::drop('votos');
        Schema::drop('users');
    }
}
