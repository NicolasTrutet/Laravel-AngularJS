<?php
namespace App\Http\Controllers;
use Response;
use Session;
use Illuminate\Http\Request;

Class CheckSessionController extends Controller
{
    
    
    /* Tells the client if the user is still connected */
    public function get_IsSessionActive()
    {
        if ( Session::has('email') )
        {
            /* Build response */
            $res = array( 
                'error' => false,
                'auth' => true
                
            );

            return Response::json($res, 200); 
        }
        else /* Case where user is no connected. */
        {
            $res = array( 
                'error' => true,
                'auth' => false
            );

            return Response::json($res, 200);    
        }
    }
        

    
    
    
    
}