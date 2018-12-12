import addStyle from './addStyle';

function vizualize(element, items, activeIndex, maxItemsCount, maxItemsCountNoPaging, transitionItemsCount) {
    
    for (var i = 0; i < items.length; i++) {
        
        let classes = ['indicator__item'];
        
        if (activeIndex == i) {
            classes.push('indicator__item--active');
        }

        if (items.length > maxItemsCountNoPaging) {

            // Pārtaisām par 1based indeksu
            let visibleIndex1 = items[i].visibleIndex + 1;

            /**
             * 1based index piemērs
             *
             *  outside     kreisi   redzamie    labi      outside
             *  -1  0   ||  1  2  |  3  4  5  |  6  7  ||  8   9
             *
             */

            // Pa kreisi
            if (visibleIndex1 >= 1 && visibleIndex1 <= transitionItemsCount) {
                classes.push('indicator__item--first'+visibleIndex1);
            }

            // Redzamie
            else if (visibleIndex1 > transitionItemsCount && visibleIndex1 <= (maxItemsCount - transitionItemsCount)) {

            }

            // Pa labi
            else if (visibleIndex1 > (maxItemsCount - transitionItemsCount) && visibleIndex1 <= maxItemsCount) {
                // Pa labējais ir 1 un uz virzienā pa kreisi tas palielinās
                classes.push('indicator__item--last'+((maxItemsCount - visibleIndex1)+1));
            }

            // outside
            else {
                classes.push('indicator__item--outside');
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