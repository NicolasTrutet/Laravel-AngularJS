<?php
namespace App\Http\Controllers;
use Response;
use Session;
use User;
use Validator;
use Auth;
use Illuminate\Http\Request;
use DB;
use Listes;
use Reservations;
use Items;

Class ReservationController extends Controller
{
    
    
    
    /**
    * Make a reservation on a item.
    * A reservation can only be made by a logged user.
    */
    public function get_Reserver($id_item)
    {
        
        if ( Session::has('email') )  
        {
            /* Make sure the item is not booked yet. */
            $booked = DB::table('items')
                        ->where('id_item', '=', $id_item)
                        ->select('booked')->get();
            
            
            /* If it is not, then make the reservation. */
            if ($booked != 0)
            {
                DB::table('items')
                    ->where('id_item', '=', $id_item)
                    ->update(['booked' => 1]);
                
                $date = date_create();
                DB::table('reservations')->insert([
                    'id_item' => $id_item,
                    'id_user' => Session::get('userID'),
                    'created_at' => date_timestamp_get($date),
                    'updated_at' => date_timestamp_get($date)
                ]);                        

            }
            

            /* Build response as json. */
            $res = array(
                'error' => false,
                'auth' => Session::has('email'),
                'data' => null
            );

            return Response::json($res, 200);
            
            
        }
        else /* User is not logged */
        {
            
            $res = array( 
                'error' => true,
                'redirect' => true,
                'auth' => Session::has('email'),
                'data' => null
            );

            return Response::json($res, 200);    
        }
    }
        
        
        
        
    
    
    
        
        
        
        
        
}