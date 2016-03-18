<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Items extends Authenticatable
{
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    
    protected $table = 'items';
    
    
    protected $fillable = [
        'id_item', 'id_liste', 'nom_item', 'booked', 'description_item', 'created_at', 'updated_at'
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
