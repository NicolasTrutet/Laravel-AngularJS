/**
* [editlisteController.js]
*
*
*/

app.controller('editlistCtrl', ['$scope', 'httpService', 'InputValidationService', '$location', '$rootScope', '$routeParams', 'SendNotification',
                            function($scope, httpService, InputValidationService, $location, $rootScope, $routeParams, SendNotification) 
{
    
    
    
    
    /*
    * Initialize the counter which will be incremented every time a row is added to the DOM.
    * The incrementation is done by the 'addrow' directive in 'directive.js'.
	* N_elements is used to display how many element there is and its also increment in 'directive.js'.
    */
 	$scope.count = 1;	
 	$scope.N_elements = 1;
 	$scope.numberOfElement = $scope.N_elements;	
    
    /* Display the list name to be edited. */
    $scope.nomListe = '';
    
    /* Control the display of formular used to add elements. */
    $scope.DisplayAddItemToListeAlert = false;  

    /*
    * Display a different message depending on the bollean value of 'DisplayAddItemToListeAlert'.
    * [true] = 'All fields must ...'
    * [false] = 'Error Server ...'
    */
    $scope.displayFormatAlert = false;
    
    
    /* Count properties of an object. */
    function ObjectLength( object ) {
        var length = 0;
        for( var key in object ) {
            if( object.hasOwnProperty(key) ) {
                ++length;
            }
        }
        return length;
    };
     
    
    /* Contain objects to edit. */                                        
    $scope.inputGroup = {
        "object_1" : {
            "id_item":"",
            "ListeNom": "",
            "ListeDescription": ""
        }
    };
     
    
    /* Contain the list ID used to send the http request. */
    var EditID = $routeParams.id;
    
    
    /* Download lists asynchronously. */
    function LoadData(id) {
        
        /* Display loading spinner. */
        $scope.loading = true;
        
        
        /* ----Send request to server---- */
        
        /* Build request */
         var request = {
                method: 'GET',
                url: 'editliste/' + id
            }
            
         
            /* Call httpService */
            httpService.http(request) 
                .then(function(response) { /* -----Response Server----- */
                
                
                    if (!response.error)
                    {
                        /* Send notification via service. */
                        SendNotification.turnOn();
                        
                        $scope.loading = false;
                        $scope.nomListe = response.data.nomListe;

                        /* Create N rows of elements.  */
                        AddRows(response.data.listes.length);

                        /* Add element to the created rows. */
                        AddElementToListe(response.data.listes);

                        /* Remove alert. */
                        $scope.alerteServeur = false;    
                    
                    }
                    else
                    {
                        SendNotification.turnOff();
                        $location.path('login/0');
                    }
                    
                },
                function(error) { /* -----Error Server----- */ 
                    
                    $scope.loading = false;
                    $scope.alerteServeur = true;  
                });
    }
    
    
    
    
    /* Download elements of a list when page loads. */
    window.onload = LoadData(EditID);
    
    
 
    /* 
    * Trigger the 'addrow' directive by simulating as many clicks as there 
    * are properties in the 'Data' object in order to display the elements to edit.
    */
    function AddRows(N) {
        var id = 1;
        var rows = ObjectLength($scope.Data);
        
        for (i=0 ; i < (N) ; i++)
        {
            document.getElementById(id).click();
            id++;
        }
    };
    
                       
        
    /* Add the downloaded element to $scope.inputGroup. */                            
    function AddElementToListe(elem) {        
        var i = 1;

        for (var key in elem) {
            var object = "object_" + i;
            $scope.inputGroup[object] = {
                "id_item": elem[key].id_item, 
                "ListeNom": elem[key].nom_item, 
                "ListeDescription": elem[key].description_item
            };    
            i++;
         }
    }                                
                                
                                
    /* 
    * This will be populated if the data submited are corrects. 
    * This JSON which will contain all elements that compose 
    * a list will then be sent to the server.
    */
    var JsonToSend = {
        'data' : []
    };      
    
    
                                
    /* Check all data before submit them to server */
    $scope.UpdateList = function() {
        
        $scope.loading = true;        
        var NewListeAlert = false;         
        
        /* 
          Remove the last property in '$scope.inputGroup' related to the last 
          row from the edit list if it is empty. 
          The last row with the + sign is empty by default, so we remove it if the user 
          has not add any data to prevent an error message when updating.
        */
        var AllKeys = [];
        for (var key in $scope.inputGroup) {
            if (!$scope.inputGroup.hasOwnProperty(key)) continue;            
            AllKeys.push(key);
        }
        
        var key = AllKeys.pop();
        var LastRowNameLength = $scope.inputGroup[key].ListeNom.length
        var LastRowDecriptionLength = $scope.inputGroup[key].ListeDescription.length;
        
        if (LastRowDecriptionLength == 0 && LastRowNameLength == 0)
        {
           delete $scope.inputGroup[key];             
        }
        

        
        
        for (var key in $scope.inputGroup) {

            /* Break the iteraton if object has no property. */
             if (!$scope.inputGroup.hasOwnProperty(key)) continue;
                
                 /* Check the data format with the InputValidationService. */
                 var controList = ['ListeNom', 'ListeDescription'];
                 var valid = InputValidationService.Validation($scope.inputGroup[key], controList);
             
                /* If the format is incorrect then display an alert and stop the loop. */
                 if (!valid.ListeNom || !valid.ListeDescription)
                 {                     
                     $scope.DisplayAddItemToListeAlert = true;  
                     $scope.displayFormatAlert = true;
                     NewListeAlert = true;
                     $scope.loading = false;
                 }
                 if (NewListeAlert) { break; }
                 
         }
        
        
        /* Submit data to server if there are correct */
        if (!NewListeAlert)
        {
            
           /* Populate 'JsonToSend'. */
           for (var key in $scope.inputGroup) {

                if (!$scope.inputGroup.hasOwnProperty(key)) continue;

                    JsonToSend.data.push({
                        "id_item": $scope.inputGroup[key].id_item,
                        'ListeNom' : $scope.inputGroup[key].ListeNom,
                        'ListeDescription': $scope.inputGroup[key].ListeDescription
                    }); 
            }
            

            /* Build the request */
            var request = {
                method: 'POST',
                url: 'editliste/' + EditID,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { 
                    "listes": JSON.stringify(JsonToSend) 
                }
            }
                
             
            /* Call httpService */
            httpService.http(request)
                .then(function(response) { /* ----Reponse Server----- */
                    
                
                    /* Redirect to account page. */
                    if (response.redirect && !response.error) 
                    {
                        SendNotification.turnOn();
                        $location.path('/account');
                    }
                    
                    /* Redirect user if he is not logged. */
                    else if (response.error) 
                    {
                        SendNotification.turnOff();
                        $location.path('/login/0');       
                    }    
                
                    $scope.loading = false;
                },
                function(error) { /* ----Error Server----- */ 
                    
                    $scope.DisplayAddItemToListeAlert = true;  
                    $scope.displayFormatAlert = false; 
                    $scope.loading = false;
                
                });
            
        }
    }
       
   
                                
                            
    
                                
                                
}]);
        