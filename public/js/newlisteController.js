/**
* [newlisteController.js]
*
*
*/

app.controller('newlisteCtrl', ['$scope', 'httpService', 'InputValidationService', '$location', '$rootScope', 'SendNotification',
                            function($scope, httpService, InputValidationService, $location, $rootScope, SendNotification) 
{
    
    
    
    /**********************************************
    *           CREATION LIST FORMULAR            *
    ***********************************************/
    

    /**
    * Hide or display the creation list formular.
    * If this one is displayed then the one used 
    * to add elements to a list is hided.
    */    
    $scope.ShowCreateListe = true;
    
    /* Tells if the alert message informing a issue with inputs from the formualar is displayed or not. */
   $scope.DisplayNewListeAlert = false;
   var NewListeAlert = false;                                
    
    
    /* Store ipnput data from the formular. */
    $scope.InputNewListe = {
        "ListeNom" : "",
        "ListeDescription" : ""
    }
    
    
    /* 
    * Submit data from formular to be checked
    * before sending them to server.
    */
    $scope.CreateListe = function() {
         
        /* Uses InputValidationService to check user's inputs. */
        var controList = ['ListeNom', 'ListeDescription'];
        var valid = InputValidationService.Validation($scope.InputNewListe, controList);    
        
        
        /* 
        * If data are in the correct format, then display
        * the formular allowing the user to add element to his list.
        */
        if (valid.ListeNom && valid.ListeDescription)
        {   
            /* remove alert */
            $scope.DisplayNewListeAlert = false;            
            
            $scope.ShowCreateListe = false;
        }
        else /* Error wrong format */
        {
            $scope.DisplayNewListeAlert = true;   
        }
    }
        
    
             
 
   
    
    
    
    
    
   /******************************************
    *      FORM ADD ELEMENT TO LIST          *
    ******************************************/
    
                                
    /*
    * Initialize the counter which will be incremented every time a row is added to the DOM.
    * The incrementation is done by the 'addrow' directive in 'directive.js'.
	* N_elements is used to display how many element there is and its also increment in 'directive.js'.
    */
	$scope.count = 1;	
	$scope.N_elements = 1;
	$scope.numberOfElement = $scope.N_elements;	
                      
    $scope.DisplayAddItemToListeAlert = false;  
    
    /*
    * Display a different message depending on the bollean value of 'DisplayAddItemToListeAlert'.
    * [true] = 'All fields must ...'
    * [false] = 'Error Server ...'
    */
    $scope.displayFormatAlert = true;
    
    
    /* Display spinner when submitting form. */
    $scope.SpinnerCreateListe = false;
    
    
    /**
    * This object is used by the 'addrow' directive which add/remove 
    * element related to rows in the DOM.
    */                                        
    $scope.inputGroup = {
        "object_1" : {
            "ListeNom": "",
            "ListeDescription": ""
        }
    };
    
    
    
    /* 
    * This will be populated if the data submited are corrects. 
    * This JSON which will contain all elements that compose 
    * a list will then be sent to the server.
    */
    var JsonToSend = {
        'title': {
            'nom' : '',
            'description' : '',
        },
        'data' : []
    };                      
                                
    
    
    
    
    
   /* Check data before submit them to server */                            
   $scope.submitNewList = function() {
       
       /* Display spinner. */
        $scope.SpinnerCreateListe = true;
       
       
       /* Run through all created elements from a list for validation. */
       NewListeAlert = false;
       for (var key in $scope.inputGroup) {
           
            if (!$scope.inputGroup.hasOwnProperty(key)) continue;
               
                /* Are data in the correct format ? */
                var controList = ['ListeNom', 'ListeDescription'];
                var valid = InputValidationService.Validation($scope.inputGroup[key], controList);
            
                /* Display alert and stop loop if wrong format. */
                if (!valid.ListeNom || !valid.ListeDescription)
                {
                    $scope.DisplayAddItemToListeAlert = true;  
                    $scope.displayFormatAlert = true;
                    NewListeAlert = true;
                    
                    $scope.SpinnerCreateListe = false;
                }
                if (NewListeAlert) { break; }
        }
       
       
       
       
       
       /* Send data to server. */
       if (!NewListeAlert)
       {
           
           /* Populate 'JsonToSend'. */
           for (var key in $scope.inputGroup) {

                if (!$scope.inputGroup.hasOwnProperty(key)) continue;

                    JsonToSend.data.push({
                        'ListeNom' : $scope.inputGroup[key].ListeNom,
                        'ListeDescription': $scope.inputGroup[key].ListeDescription
                    }); 
            }

           JsonToSend.title.nom = $scope.InputNewListe.ListeNom;
           JsonToSend.title.description = $scope.InputNewListe.ListeDescription;

           
           
           /* Build request. */
           var request = {
                method: 'POST',
                url: 'createliste',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { 
                    "listes": JSON.stringify(JsonToSend) 
                }
            }
              
            
            /* Call httpService */
            httpService.http(request)
                .then(function(response) { /* ----Server Response----- */
                    
                    /* Remove spinner. */
                    $scope.SpinnerCreateListe = false;
                
                    /* redirect to account page. */
                    if (response.redirect && !response.error) 
                    {
                        SendNotification.turnOn();
                        $location.path('/account');
                    }
                    
                    /* Redirect if user is not logged. */
                    else if (response.error) 
                    {
                        SendNotification.turnOff();
                        $location.path('/login/0');       
                    }    
                
                
                },
                function(error) { /* ----Error Server----- */ 
                
                    /* Remove spinner. */
                    $scope.SpinnerCreateListe = false;
                
                    /* Display error server alert. */
                    $scope.DisplayAddItemToListeAlert = true;  
                    $scope.displayFormatAlert = false;
                });
           
       }
       
       
   }                      
                                
                                
                                
                    
                                
                                
                                
                                
    /**
    * This function is used to know the user's session state in the server.
    * Every time the user refresh the page, the variable which needed to know 
    * if the user is logged or not is reset. Because this variable is used to display 
    * the appropriate navigation menu, a request is send to the server to know the session state.
    */
    function getAuthStatus() {
       
        var request = {
            method: 'GET',
            url: 'session'
        }
            
          
        httpService.http(request)
            .then(function(response) {
                
            /* 
            * The user must not reach the
            * 'register.html' when is logged in.
            */
            if (response.auth)
            {
                /* Change the navigation menu state and redirect user. */                           
                SendNotification.turnOn();
            }
            else 
            {
                /* Change the navigation menu state and redirect user. */                           
                SendNotification.turnOff(); 
                $location.path('/login/0'); 
            }    
        });         
    }
                  
    window.onload = getAuthStatus();
   
   
         
                                
                                
}]);
        