/**
* [config.js]
*
*/



app.config(['$routeProvider', '$locationProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/welcome.html',
                
            })   
            .when('/login/:id', {
                templateUrl: 'partials/login.html',
                
            })    
            .when('/register', {
                templateUrl: 'partials/register.html',
                
            })    
            .when('/account', {
                templateUrl: 'partials/account.html',
                
            })    
            .when('/editprofile', {
                templateUrl: 'partials/editprofile.html',
                
            })  
            .when('/editliste/:id', {
                templateUrl: 'partials/editlist.html',
                
            })   
            .when('/newliste', {
                templateUrl: 'partials/newlist.html',  
            })
            .when('/results/:id', {
                templateUrl: 'partials/results.html',
                
            })
            
      
            .otherwise({
            redirectTo: '/'
            });        
}])