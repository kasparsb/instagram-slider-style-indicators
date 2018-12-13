var addStyle = require('./addStyle');
var emptyElement = require('./emptyElement');
var vizualize = require('./vizualize');
var addItems = require('./addItems');
var setActive = require('./setActive');
var checkBoundries = require('./checkBoundries');

/**
 * Get property from object by property name.
 * If property not defined return default value
 */
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
    this.maxItemsCount = gv(conf, 'maxItemsCount', 7);
    // Lapotā stilā pārejas items skaits
    this.transitionItemsCount = gv(conf, 'transitionItemsCount', 2);

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
        vizualize(this.element, this.items, this.activeIndex, this.maxItemsCount, this.maxItemsCountNoPaging, this.transitionItemsCount)
    },

    setItems(count) {
        emptyElement(this.element);

        this.activeIndex = undefined;

        this.items = addItems(count, this.width, this.maxItemsCount, this.maxItemsCountNoPaging, this.transitionItemsCount);
        this.setActive(0)
    },

    validateIndex(index) {
        return checkBoundries(index, this.items.length-1, 0);
    },

    setActive(index) {
        index = parseInt(index, 10);
        this.activeIndex = setActive(this.validateIndex(index), this.activeIndex, this.items, this.width, this.maxItemsCount, this.maxItemsCountNoPaging, this.transitionItemsCount);
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