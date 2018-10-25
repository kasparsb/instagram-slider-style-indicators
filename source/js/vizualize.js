import addStyle from './addStyle';

function vizualize(element, items, activeIndex, maxItemsCountNoPaging) {
    var classes = [];

    for (var i = 0; i < items.length; i++) {
        
        classes = ['indicator__item'];
        
        if (activeIndex == i) {
            classes.push('indicator__item--active');
        }

        if (items.length > maxItemsCountNoPaging) {
            switch (items[i].visibleIndex) {
                case 7-1:
                    classes.push('indicator__item--last1');
                    break;
                case 7-2:
                    classes.push('indicator__item--last2');
                    break;
                case 0:
                    classes.push('indicator__item--first1');
                    break;
                case 1:
                    classes.push('indicator__item--first2');
                    break;
                case 2:
                case 3:
                case 4:
                    break;
                default:
                    classes.push('indicator__item--outside');
                    break;
            }
        }
        
        if (typeof items[i].el == 'undefined') {
            items[i].el = document.createElement('a');
            element.appendChild(items[i].el);
        }

        addStyle(items[i].el, {
            transform: 'translate3d('+items[i].x+'px,0,0)'
        })

        items[i].el.className = classes.join(' ');
    }
}

export default vizualize