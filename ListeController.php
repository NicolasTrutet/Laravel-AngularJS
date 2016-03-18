<?php
namespace App\Http\Controllers;
use Response;
use Session;
use User;
use Listes;
use Items;
use Validator;
use Auth;
use Illuminate\Http\Request;
use DB;
use Reservations;


Class ListeController extends Controller
{
    
    
    
    
    /* Send items from a list that aim to be edited */
    public function get_EditListe($id) 
    {
        
        /* Send only if user is connected. */
        if ( Session::has('email') ) 
        {
            
            /* Extract items by the given list $id. */
            $elements = DB::table('items')
                            ->join('listes', function($join) use($id) {
                                $join->on('items.id_liste', '=', 'listes.id_liste')
                                    ->where('listes.id_liste', '=', $id);
                            })->get();
                            
            
           
            /* Build response as json. */
            $ItemsToSend = array();
            if ( !empty($elements) )
            {
                $size = sizeof($elements);
                for ($i=0 ; $i < $size ; $i++)
                {
                    array_push($ItemsToSend, array(
                        'id_item' => $elements[$i]->id_item,
                        'nom_item' => $elements[$i]->nom_item,
                        'description_item' => $elements[$i]->description_item
                    ));
                }
                
                
                $res = array( 
                    'error' => false,
                    'redirect' => false,
                    'data' => array(
                        'nomListe' => $elements[0]->nom_liste,
                        'listes' => $ItemsToSend
                    )
                );
                
                return Response::json($res, 200);
            }
        
        
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /* Edit items from a list which are sent as json. */
    public function post_EditListe($id, Request $request)
    {
        
        /* Perform edit for authenticate user only. */
        if ( Session::has('email') ) 
        {
            
            /* The two following extractions are used for further match. */
            
            /* Extract data from the json file. */
            $json = $request->input('listes');
            $listes = json_decode($json, true);
            
            /* Extract data from the items table. */
            $StoredItems = DB::table('items')
                            ->where('id_liste', '=' , $id)
                            ->get();
            
            
            
            
            
            /* Update elements from the 'items' table if they have been changed. */
            foreach ($listes['data'] as $elem) {
                
                /* Search only element with 'id_item' key. */
                if ( array_key_exists('id_item', $elem)) 
                {
                    /* Search if it exist in table. */
                    foreach($StoredItems as $item) {
                        
                        if ($elem['id_item'] == $item->id_item) /* ---Match---- */
                        {
                            /* Does its values has been changed ? */
                            if ( ($elem['ListeNom'] != $item->nom_item) || ($elem['ListeDescription'] != $item->description_item) )
                            {
                                /* Update items table where id mathes. */
                                DB::table('items')
                                    ->where('id_item', '=', $item->id_item)
                                    ->update([
                                        'description_item' => $elem['ListeDescription'],
                                        'nom_item' => $elem['ListeNom']
                                    ]);
                            }
                            break;
                        }
                    }
                }
            }
            
            
            
            
            
            
            
            /* Remove element that are not present in $listes; */
            $ElementFound = false;
            $ElementToRemove = null;
            
            foreach ($StoredItems as $item) {
                foreach($listes['data'] as $newItem) {
                    
                    /* Search only element with 'id_item' key. */
                    if (!array_key_exists('id_item', $newItem)) 
                    {
                        break;
                    }
                    
                    if ($item->id_item == $newItem['id_item'])
                    {
                        $ElementFound = true;
                        break;
                    } else 
                    {
                        $ElementFound = false;
                        $ElementToRemove = $item->id_item;
                    }                    
                } 
                
                if (!$ElementFound)
                {
                    /* Remove item. */
                    DB::table('items')->where('id_item', '=', $ElementToRemove)->delete();
                }
                
            }
            
                        

            
            
            /* Add item where key 'id_item' doesn't exist. */
            foreach ($listes['data'] as $elem) {
                if (!array_key_exists('id_item', $elem)) 
                {
                    /* Add new item to item table. */
                    DB::table('items')->insert([
                        'id_liste' => $id,
                        'nom_item' => $elem['ListeNom'],
                        'description_item' => $elem['ListeDescription']
                    ]);
                }
            }
            
            
            

            /* Build response. */
            $res = array( 
                'error' => false,
                'redirect' => true,
                'auth' => Session::has('email'),
                'data' => null
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /* Create a new list and its items if user is connected. */
     public function post_CreateListe(Request $request)
    {
    
        if ( Session::has('email') ) 
        {
            
            /* Extract data from the json file. */
            $json = $request->input('listes');
            $listes = json_decode($json, true);
            
            
            /* Persist new list in the table. */
            DB::table('listes')->insert(
                    [
                    'id_user' => Session::get('userID'),
                    'nom_liste' => $listes['title']['nom'],
                    'description_liste' => $listes['title']['description'],
                    'created_at' => date("j, n, Y")
                    ]
                );  
            
            
            
            /* Get 'id_liste' to store items in the 'items' table. */
            $MatchThese = [
                            'id_user' => Session::get('userID'),
                            'nom_liste' => $listes['title']['nom'],
                            'description_liste' => $listes['title']['description']
                           ];
            
            $id_liste = DB::table('listes')->where($MatchThese)->get();
            
            
            
            
            
            /* Persist items in its table. */
            $size = sizeof($listes['data']);
            for ($i=0 ; $i < $size ; $i++)
            {
                DB::table('items')->insert(
                    [
                    'id_liste' => $id_liste[0]->id_liste,
                    'nom_item' => $listes['data'][$i]['ListeNom'],
                    'description_item' => $listes['data'][$i]['ListeDescription'],
                    'created_at' => date("j, n, Y")
                    ]
                );      
            }
            
               
            /* Build response. */
            $res = array( 
                'error' => false,
                'redirect' => true,
                'auth' => Session::has('email'),
                'data' => null
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /* Remove a list. */
     public function get_DeleteListe($id)
     {
         if (Session::has('email'))
         {
             /* 
             * Remove rows from the reservations table and items 
             * before removing the list in the lists table to respect integrity.
             */
             
             
             /* Look for booked items. */
             $MatchThese = ['id_liste' => $id , 'booked' => 1];
             $bookedItems = DB::table('items')
                                 ->where($MatchThese)
                                 ->get();
             
             
             /* Remove reservation on items */
             if ( !empty($bookedItems) )
             {
                 $size = sizeof($bookedItems);
                 for ($i=0 ; $i < $size ; $i++)
                 {
                     DB::table('reservations')
                         ->where('id_item', '=', $bookedItems[$i]->id_item)
                         ->delete();
                 }
             }
             
             /* Remove items that compose the list. */
             DB::table('items')
                     ->where('id_liste', '=', $id)
                     ->delete();
             
              
              /* Remove the list. */
              DB::table('listes')
                     ->where('listes.id_liste', '=', $id)
                     ->delete();
             
             
             
            /* Build response */
            $res = array( 
                'error' => false,
                'redirect' => false,
                'auth' => Session::has('email'),
                'data' => null
            );

            return Response::json($res, 200);  
         }
     }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}