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

Class AccountController extends Controller
{
    
    
    /* Get user's lists to be displayed in his account page. */
    public function get_AccountData($block)
    {
        
        if ( Session::has('email') ) 
        {
            
            /* -----Get user's lists----- */
            /*
            * Tells the range of lists to be extracted from 'listes'. 
            * Example: 
            *   If [$block = 1] = extract lists from 0 to 5.
            *   If [$block = 2] = extract lists from 6 to 11.
            */
            $B = ($block * 5) + ($block - 1);
            $A = ($B - 6);
            
            
            $listes = DB::table('listes')
                        ->where('id_user', '=', Session::get('userID')) 
                        ->skip($A)->take($B)
                        ->get();
            
            
            
            /* Store all lists in $ListsToSend if they exists. */
            $ListsToSend = array();
            if ( !empty($listes) )
            {
                $size = sizeof($listes);
                for ($i=0 ; $i < $size ; $i++)
                {
                    array_push($ListsToSend, array(
                        'id_liste' => $listes[$i]->id_liste,
                        'nom_liste' => $listes[$i]->nom_liste,
                        'description_liste' => $listes[$i]->description_liste,
                        'date_liste' => $listes[$i]->created_at
                    ));        
                }   
            }
                
            
            $TotalUserLists = DB::table('listes')
                                ->where('id_user', '=', Session::get('userID'))
                                ->count();
            
            /* Build response.s */
            $res = array( 
                'error' => false,
                'redirect' => false,
                'auth' => Session::has('email'),
                'data' => array(
                    'username' => Session::get('username'), 
                    'listes' => $ListsToSend,
                    'total_liste' => $TotalUserLists
                )
            );

            return Response::json($res, 200);    
        
        }
        else /* Case where user is not connected. */
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