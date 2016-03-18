/**
* [accountController.js]
*
* 
*/

app.controller('accountCtrl', ['$scope', 'httpService', 'InputValidationService', '$location', '$rootScope', '$timeout', 'SendNotification',
                            function($scope, httpService, InputValidationService, $location, $rootScope, $timeout, SendNotification) 
{
    
    
    
    
    /* Tells if the loading spinner is displayed. */                            
    $scope.loading = false;
    
    /* Store reveived data. */
    $scope.username = '';
    $scope.Listes = [];
    $scope.nombreTotalElements = 0;
    
    /* 
    * Number of blocks currently downloaded
    * This variable is incremented every time 
    * the use click on [Load more...] button
    */
    var NombreBlocs = 1;
    
    
    /*
    * This function is used to download lists asynchronously.
    * The 'bloc' argument tells how many lists are sent by the server.
    * For instance:
    *   If bloc = 1 then the server send list from 0 to 5.
        or
    *   If bloc = 2 then the server send list from 6 to 11.
    */
    function LoadData(bloc) {
        
        /* Display loading spinner. */
        $scope.loading = true;
        
        
        /* ----Send request to server---- */
        
        /* Build request */
         var request = {
                method: 'GET',
                url: 'account/' + bloc
            }
            
         
            /* Call httpService */
            httpService.http(request) 
                .then(function(response) { /* -----Server response----- */
                
                    /* Remove spinner. */
                    $scope.loading = false;
                
                
                    /* Redirect user if is not connected. */
                    if (response.error) 
                    {
                        /* -----Remove the dropdown button from the navigation bar----- */
    
                        /* Send a notification through this service. */
                        SendNotification.turnOff();
                        
                        /* Redirect user. */
                        $location.path('/login/0');       
                    }
                    else 
                    {
                        /* Send a notification through this service. */
                        SendNotification.turnOn();
                        
                        $scope.username = response.data.username;
                        AddElementToListe(response.data.listes);
                        $scope.nombreTotalElements = response.data.total_liste;    
                    }
                        
                    
                
                    /* Remove alert. */
                    $scope.alerteServeur = false;
                },
                function(error) { /* -----Error server----- */ 
                    
                    /* Remove spinner. */
                    $scope.loading = false;
                    
                    /* Display alert. */
                    $scope.alerteServeur = true;  
                });
    }
    
    
    
    /* Download the first 5 lists when landing on the page. */
    window.onload = LoadData(NombreBlocs);
    
    
    
    
    /* Download more lists. */
    $scope.loadModeListes = function() {
        NombreBlocs++;
        LoadData(NombreBlocs);
    }
    
    
    
    
    /* Store id item to be used by modal edit button. */
    $scope.itemID;              
    $scope.ListName;
    $scope.address = function(address, listName) {
        $scope.itemID = address;
        $scope.ListName = listName;
    }
    
    
    
                                
    /* route to the edit page with the previously selected id. */
    $scope.edit = function() {
        /* Fermer la fenêtre modal. */
        $('#myModal').modal('hide');
        
        /* Wait for the modal to be closed before redirection. */
        $timeout(function() {
            var url = '/editliste/' + $scope.itemID;  
            $location.path(url);   
        }, 300);
    }
                
    
    
  
    /* Add the new downloaded lists to $scope.Listes. */                            
    function AddElementToListe(elem) {
        
        for (var key in elem) {
              $scope.Listes.push({
                  'id_liste' : elem[key].id_liste,
                  'nom_liste': elem[key].nom_liste,
                  'description_liste' : elem[key].description_liste,
                  'date_liste': elem[key].date_liste
              }); 
         }
    }
                                
    

              
    
    
    
    /* Remove a list from the modal window. */
    $scope.DeleteListe = function() {
        
        /* Build request */
        var request = {
            method: 'GET',
            url: 'deleteliste/' + $scope.itemID
        }
            
         
        /* Call httpService */
        httpService.http(request) 
            .then(function(response) { /* -----Server response----- */
            
                /* Close the modal window. */
                $('#myModal').modal('hide');
                
                /* Refresh lists page. */
                NombreBlocs = 1;
                $scope.Listes = []
                LoadData(NombreBlocs);
            },
            function(error) { /* -----Error server----- */ }); 
    }
                                
  

                                
            
                        
                            
}]);