/**
* [loginController.js]
*
*/

app.controller('LoginCtrl', ['$scope', 'httpService', 'InputValidationService', '$location', '$rootScope', '$routeParams', 'SendNotification',
                            function($scope, httpService, InputValidationService, $location, $rootScope, $routeParams, SendNotification) {
    

                  
   /* Tells if the spinner and alert message are displayed */                     
   $scope.LoginAlert = {
       "alert" : {
           "show": false,
           "message": "",
       },
       "button" : {
           "spinner": false
       }
   };
                                       
    /* Control the display of the banner that tells the user to activate its account. */
    $scope.confirmAccount = ($routeParams.id == 1) ? true : false;
    
                                
    /**
    * Login process.
    * Gather user inputs and process validation 
    * before authentification.
    */
    $scope.InputLogin = {
        "email": "",
        "password": ""
    };
                         
    
                                
    /**
    * Control all data from the formular before posting the request.
    * Alerts are display in case of errors.
    */                                
    $scope.login = function() {
        
        /* Uses InputValidationService to check user's inputs. */
        var controList = ['email', 'password'];
        var valid = InputValidationService.Validation($scope.InputLogin, controList);    
        
        
        /* Compose the request and send it to server. */
        if (valid.email && valid.password)
        {
            var request = {
                method: 'POST',
                url: 'login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { 
                    email: $scope.InputLogin.email,
                    password: $scope.InputLogin.password 
                }
            }
            
            
            /* Display loading spinner in the login button. */
            $scope.LoginAlert.button.spinner = true;


            /* Call httpService */
            httpService.http(request)
                .then(function(response) {
                
                    /* Remove spinner from the login button. */
                    $scope.LoginAlert.button.spinner = false;

                    if (response.error)
                    {
                        $scope.LoginAlert.alert.show = true;
                        $scope.LoginAlert.alert.message = response.error;

                        /* Remove the alert message after 4s. */
                        setTimeout(function(){
                            $scope.LoginAlert.alert.show = false;
                            $scope.$apply();
                        },4000);
                    }
                    
                    if (response.redirect && !response.error)
                    {
                        /* Change navigation bar state and redirect user. */                           
                        SendNotification.turnOn(); 
                        $location.path('/account');
                    }
                
                },
                function(error) { /* Error server. */ 
                    
                    $scope.LoginAlert.button.spinner = false;
                    
                    /* Display errors alerts. */
                    $scope.LoginAlert.alert.show = true;
                    $scope.LoginAlert.alert.message = "Erreur serveur."

                    /* Remove alerts after 4s. */
                    setTimeout(function(){
                        $scope.LoginAlert.alert.show = false;
                        $scope.$apply();
                    },2000);
                });
        }
        else
        {
            /* Display alerts messages. */
            $scope.LoginAlert.alert.show = true;
            $scope.LoginAlert.alert.message = "Format email et/ou mot de passe incorrecte."
            
            /* Remove them after 2s. */
            setTimeout(function(){
                $scope.LoginAlert.alert.show = false;
                $scope.$apply();
            },2000);
        }

    }//
                            
                            
                            
      
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
                $location.path('/account'); 
            }
            else 
            {
                /* Change the navigation menu state and redirect user. */                           
                SendNotification.turnOff(); 
            }    
        });         
    }
                  
    window.onload = getAuthStatus();
           
                            
                            
                            
                            
}]);