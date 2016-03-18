/**
* [resultsController.js]
*
*
*/

app.controller('ResultsCtrl', ['$scope', 'httpService', 'InputValidationService', '$location', '$rootScope', '$timeout', '$routeParams',                                                'SendNotification',
                            function($scope, httpService, InputValidationService, $location, $rootScope, $timeout, $routeParams, SendNotification) 
{
    
    
    
    /******************************************
    *             DISPLAY LISTS               *
    *******************************************/
    
    
    /*
    * The view is different depending on boolean value.
    * [true] = display lists
    * [false] = display items from a list.
    */
    $scope.showResults = true;

    var userID = $routeParams.id;
    
    /* Number of list received. */
    $scope.CountListes = 0;
    
    /* Store user's lists. */
    $scope.Results;
    
    $scope.username = '';
    
    
    /* Perform request in order to get user's lists. */
    $scope.searchUserListes = function(user_id)
    {
        /* display loading spinner. */
        $scope.loading = true;
        
        
        /* Build request */
        var request = {
            method: 'GET',
            url: 'listes/' + user_id
        }
        
 
        /* Call httpService */
        httpService.http(request) 
            .then(function(response) { /* -----Server Reponse----- */
                
                /* Populate Results variable */
                if (response.data.results != null)
                {
                    if (response.data.results.length != 0)
                    {
                        $scope.Results = response.data.results;
                        $scope.showResults = true;
                        $scope.username = response.data.username;
                        $scope.CountListes = $scope.Results.length;
                        
                        $scope.loading = false;
                    }
                    else
                    {
                        /* No list for this user. */
                        $scope.loading = false;
                        $scope.showResults = true;
                        $scope.Results = null;
                        $scope.CountListes = 0;
                        $scope.username = response.data.username;
                        
                    }
                }
                                    
                /* 
                * Change navigation bar state
                * If user has no acitve session.
                */
                if (response.auth)
                {
                    SendNotification.turnOn(); 
                }
                else
                {
                    SendNotification.turnOff(); 
                }
                
            
            },
            function(error) { /* -----Error Server----- */ 
                $scope.loading = false;
            });    
    }
    
    
    
    
    /* Send request at start. */
    window.onload = $scope.searchUserListes(userID);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /**************************************************
    *             DISPLAY ITEMS FROM A LIST           *
    ***************************************************/
    
    
    
    /* Store items from the previously searched list. */
    $scope.ItemsResults;
    
    /* Init 'id_liste'. */
    var listeID = 0;
    
    /* 
    * This funcion send a request to display items from 
    * a list which is the one user has just clicked on.
    */
    $scope.GetListElements = function(id_liste)
    {

        /* Display items */
        $scope.showResults = false;
    
        /* Copy id */
        listeID = id_liste; 
        
        /* Display spinner. */
        $scope.loading = true;
        
        /* Build request */
        var request = {
            method: 'GET',
            url: 'items/' + id_liste
        }
        
 
        /* Call httpService */
        httpService.http(request) 
            .then(function(response) { /* -----Server Reponse----- */
                
                /* Populate Results variable. */
                if (response.data.results != null)
                {
                    if (response.data.results.length != 0)
                    {
                        $scope.ItemsResults = response.data.results;
                        $scope.showResults = false;
                        
                        $scope.loading = false;
                    }
                    
                    /* 
                    * Change navigation bar state if the 
                    * user has no active session.
                    */
                    if (response.auth)
                    {
                        SendNotification.turnOn(); 
                    }
                    else
                    {
                        SendNotification.turnOff(); 
                    }
                }
            
            },
            function(error) { /* -----Error Server----- */ 
                
                $scope.loading = false;
            });    
    }
    

    
    /* Allow user to go back to the lists view. */
    $scope.backToListes = function() {
        
        $scope.showResults = true;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    /**************************************************
    *          MAKE A RESERVATION ON A OBJET          *
    ***************************************************/
        
    
    /* Inform user that this item is already booked by opening an popup alert. */
    $scope.popover = function(id) {
        
        /* Show popup */
        $('#'+id).popover('show');  
        
        /* Hide it after 2s. */
        $timeout(function() {
            $('#'+id).popover('hide');  
        }, 3000);
    }
    
    
    
    
    
    
    /*
    * This function is used to make a reservation on a item.
    *
    * Control that the user is connected before reservation.
    * In case the user is not logged, then open a modal alert
    * in order to allow user to be redirected to the signin page.
    */   
    $scope.bookItem = function(id_item)
    {        
        if ($rootScope.IsUserAuth)
        {            
            /* Compose request. */
            var request = {
                method: 'GET',
                url: 'reserver/' + id_item
            }


            /* Call httpService */
            httpService.http(request) 
                .then(function(response) { /* -----Server Reponse----- */
                    
                    /* In case of success refresh content */
                    if (!response.error)
                    {
                        $scope.GetListElements(listeID);
                    }

                },
                function(error) { /* -----Error Server----- */ });    
        }
        else /* User is not connected. */
        {
            $('#ConnectionModal').modal('show');
        }
    }
    
    
    
    
    
    
    
    
    /* Redirect user to the login page. */
    $scope.login = function() {

        /* Hide modal first. */
        $('#ConnectionModal').modal('hide');
        
        /* Wait for the modal to be hided before redirection. */
        $timeout(function() {
            $location.path('login/0');   
        }, 300);
    }
    
    
    
    
    
    
    
    
    
    
    
    
  

    
    
    
}]);