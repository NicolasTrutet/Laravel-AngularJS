/**
* [services.js]
*
*/


/**
* Send an AJAX request.
*
*/
app.service("httpService", function($http, $q) {
 
    this.http = function(request) {
        
        var wait = $q.defer();
        
        $http(request)
        .success( function(response)
        { 
            wait.resolve(response);
        })
        .error( function (response)
        { 
            wait.reject(response);
        });                
        
        return wait.promise;
        
    };

});




/**
* The 'InputValidationService' directive is used to 
* validate user's input format.
*
*/
app.service("InputValidationService", function() {
   
   //Regex pattern collection
   var RegexBank = {
       email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
       password: /^[A-Z0-9\.&\%\$\#\@\!\/\\]{8,30}$/i,
       name: /^[A-Z0-9\&\s\é\à\è\ê\'\-]{3,30}$/i,
       ListeNom: /^[\w\W\s\é\à\è\ê\'\-]{1,30}$/i,
       ListeDescription: /^[\w\W\s\é\à\è\ê\'\-]{1,120}$/i
   };
    
   //Does it pass the test ?
   var pass = {
       email: false,
       password: false,
       name: false,
       ListeNom: false,
       ListeDescription: false
   };
    
   /* ! The input parameter has to be of type object ! */
   this.Validation = function(input, controList) 
   {
       
       for (x in controList) 
       {
           var item = controList[x];
           
           //Perform test
           var reg = new RegExp(RegexBank[item]);
           var value = input[item];
           var test = reg.test(value);
           pass[item] = test;  
       }
       
       return pass;
   }
});
   
   
   
   
   
   
   
/* 
* This service is used to send a notification message
* to another controller.
*/   
app.factory('SendNotification', function($rootScope) {
            var SharedService = {};
            
            SharedService.turnOff = function() {
                $rootScope.$broadcast('TurnOffNavBar');
            }
            
            SharedService.turnOn = function() {
                $rootScope.$broadcast('TurnOnNavBar');
            }
            
            return SharedService;
});
   
   
   
   
   
   

