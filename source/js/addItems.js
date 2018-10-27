function addItems(count, itemWidth, maxItemsCount, maxItemsCountNoPaging) {
    let items = [];

    let x = itemWidth * 2;
    if (count <= maxItemsCountNoPaging) {
        x = ((maxItemsCount * itemWidth) - (count*itemWidth))/2;
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

export default addItems;