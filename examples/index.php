<?php
// Read package version so we can include built js and css
$pkg = json_decode(file_get_contents('../package.json'));
$version = $pkg->version;
?><!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0">
    <title>Instagram style indicators</title>
    <link rel="stylesheet" href="../build/app.min-<?php echo $version ?>.css" type='text/css' media='all' />
    <style>
    .indicator {
        overflow: hidden;
        background: #ffe5ea;
    }
    </style>
</head>
<body>
    <div style="margin:40px auto 0;;padding:4px;">
        <div style="margin:0 auto" class="indicator"></div>

        <div style="margin-top:20px">
            <button id="prev">Prev</button>
            <button id="next">Next</button>
            set active
            <select id="active">
                <option selected>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>50</option>
                <option>99</option>
            </select>
            items count
            <select id="itemscount">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option selected>20</option>
                <option>100</option>
            </select>
        </div>
    </div>

    <script src="../build/app.min-<?php echo $version ?>.js"></script>
    <script>

        let api = new webit.instagramSliderStyleIndicator.default(document.querySelector('.indicator'), 20, {
            transitionItemsCount: 1,
            maxItemsCount: 4
        });

        document.getElementById('prev').addEventListener('click', function(){
            api.prev()
        })

        document.getElementById('next').addEventListener('click', function(){
            api.next()
        })

        document.getElementById('active').addEventListener('change', function(ev){
            api.setActive(ev.target.value)
        })

        document.getElementById('itemscount').addEventListener('change', function(ev){
            api.setItems(ev.target.value)
        })

    </script>
</body>
</html>