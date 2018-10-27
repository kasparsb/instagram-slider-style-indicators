import addStyle from './addStyle';
import emptyElement from './emptyElement';
import vizualize from './vizualize';
import addItems from './addItems';
import setActive from './setActive';
import checkBoundries from './checkBoundries';

function gv(obj, name, dv) {
    if (obj && typeof obj[name] != 'undefined') {
        return obj[name]
    }
    return dv
}

function indicator(element, count, conf) {

    this.element = element;

    this.activeIndex;
    this.itemWidth = gv(conf, 'itemWidth', 8);
    this.itemsSpacing = gv(conf, 'itemsSpacing', 5);
    this.width = this.itemWidth + this.itemsSpacing;
    
    // Kopējais items skaits ar pārejas elementiem
    this.maxItemsCount = 7;
    // Lapotā stilā pārejas items skaits
    this.transitionItemsCount = 2;

    // Max items skaits līdz, kura nenotiek vizuālā paginēšana
    this.maxItemsCountNoPaging = this.maxItemsCount - this.transitionItemsCount;
    


    this.items = [];

    addStyle(this.element, {
        width: (this.maxItemsCount * this.width - this.itemsSpacing)+'px'
    })

    this.setItems(count);
}

indicator.prototype = {
    vizualize() {
        vizualize(this.element, this.items, this.activeIndex, this.maxItemsCountNoPaging)
    },

    setItems(count) {
        emptyElement(this.element);

        this.activeIndex = undefined;

        this.items = addItems(count, this.width, this.maxItemsCount, this.maxItemsCountNoPaging);
        this.setActive(0)
    },

    validateIndex(index) {
        return checkBoundries(index, this.items.length-1, 0);
    },

    setActive(index) {
        this.activeIndex = setActive(this.validateIndex(index), this.activeIndex, this.items, this.width, this.maxItemsCountNoPaging);
        this.vizualize();
    },

    next() {
        this.setActive(this.activeIndex + 1);
    },

    prev() {
        this.setActive(this.activeIndex - 1);
    }
}

module.exports = indicator;