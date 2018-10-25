function emptyElement(el) {
    while(el.firstChild) {
        el.removeChild(el.firstChild);
    }

    return el;
}

export default emptyElement;