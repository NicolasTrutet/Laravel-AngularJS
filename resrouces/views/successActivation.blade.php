
<!DOCTYPE html>

<html>
<head>
    <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
    
    <style>
       body {
                height: 100%;
                background-color: white;
        }
        
        a {
            text-decoration: none;
            color: hotpink;
            font-weight: 700;
            font-family: 'Lato';
        }
        
        .message {
            margin: 20px;
            margin-top: 150px;
            text-align: center;
        }
        
        p {
            font-family: 'Lato';
            font-weight: 700;
            color: black;
            font-size: 100%;
        }
        
        .message .container h1,h3,h2 {
            color: #2f2f2f;
            font-weight: 700;
            font-family: 'Lato';
            
        }
        
        
    </style>    
</head>
<body>
    
    <div class="message">
        <div class="container">
            <img src="{{ URL::asset('resources/images/gift.png') }}">
            <h1>Activation Succeed.</h1>

            <br/>    
        
            <a href="http://localhost/~nicolas/whish_prod/laravel/public/#/login/0">Sign In to your account.</a>
            
        </div>
    </div>
    
</body>

 