<?php
// Read package version so we can include built js and css
$pkg = json_decode(file_get_contents('package.json'));
$version = $pkg->version;
?><!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0">
    <title>Instagram style indicators</title>
    <link rel="stylesheet" href="build/app.min-<?php echo $version ?>.css" type='text/css' media='all' />

    <style>
    .indicators {
        position: relative;
        height: 8px;
        overflow: hidden;

        margin: 10px auto 0;
    }
    .indicators--debug {
        border: 1px solid blue;
        overflow: visible;
    }

    .indicators__item {
        display: block;
        width: 8px;
        height: 8px;
        position: absolute;
        top: 0;
        left: 0;
    }
    .indicators__item:after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        background: silver;
        border-radius: 50%;
        overflow: hidden;
        transform-origin: center;
    }

    .indicators__item,
    .indicators__item:after {
        transition: transform 300ms;
    }

    .indicators__item--active:after {
        background: #3480e6;
    }
    .indicators__item--last1:after,
    .indicators__item--first1:after,
    .indicators__item--outside:after {
        transform: scale(0.4)
    }
    .indicators__item--last2:after,
    .indicators__item--first2:after {
        transform: scale(0.65)
    }


    .swipe {
        max-width: 500px;
        height: 280px;
        position: relative;
        box-sizing: border-box;

        margin: 0 auto;

        overflow: hidden;
    }

    .swipe__item {
        position: absolute;

        box-sizing: border-box;
        background-size: cover;
        background-position: center;

        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    </style>
</head>
<body>
    <div style="margin:10px auto 0;;padding:4px;">
        
        <div class="swipe">
            <div class="swipe__item" style="background-image:url(https://c1.staticflickr.com/3/2859/32924770393_384a76c13e.jpg)"></div>
            <div class="swipe__item" style="background-image:url(https://c1.staticflickr.com/3/2901/33605527231_b6c94cac82.jpg)"></div>
            <div class="swipe__item" style="background-image:url(https://c1.staticflickr.com/3/2832/32919038623_2c6eb8c023.jpg)"></div>
            <div class="swipe__item" style="background-image:url(https://c1.staticflickr.com/3/2877/33613662191_09caa3f6a3.jpg)"></div>
            <div class="swipe__item" style="background-image:url(https://c1.staticflickr.com/3/2822/32918826513_3bc7b17908.jpg)"></div>
            <div class="swipe__item" style="background-image:url(https://c2.staticflickr.com/4/3934/33582408212_5b9d226183.jpg)"></div>
        </div>

            
            <!--
            
            <div class="swipe__item" style="background-image:url(https://c2.staticflickr.com/4/3669/33737824555_2d8f446c36.jpg)"></div-->
    

        <div class="indicators indicators--debug--">
            
        </div>
    </div>
    <script src="../build/infty.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>


    <script src="build/app.min-<?php echo $version ?>.js"></script>
</body>
</html>