<?php
namespace App\Http\Controllers;
use Response;
use User;
use Temp_users;
use Illuminate\Http\Request;
use DB;


Class ActivationController extends Controller
{
    
    
    /**
    * This function is used to activate the user's account by 
    * the given activation key coming from the user's email.
    * If the activation key is correct, then user's data are persists
    * in the users's table and the ones from the temporary table are then removed.
    */
    public function get_activaction($activation_key)
    {
        
        /* Extract the activation key. */
        $temp_user = DB::table('temp_users')
                ->where('activation_key', '=', $activation_key)
                ->get();
        
        
        /* Persist user if the key has been found. */
        if (!empty($temp_user))
        {
            DB::table('users')->insert([
                'username' => $temp_user[0]->username,
                'email' => $temp_user[0]->email,
                'password' => $temp_user[0]->password
            ]);
            
            
            DB::table('temp_users')
                ->where('activation_key', '=', $activation_key)
                ->delete();
        
                
            /* Display an activation success page. */
            return view('successActivation');
        }
        
        /* Display an error activation page. */
        return view('errorActivation');
    }
    
    
    
    
    
    
}