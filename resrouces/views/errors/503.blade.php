<!DOCTYPE html>
<html>
    <head>
        <title>Error 503.</title>

        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
    
        <style>
            html, body {
                height: 100%;
                background: #f85032;
background: -moz-radial-gradient(center, ellipse cover, #f85032 0%, #f16f5c 0%, #f6290c 51%, #f02f17 71%, #ff5a63 100%);
background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, #f85032), color-stop(0%, #f16f5c), color-stop(51%, #f6290c), color-stop(71%, #f02f17), color-stop(100%, #ff5a63));
background: -webkit-radial-gradient(center, ellipse cover, #f85032 0%, #f16f5c 0%, #f6290c 51%, #f02f17 71%, #ff5a63 100%);
background: -o-radial-gradient(center, ellipse cover, #f85032 0%, #f16f5c 0%, #f6290c 51%, #f02f17 71%, #ff5a63 100%);
background: -ms-radial-gradient(center, ellipse cover, #f85032 0%, #f16f5c 0%, #f6290c 51%, #f02f17 71%, #ff5a63 100%);
background: radial-gradient(ellipse at center, #f85032 0%, #f16f5c 0%, #f6290c 51%, #f02f17 71%, #ff5a63 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f85032', endColorstr='#ff5a63', GradientType=1 );
            }

            body {
                margin: 0;
                padding: 0;
                width: 100%;
                color: #B0BEC5;
                display: table;
                font-weight: 700;
                font-family: 'Lato';
            }

            .container {
                text-align: center;
                display: table-cell;
                vertical-align: middle;
            }

            .content {
                text-align: center;
                display: inline-block;
            }

            .title {
                font-size: 72px;
                margin-bottom: 40px;
                color: #e6e6e6;
            }
            
            .image {
                width: 70px;
                height: auto;
                margin-right: 30px;
            }
            
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <div class="title"><img class="image" src="{{ URL::asset('resources/images/sad.png') }}">Error 503.</div>
                <div class="title">Sorry the service is unavailable</div>
                
                
            </div>
        </div>
    </body>
</html>
