<?php
namespace App\Http\Controllers;
use Response;
use Session;
use User;
use Validator;
use Auth;
use Illuminate\Http\Request;
use DB;
use Illuminate\Routing\Redirector;
use Routes;
use Temp_users;
use Mail;

Class RegisterController extends Controller
{

    
    
    
    /**
    * Create a new user. A new user is stored in a temporary table with 
    * a unique activation key that is sent to his email address for activation. 
    */
    public function post_Register(Request $request)
    {
        
        
        /* Prevent from create a connected user. */
        if (!Session::has('email'))  
        {
            
            
            /* Check user input. */
            $validator = Validator::make($request->all(), 
                [
                'name' => array('Required', 'regex:/^[A-Za-z0-9\&\s\é\à\è\ê\'\-]{3,30}$/i'),
                'email' => 'Required|max:40|Email',
                'password' => array('Required', 'regex:/^[A-Z0-9\.&\%\$\#\@\!\/\\/]{4,30}$/i'),
                ]
            );


            
            
            
            /* Persist data in the users table. */
            if (!$validator->fails())
            {
                
                /* Check that the given email does not exit in the users table yet. */
                $email = DB::table('users')
                            ->where('email', '=', $request->input('email'))
                            ->get();
                
                /* Check that the given email does not exit in the temporary table yet. */
                $temp_user_email = DB::table('temp_users')
                            ->where('email', '=', $request->input('email'))
                            ->get();


                $activationKey = '';
                
                
                
                
                
                /* Persist data. */
                if ( empty($email) && empty($temp_user_email) )
                {
                    /* Create activation key based on email address. */
                    $key = bcrypt($request->input('email'));
                    $activationKey = preg_replace('#/+#','_',$key);
                    
                    DB::table('temp_users')->insert(
                        [
                        'email'    => $request->input('email'), 
                        'password' => bcrypt($request->input('password')),
                        'username' => $request->input('name'),
                        'activation_key' => $activationKey
                        ]
                    );  
                    
                    
                    /* Prepare email for account activation. */
                    $user = array(
                        'email' => $request->input('email'),
                        'username' => $request->input('name'),
                        'activation_link' => 'http://your_path/public/activate/' . $activationKey
                    );
                    
                    
                    /* Send a email to user with an activation link. */
                    Mail::send('activationMail', ['user' => $user['username'], 'link' => $user['activation_link'] ], function ($m) use ($user) {
                        $m->from('whishlistAdmin@app.com', 'WhishLists');
                        $m->to($user['email'], $user['username'])->subject('Account activation!');
                    });
                    
                    
                    /* Build response. */
                    $res = array(
                        'error' => false,
                        'redirect' => true,
                        'data' => null
                    );

                    return Response::json($res, 200);

                    
                }
                else /* Case if email would not be unique */
                {
                    $res = array(
                        'error' => true,
                        'redirect' => false,
                        'data' => null
                    );

                    return Response::json($res, 200);
                }
            
            
            
            }
            else /* Case where input data would not be correct. */
            {
                $res = array(
                    'error' => "Wrong format!",
                    'redirect' => false,
                    'data' => null
                );

                return Response::json($res, 200);
            }

        }
    }
           
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
     
    /**
    * Control the uniqueness of the given email address.
    * This function is used by the SignUp process.
    */
    public function post_Email(Request $request)
    {
        
        
        /* Check the email format. */
        $validator = Validator::make($request->all(), 
            ['email' => 'Required|max:40|Email']
        );
       
            
        
        /* Make sure email is unique. */
        if (!$validator->fails())
        {
            $email = DB::table('users')
                        ->where('email', '=', $request->input('email'))
                        ->get();
            
         
            
            /* Build response as JSON */
            if (empty($email))
            {
                /* Response if unique */
                $res = array(
                    'error' => false,
                    'redirect' => false,
                    'data' => null
                );

                return Response::json($res, 200);
            }
            else
            {
                /* response if not unique */
                $res = array(
                    'error' => true,
                    'redirect' => false,
                    'data' => null,
                    'mail' =>$email
                );

                return Response::json($res, 200);
            }        
        }   
        else /* Case where the given email would not be in the correct format. */
        {
            $res = array(
                    'error' => 'Wrong email format',
                    'redirect' => false,
                    'data' => null
                );

            return Response::json($res, 200);
        }
    }
           
    
    
    
    
    
    
    
    
    
    
    
       
}
