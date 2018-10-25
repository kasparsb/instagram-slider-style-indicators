(function($) {

    var $el = $('.indicators');

    var activeIndex;
    var itemWidth = 8;
    var padding = 5;
    var width = itemWidth + padding;
    // Max items skaits līdz, kura nenotiek vizuālā paginēšana
    var maxItemsCountNoPaging = 5;

    $el.css('width', (7*width-padding))

    var items = [];

    function vizualize($el, items, activeIndex) {
        var classes = [];

        //$el.html('');
        for (var i = 0; i < items.length; i++) {
            
            classes = ['indicators__item'];
            
            if (activeIndex == i) {
                classes.push('indicators__item--active');
            }

            if (items.length > maxItemsCountNoPaging) {
                switch (items[i].visibleIndex) {
                    case 7-1:
                        classes.push('indicators__item--last1');
                        break;
                    case 7-2:
                        classes.push('indicators__item--last2');
                        break;
                    case 0:
                        classes.push('indicators__item--first1');
                        break;
                    case 1:
                        classes.push('indicators__item--first2');
                        break;
                    case 2:
                    case 3:
                    case 4:
                        break;
                    default:
                        classes.push('indicators__item--outside');
                        break;
                }
            }
            
            if (typeof items[i].$el == 'undefined') {
                items[i].$el = $('<a />').appendTo($el);
            }

            items[i].$el
                .css('transform', 'translate3d('+items[i].x+'px,0,0)')
                .attr('class', classes.join(' '))
            
        }
    }

    function addItems(count) {
        items = [];

        var x = width * 2;
        if (count <= maxItemsCountNoPaging) {
            x = ((7*width) - (count*width))/2;
        }
        
        for (var i = 0; i < count; i++) {

            items.push({
                x: x,
                visibleIndex: x/width
            })

            x += width;
        }
    }

    function move(offset) {
        for (var i = 0; i < items.length; i++) {
            items[i].x = items[i].x + offset;
            items[i].visibleIndex = items[i].x/width;
        }
    }

    function moveLeft() {
        move(-width);
    }

    function moveRight() {
        move(width);
    }

    function isVisibleIndex(index) {
        return index >= 2 && index <= 4;
    }

    function setActive(index) {
        if (typeof activeIndex != 'undefined') {
            
            if (items.length > maxItemsCountNoPaging) {
                var currentVisibleIndex = items[activeIndex].visibleIndex;
                var newVisibleIndex = items[index].visibleIndex;
                
                if (isVisibleIndex(currentVisibleIndex) && isVisibleIndex(newVisibleIndex)) {

                }
                else {
                    // Atrodam esošā aktīvā item x
                    var currentX = items[index].x;
                    var newX = index > activeIndex ? 4*width : 2*width;
                    
                    // Ja notiek secīga pārslēgšanās, tad netaisām piekoriģēšanu
                    if (Math.abs(activeIndex-index) > 2) {
                        // Daram tā, lai pirmie 3 elementi būtu bez nobīdes
                        if (index >= 0 && index < 3) {
                            newX = (2 + index)*10
                        }
                        if (index >= items.length-3 && index < items.length) {
                            newX = (5 - (items.length - index))*10;
                        }    
                    }
                    
                    var delta = newX - currentX;
                    
                    for (var i = 0; i < items.length; i++) {
                        items[i].x = items[i].x + delta;
                        items[i].visibleIndex = items[i].x/width;
                    }
                }
            }
        }
        
        activeIndex = index;

    }

    addItems($('.swipe').find('.swipe__item').length);
    setActive(0);
    vizualize($el, items, activeIndex)


    window.setActive = function(index) {
        setActive(index);
        vizualize($el, items, activeIndex)
    }
    window.resetItems = function(count) {
        $el.html('');
        activeIndex = undefined;
        addItems(count);
        setActive(0);
        vizualize($el, items, activeIndex)
    }
    window.moveLeft = function() {
        moveLeft();
        vizualize($el, items, activeIndex)
    }
    window.moveRight = function() {
        moveRight();
        vizualize($el, items, activeIndex)
    }
    window.next = function() {
        var newIndex = activeIndex + 1;
        if (newIndex >= items.length) {
            newIndex = items.length - 1;
        }

        setActive(newIndex);
        vizualize($el, items, activeIndex)
    }
    window.prev = function() {
        newIndex = activeIndex - 1;
        if (newIndex < 0) {
            newIndex = 0;
        }

        setActive(newIndex);
        vizualize($el, items, activeIndex)
    }




    var api = new webit.infinitySwipe($('.swipe').get(0), $('.swipe').find('.swipe__item'));

    api.onChange(function(){
        console.log('changed', api.getCurrent().index % items.length);
        setActive(api.getCurrent().index % items.length);
        vizualize($el, items, activeIndex)
    })

})(jQuery)