function isVisibleIndex(index) {
    return index >= 2 && index <= 4;
}

function setActive(index, currentIndex, items, itemWidth, maxItemsCountNoPaging) {
    if (typeof currentIndex != 'undefined') {
        
        if (items.length > maxItemsCountNoPaging) {
            let currentVisibleIndex = items[currentIndex].visibleIndex;
            let newVisibleIndex = items[index].visibleIndex;
            
            if (isVisibleIndex(currentVisibleIndex) && isVisibleIndex(newVisibleIndex)) {

            }
            else {
                // Atrodam esošā aktīvā item x
                let currentX = items[index].x;
                let newX = index > currentIndex ? 4*itemWidth : 2*itemWidth;
                
                // Ja notiek secīga pārslēgšanās, tad netaisām piekoriģēšanu
                if (Math.abs(currentIndex-index) > 2) {
                    // Daram tā, lai pirmie 3 elementi būtu bez nobīdes
                    if (index >= 0 && index < 3) {
                        newX = (2 + index)*itemWidth
                    }
                    if (index >= items.length-3 && index < items.length) {
                        newX = (maxItemsCountNoPaging - (items.length - index))*itemWidth;
                    }    
                }
                
                let delta = newX - currentX;
                
                for (let i = 0; i < items.length; i++) {
                    items[i].x = items[i].x + delta;
                    items[i].visibleIndex = items[i].x / itemWidth;
                }
            }
        }
    }
    
    return index;
}

export default setActive