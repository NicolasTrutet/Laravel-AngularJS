<?php
namespace App\Http\Controllers;


Class HomeController extends Controller
{


    /* redirect user to the index page. */
    public function get_home()
    {
        return view('index');
    }
    
    





}