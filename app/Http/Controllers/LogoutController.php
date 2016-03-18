<?php
namespace App\Http\Controllers;
use Session;
use Auth;
use Response;

Class LogoutController extends Controller
{
    
    /* Logout user and repond with a redirection order. */
    public function get_Logout()
    {
        Session::flush();
        Auth::logout();
        
        /* Build response as json. */
        $res = array( 
            'error' => false,
            'redirect' => true,
            'data' => null
        );

        return Response::json($res, 200);
    }






}