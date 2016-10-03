<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

final class Voto extends Model
{
	protected $table = 'votos';

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }
}