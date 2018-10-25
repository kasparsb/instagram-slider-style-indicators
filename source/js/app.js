import addStyle from './addStyle';
import emptyElement from './emptyElement';
import vizualize from './vizualize';
import addItems from './addItems';
import setActive from './setActive';
import checkBoundries from './checkBoundries';

function indicator(element, count) {

    this.element = element;

    this.activeIndex;
    this.itemWidth = 8;
    this.itemsSpacing = 5;
    this.width = this.itemWidth + this.itemsSpacing;
    // Max items skaits līdz, kura nenotiek vizuālā paginēšana
    this.maxItemsCountNoPaging = 5;

    this.items = [];

    addStyle(this.element, {
        width: (7*this.width - this.itemsSpacing)+'px'
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

        this.items = addItems(count, this.width, this.maxItemsCountNoPaging);
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