<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

final class User extends Model
{

    public function votos()
    {
        return $this->hasMany('App\Models\Voto');
    }
}