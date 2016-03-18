<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Reservations extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    
    protected $table = 'reservations';
    
    
    protected $fillable = [
        'id_reservation', 'id_item', 'id_user', 'created_at', 'updated_at'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}
