<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Listes extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    
    protected $table = 'listes';
    
    
    protected $fillable = [
        'id_liste', 'id_user', 'nom_liste', 'description_liste', 'created_at', 'updated_at'
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
