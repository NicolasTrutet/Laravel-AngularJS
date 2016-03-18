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

Class SearchController extends Controller
{
    
    
    
    
    
    
    /* Search users from the search bar. */
    public function get_SearchUser($hint)
    {
        
        /* Check user input. */
        $input = array('hint' => $hint);
        $validator = Validator::make($input, 
            ['hint' => array('Required', 'regex:/^[A-Za-z0-9\&\s\é\à\è\ê\'\-]{0,50}$/i'),]
        );
        
        
        /* Seach in the database and populate variable for response. */
        $userData = array();
        if ( !$validator->fails() )
        {
            $query = DB::table('users')
                        ->where('username', 'like', "%$hint%")
                        ->take(10)
                        ->select('username', 'id as user_id')
                        ->get();    

            $userData = array(
                'results' => $query
            );
             
        }
        
        /* Build response as json. */
        $res = array(
            'error' => false,
            'data' => $userData,
            'auth' => Session::has('email')
        );

        
        return Response::json($res, 200);
        
    }
 
    
    
    
    
    
    
    
    
    
    
    

    
    
    
    /* Send user's list */
    public function get_UsersListes($user_id)
    {
        
        /* Extract user's lists. */
        $listes = DB::table('users')
            ->join('listes', function($join) use($user_id) {
                $join->on('users.id', '=', 'listes.id_user')
                    ->where('users.id', '=', $user_id);
            })->select('id as id_user', 'username', 'id_liste', 'nom_liste', 'description_liste')->get();
        

        $username = DB::table('users')->select('username')->where('id', '=', $user_id)->get();
        
        /* Build response as json. */
        $res = array(
            'error' => false,
            'data' => array(
                'username' => $username[0]->username,
                'results' => $listes
            ),
            'auth' => Session::has('email')
        );

        
        return Response::json($res, 200);   
    }
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /* Send items that belong to a list. */
    public function get_ItemsListe($liste_id)
    {
        
        /* Extract items from a list. */
        $listes = DB::table('items')
                ->where('items.id_liste', '=', $liste_id)
                ->select('nom_item', 'description_item', 'id_item', 'booked')
                ->get();
    
        $ItemsListe = array(
            'results' => $listes
        );
        
            
        /* Build response as json. */
        $res = array(
            'error' => false,
            'data' => $ItemsListe,
            'auth' => Session::has('email')
        );

        
        return Response::json($res, 200);
        
        
    }
        
    
    
    
    
    
    
        
        
        
        
    
    
}
