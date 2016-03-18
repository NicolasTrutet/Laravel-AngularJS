<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<html ng-app="whishListApp">

<head>
    <title>Whishlist</title>
    <link rel="icon" href="{{ URL::asset('favicon.ico') }}" type="image/x-icon">
    <link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Pacifico' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('bower_components/bootstrap/dist/css/bootstrap.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('bower_components/components-font-awesome/css/font-awesome.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('css/backbone.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('css/signin.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('css/signup.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('css/account.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('css/profile.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('css/newliste.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('css/results.css') }}">
</head>

<body ng-controller="MainCtrl">
    
    
    
    
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" 
                        data-toggle="collapse" data-target="#smallScreen-collapse-1">

                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <img src="{{ URL::asset('resources/images/gift64.png') }}">
                <a class="navbar-brand" href="#results">WhishList</a>
                
            </div>

            <div class="collapse navbar-collapse" id="smallScreen-collapse-1">
                 
                <div class="searchbar">
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="find friends" ng-model="searchInput">
                      <span class="input-group-btn"> 
                        <button class="btn btn-primary" type="button">search</button>
                      </span>
                    </div>
                    
                    <div class="searchbar-result">
                        <ul class="list-group" ng-show="showSearchResult" >
                          <li ng-repeat="result in Results | limitTo:limit"
                              ><a href="#results/[[ result.user_id ]]">[[ result.username ]]</a>
                          </li>
                            
                          
                        </ul>
                    </div>
                </div>
                
                <ul class="nav navbar-nav navbar-right">    
                     
                     <li ng-show="showNavLogged"><a class="btn btn-primary btn" 
                    	href="#login/0" role="button">Sigin In</a></li>
					

					
			        <li ng-show="!showNavLogged">
			            <div class="btn-group">
			                  <i class="fa fa-user fa-2x" type="button" 
			                     class="btn btn-default dropdown-toggle" 
			                     data-toggle="dropdown" aria-haspopup="true" 
			                     aria-expanded="false"></i>
			              
			              <ul class="dropdown-menu">
			                  <li><a href="#editprofile">Edit Profile</a></li>
			                  <li><a href="#account">Account</a></li>
			                  <li role="separator" class="divider"></li>
			                  <li><a ng-click="logout()">Logout</a></li>
			              </ul>
			            </div>
			        </li>                     
                </ul>
            </div>
        </div>
    </nav>
    
    
    
    
    
    <div class="wrapper">
        <ng-view></ng-view>
    </div>
    
    
    
    
    
    
    <footer>
        <div class="container-fluid">
            <div class="social-group">
                <ul>
                    <li><i class="fa fa-facebook fa-2x"></i></li>
                    <li><i class="fa fa-twitter fa-2x"></i></li>
                    <li><i class="fa fa-google fa-2x"></i></li>
                </ul>    
            </div>
            <a href="about">about us</a>
            <a href="terms">Terms of Use</a>
        </div>
    </footer>
        
    
    
    
    
    
    <script src="{{ URL::asset('bower_components/jquery/dist/jquery.min.js') }}"></script>
    <script src="{{ URL::asset('bower_components/bootstrap/dist/js/bootstrap.min.js') }}"></script>
    <script src="{{ URL::asset('bower_components/angular/angular.min.js') }}"></script>
    <script src="{{ URL::asset('bower_components/angular-route/angular-route.min.js') }}"></script>
    
    <script src="{{ URL::asset('js/module.js') }}"></script>
    <script src="{{ URL::asset('js/config.js') }}"></script>
    <script src="{{ URL::asset('js/services.js') }}"></script>
    <script src="{{ URL::asset('js/directives.js') }}"></script>
    <script src="{{ URL::asset('js/controller.js') }}"></script>
    <script src="{{ URL::asset('js/registerController.js') }}"></script>
    <script src="{{ URL::asset('js/loginController.js') }}"></script>
    <script src="{{ URL::asset('js/newlisteController.js') }}"></script>
    <script src="{{ URL::asset('js/editlisteController.js') }}"></script>
    <script src="{{ URL::asset('js/accountController.js') }}"></script>
    <script src="{{ URL::asset('js/resultsController.js') }}"></script>
    
    
    
</body>        
</html>