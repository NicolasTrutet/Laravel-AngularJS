
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
            
            <h1>Activate your account</h1>
            
            <br/>    
            
            <h2>Welcome {{ $user }}</h2>

            <br/>    

            <p>Lorem ipsum dolor sit amet, augue altera eum ea, mei in clita epicuri, no esse scripta facilisi usu. Civibus efficiendi eum in, in eam illud simul bonorum, quo mollis volumus te. Vix malorum omittam efficiantur no, ei paulo nullam eripuit duo, et minim expetendis signiferumque has. Cu percipit sadipscing duo, debet euripidis vix at. Cum et nulla primis quaeque. Ea vel tota consul tractatos, aperiri deleniti sit ad.</p>
            
            
            
            <p>Delectus liberavisse sit ut, cu aeque fabellas oportere mei. Id nam albucius assentior. Mel idque semper temporibus id, qui augue essent tibique ne. His paulo postea at, congue vituperatoribus est eu.</p>
            
            <p>Usu no mediocrem assueverit scripserit, mel at brute vulputate vituperatoribus. Vim falli menandri ex, dicunt invidunt recusabo ut nec. Vix ut ignota atomorum. Scripta inermis ex nec, ad ullum postulant cum. Eam dicta quaeque eu, no mazim putent vis. Ullum inermis propriae in quo, ea utroque minimum vim, mei at ipsum platonem recteque.</p>
            
            <br/>
            
            <h2>Click <a href="{{ $link }}">here</a> to activate your account.</h2>
            
            
        </div>
    </div>
    
</body>

