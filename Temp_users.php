<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Temp_users extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    
    protected $table = 'temp_users';
    
    
    protected $fillable = [
        'username', 'email', 'password', 'activation_key'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'activation_key'
    ];
}
