/**
 * Nosakām vai padotais visibleIndex ir redzamajā daļā
 * Redzams tas ir tad, kad tas nav transitionItemsCountā
 * maxItemsCount un transitionItemsCount
 * maxItemsCount veidojas šādi: maxItemsCount = transitionItemsCount + atlikušie + transitionItemsCount
 * index jābūt atlikušie daļā, lai tas būtu visible
 * 
 * 1 2   3 4 5   6 7 - index 1based
 * 0 1 | 2 3 4 | 5 6 - index 0based
 * -----------------
 * kopā 7 - maxItemsCount
 * abās pusēs 2 - transitionItemsCount
 * 0based index jābūt 2,3,4 tad tas būs vsible
 * 1based index jābūt 3,4,5 tad tas būs vsible
 */
function isVisibleIndex(index, maxItemsCount, transitionItemsCount) {
    // Pārejam no zero base uz 1 based
    index = index + 1;

    return index > transitionItemsCount && index <= (maxItemsCount-transitionItemsCount);
}

function setActive(index, currentIndex, items, itemWidth, maxItemsCount, maxItemsCountNoPaging, transitionItemsCount) {
    if (typeof currentIndex == 'undefined') {
        return index;
    }
    // Items nav tik daudz, lai būt vajadzīga items pārbīdīšana
    if (items.length <= maxItemsCountNoPaging) {
        return index;
    }
    // Ja jaunais visibleIndex un esošais visibleIndex ir redzamajā daļā
    if (isVisibleIndex(items[currentIndex].visibleIndex, maxItemsCount, transitionItemsCount) && isVisibleIndex(items[index].visibleIndex, maxItemsCount, transitionItemsCount)) {
        return index;
    }

    /**
     * Šeit nosakām vai jaunā x pozīcija būs redzamo elementu sākumā vai beigās
     *     x1    x2
     * 0 1 | 2 3 4 | 5 6
     *
     * Ja index ir lielāks par currentIndex, tad tam jābūt x2 pozīcijā
     * pretējā gadījumā x1
     *
     * Ja mēs esam nonākuši līdz šejienei, tad index atrodas ārpuse redzamās daļas
     * tāpēc te ir jāizlemj, kur to nolikt, vai nu redzamās daļas sākumā vai beigās
     * x1 - tā būt redzamās daļas sākuma
     * x2 - būtu redzamās daļas beigas
     */
    var newX;
    if (index > currentIndex) {
        newX = itemWidth * (maxItemsCount - transitionItemsCount - 1)
    }
    else {
        newX = itemWidth * transitionItemsCount
    }

    // Starpība starp jaunā index x pozīciju un pozīciju, kur tam ir jābūt
    var delta = newX - items[index].x;
    
    for (var i = 0; i < items.length; i++) {
        items[i].x = items[i].x + delta;
        items[i].visibleIndex = items[i].x / itemWidth;
    }
    
    return index;
}

module.exports = setActive