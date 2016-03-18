<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/





/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    
    

/************************ 
 *         HOME         *
 ************************/

/**
* Redirect user to the home page.
*/
Route::get('/', 'HomeController@get_home');


    
    
    
    
    



/************************ 
 *   AUTHENTIFICATION   *
 ************************/

/**
* Authenticate user.
*/
Route::post('/login', 'LoginController@post_LogIn');

/**
* Check if the given email is unique.
*/
Route::post('/controle_email', 'RegisterController@post_Email');

/**
* Register a new user.
*/
Route::post('/register', 'RegisterController@post_Register');

/**
* Logout a user.
*/
Route::get('/logout', 'LogoutController@get_Logout');

/**
* Tells the client if user is still connected.
*/
Route::get('/session', 'CheckSessionController@get_IsSessionActive');    

/**
* Activate user's account.
*/
Route::get('/activate/{activation_key}', 'ActivationController@get_activaction');    

    
    
    
    
    
    
    
    
    
/************************ 
 *       ACCOUNT        *
 ************************/

/**
* Send data related to the account page.
* The block parameter is a integer that tells which page to send.
*/
Route::get('/account/{block}', 'AccountController@get_AccountData');







/************************ 
 *       LISTS         *
 ************************/

/**
* Gets all items from a list to be edited.
*/
Route::get('/editliste/{id}', 'ListeController@get_EditListe');

/**
* Create a new list.
*/
Route::post('/createliste', 'ListeController@post_CreateListe');    

/**
* Edit items from a list.
*/
Route::post('/editliste/{id}', 'ListeController@post_EditListe');

/**
* Delete a liste by its id.
*/
Route::get('/deleteliste/{id}', 'ListeController@get_DeleteListe');

    
    
    
    
    
    
    
    
    
/************************ 
 *       SEARCH         *
 ************************/

/**
* Search a user.
*/
Route::get('/search/{hint}', 'SearchController@get_SearchUser');
    
/**
* Search user's lists by the user's id.
*/
Route::get('/listes/{user_id}', 'SearchController@get_UsersListes');
    
    
/**
* Get all items from a list and their availalability.
*/
Route::get('/items/{liste_id}', 'SearchController@get_ItemsListe');
    
    
    
        
    
    
    
    
    
    
/*************************** 
 *       RESERVATIONS      *
 ***************************/

/**
* Book an item.
*/
Route::get('/reserver/{id_item}', 'ReservationController@get_Reserver');
    

    
    
    
    
});
