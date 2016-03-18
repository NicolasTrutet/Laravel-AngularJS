<?php
namespace App\Http\Controllers;
use Response;
use Session;
use User;
use Validator;
use Auth;
use Illuminate\Http\Request;
use DB;


Class LoginController extends Controller
{
    
    
    
    
    /* Connect user via email & password */
    public function post_LogIn(Request $request)
    {
      
        /* Check format of the given data. */
        $validator = Validator::make($request->all(), 
            [
            'email' => 'Required|max:40|Email',
            'password' => array('Required', 'regex:/^[A-Z0-9\.&\%\$\#\@\!\/\\/]{8,30}$/i'),
            ]
        );
        
        
        
        
        /* authenticate user if input are correct. */
        if (!$validator->fails())
        {
            
            $email = $request->input('email');
            $pwd = $request->input('password');
            
            
            /* Authenticate user. */
            if (Auth::attempt(['email' => $email, 'password' => $pwd]))
            {
                /* Extract user's information in order to store them in session. */
                $user = DB::table('users')
                        ->where('email', '=', $email)
                        ->get();
                
                
                /* Create a new session for this user. */
                session()->put('email', $user[0]->email);
                session()->put('userID', $user[0]->id);
                session()->put('username', $user[0]->username);
                
                
                
                /* Build response. */
                $res = array( 
                    'error' => false,
                    'redirect' => true,
                    'data' => null
                );

                return Response::json($res);
                
                
                
            }
            else /* Case where user does not exist. */
            {
                $res = array( 
                    'error' => 'L\'utilisateur n\'existe pas.',
                    'redirect' => false,
                    'data' => null
                );

                return Response::json($res);
            }
        
        
        
        }
        else /* Case where data sent would not be in the correct format. */
        {
            $res = array( 
                'error' => "Format email et/ou mot de passe incorrecte.",
                'redirect' => false,
                'data' => null
            );

            return Response::json($res);
        }
        
        
        
        
    }
    

    
    
    
}
    