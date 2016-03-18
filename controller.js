/**
* [controller.js]
*
*/

app.controller('MainCtrl', ['$scope', 'httpService', 'InputValidationService', 'SendNotification', '$rootScope', '$location',
                            function($scope, httpService, InputValidationService, SendNotification, $rootScope, $location) 
{
    
    
    
    
    /******************************************
    *             NAVIGATION MENU             *
    *******************************************/
    
    
    /**
    * Navigation bar state.
    * [signin] when 'true'.
    * [account menu] when 'false'.
    *
    */
    $scope.showNavLogged = true;
    
    
    /* Is the user connected ? */
    $rootScope.IsUserAuth = false;
    
    
    
    /* Listen for notification in order to change the navigation bar state. */
    $scope.$on('TurnOffNavBar', function() {
        $rootScope.IsUserAuth = false;
        $scope.showNavLogged = true;
    });
               
    
    $scope.$on('TurnOnNavBar', function() {
        $rootScope.IsUserAuth = true;
        $scope.showNavLogged = false;
    });
    
    
    
             
                                
    
    
    
    /* Logout user and redirect him to login page. */
    $scope.logout = function() {
         
        /* Build request. */
            var request = {
                method: 'GET',
                url: 'logout'
            }
             
            
            /* Call httpService */
            httpService.http(request)
                .then(function(response) { /* ----Server response----- */
                    
                    /* redirect to account page. */
                    if (response.redirect)
                    {
                        /* Remove dropdown button from navigation bar */
                        
                        /* Send a notification through this service. */
                        SendNotification.turnOff(); 
                        
                        /* Redirect user. */
                        $location.path('/login/0');
                    }
                    
                },
                function(error) { /* ----Error Server----- */ });
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /******************************************
    *                 SEARCH BAR              *
    *******************************************/
    
    
    
    /* Display result from search. */
    $scope.showSearchResult = false;
    
    
    /* Set the number of result displayed in the dropdown search bar. */
    $scope.limit = 10;
    

    /* Simulate a search results */
    $scope.Results;
    
        
    /* Remove result by typing on the escape key. */
    $(document).keyup(function(e) {
         /* ESC ascii code '27' */
         if (e.keyCode == 27) {     
             $scope.showSearchResult = false;
             $scope.$apply();
        }
    });
    
    /* Remove results from search bar by clicking anywhere outside results. */
    $(window).click(function() {
        $scope.showSearchResult = false;
        $scope.$apply();
    });
    
    
    
    /* 
    * Make an asynchronous request 
    * every time the input is changing.
    */
    $scope.searchInput = "";
    $scope.$watch('searchInput', function(newVal) {
         
        /* Send a request if one charaters has been entered. */
        if (newVal.length != 0)
        {
            
            /* Build request */
             var request = {
                    method: 'GET',
                    url: 'search/' + newVal
            }
            
         
            /* Call httpService */
            httpService.http(request) 
                .then(function(response) { /* -----Server Response----- */
                    
                    /* Populate the result variable. */
                    if (response.data.results != null)
                    {
                        if (response.data.results.length != 0)
                        {
                            $scope.Results = response.data.results;
                            $scope.showSearchResult = true;
                        }
                    }
                
                },
                function(error) { /* -----Error Server----- */ });
            
        }
        else /* remove result if no seach bar is empty. */
        {
            $scope.showSearchResult = false;
        }
        

    });

    
        
    
    
    
    
    
    
    
    
    
    
}]);