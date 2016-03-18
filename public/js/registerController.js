/**
* [registerController.js]
*
*/

app.controller('RegisterCtrl', ['$scope', 'httpService', 'InputValidationService', '$location', 'SendNotification', 
                            function($scope, httpService, InputValidationService, $location, SendNotification) 
{
    

                                
                                
                                
    /* Keep track of all alert states. */                   
   $scope.registerAlert = {
       "name" : {
           "alert": false,
           "message": "name incorrect",
           "valid": false
       },
       "email" : {
           "spinner": false,
           "alert": false,
           "message": "email incorrect",
           "valid": false
       },
       "password" : {
           "alert": false,
           "message": "passwors incorrect",
           "valid": false
       },
       "confirm" : {
           "alert": false,
           "message": "",
           "valid": false
       }
   };
                                

                               
    /* Gather user inputs. */
    $scope.InputRegister = {
        "name": "",
        "email": "",
        "password": "",
        "confirm": ""
    };
    
                                
                                
    /**
    * Check data before sending them to server.
    * In case of error display alert.
    */                                
    $scope.register = function() {
        
        /* Validate user input ? */
        var controList = ['name', 'email', 'password'];
        var valid = InputValidationService.Validation($scope.InputRegister, controList);    
        
        
        /* Compose request */
        if (valid.email && valid.name && valid.password && ($scope.InputRegister.password == $scope.InputRegister.confirm))
        {
            var request = {
                method: 'POST',
                url: 'register',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { 
                    name: $scope.InputRegister.name,
                    email: $scope.InputRegister.email,
                    password: $scope.InputRegister.password 
                }
            }
            

            /* Call httpService */
            httpService.http(request)
                .then(function(response) {
                    console.log(response);
                    if (response.error)
                    {
                        $scope.registerAlert.email.alert = true;
                        $scope.registerAlert.email.message = 'Email already exist !';
                    }
                    else if (response.redirect && !response.error)
                    {   
                        
                        SendNotification.turnOff();
                        $location.path('/login/1');       
                    }
                
                },
                function(error)
                {
                    /* Error server. */
                });
        }
        else
        {
            /* Display error message. */
            
            if (!valid.email)
            {
                $scope.registerAlert.email.alert = true;
                $scope.registerAlert.email.message = 'Email format incorrect.';
            }
            
            if (!valid.name)
            {
                $scope.registerAlert.name.alert = true;
                $scope.registerAlert.name.message = 'Name format incorrect.';
            }
            
            if (!valid.password)
            {
                $scope.registerAlert.password.alert = true;
                $scope.registerAlert.password.message = 'Password format incorrect.';
                
                $scope.registerAlert.confirm.alert = true;
                $scope.registerAlert.confirm.message = 'Password format incorrect.';
            }
            
            if ($scope.InputRegister.password != $scope.InputRegister.confirm)
            {
                $scope.registerAlert.password.alert = true;
                $scope.registerAlert.password.message = 'Passwords are different.';
                
                $scope.registerAlert.confirm.alert = true;
                $scope.registerAlert.confirm.message = 'Passwords are different';
            }
        }
    }
    
     
    
    
    
    
    
    
    
    
    /* Send asynchrosous request in order to know if email is unique */                    
    var RequestFired = false;
    $scope.$watch('InputRegister.email', function(email) {
        
        
        /* Check email format. */
        var controList = ['email'];
        var valid = InputValidationService.Validation($scope.InputRegister, controList);    
        
        
        /* Build request. */
        if (valid.email && !RequestFired)
        {
            var request = {
                method: 'POST',
                url: 'controle_email',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { 
                    "email": $scope.InputRegister.email
                }
            }
            
            
            /* display spinner. */
            $scope.registerAlert.email.spinner = true;

            
            /* Send request if after response has been reveived. */
            RequestFired = true;
              
            httpService.http(request)
                .then(function(response) {
                    
                if (!response.error)
                {
                    RequestFired = false;
                    $scope.registerAlert.email.spinner = false;
                    $scope.registerAlert.email.valid = true;
                    $scope.registerAlert.email.alert = false;
                }
                else
                {
                    RequestFired = false;
                    $scope.registerAlert.email.spinner = false;
                    $scope.registerAlert.email.valid = false;
                    $scope.registerAlert.email.alert = true;
                    $scope.registerAlert.email.message = "Email is not unique !";
                }
                
                
            },
            function(error) /* Error server */
            { 
                RequestFired = false;
                $scope.registerAlert.email.spinner = false;
                $scope.registerAlert.email.alert = false;
            });
         
        }
        else  /* Wrong email format */
        {
              RequestFired = false;
              $scope.registerAlert.email.spinner = false;
              $scope.registerAlert.email.valid = false;
        }
        
    });
        
        
   
   
   
                
   
                                

                                
                                
    /* Check username format and diplay alert if it's wrong. */                   
    $scope.$watch('InputRegister.name', function(name) {
        
        if (name.length >= 3)
        {
            var controList = ['name'];
            var valid = InputValidationService.Validation($scope.InputRegister, controList);    

            if (valid.name)
            {
                $scope.registerAlert.name.valid = true;
                $scope.registerAlert.name.alert = false;
            }
            else
            {
                $scope.registerAlert.name.valid = false;
                $scope.registerAlert.name.alert = true;
                $scope.registerAlert.name.message = "Wrong username format.  (3 letters minimum, [A-z 0-9 &] only ) !";   
                
                /* remove alert after 2s. */
                setTimeout(function(){
                    $scope.registerAlert.name.alert = false;
                    $scope.$apply();
                }, 2000);
            }
        }
        else /* remove valid icon if the field is empty. */
        {
            $scope.registerAlert.name.valid = false;   
        }
    
    });
   
                
   
    
    
    
    
    
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