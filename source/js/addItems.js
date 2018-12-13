function addItems(count, itemWidth, maxItemsCount, maxItemsCountNoPaging, transitionItemsCount) {
    let items = [];

    /**
     * x pozīcija sākas nevis no pašas kreisās puses, bet no 
     * transitionItemsCount * itemWidth
     * Tas ir, atstāja pa kreisi no pirmā elementa vietu 2 itemiem
     * Tie ir transition items, kuri ir mazāk, rāda it kā pāreju
     */
    let x = transitionItemsCount * itemWidth;

    /**
     * Ja vēlamais items skaits ir mazāks par to skaitu,
     * pie kura nevajag rādīt transitions items
     * Visus items šādā gadījumā centrējam
     * maxItemsCount * itemWidth - kopējais max platums
     * count * itemWidth - reālais platums
     */
    if (count <= maxItemsCountNoPaging) {
        x = ((maxItemsCount * itemWidth) - (count * itemWidth))/2;
    }
    
    for (var i = 0; i < count; i++) {

        items.push({
            x: x,
            visibleIndex: x/itemWidth
        })

        x += itemWidth;
    }

    return items;
}

module.exports = addItems;