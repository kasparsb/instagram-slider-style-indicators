function checkBoundries(x, topBoundry, bottomBoundry) {
    if (x > topBoundry) {
        x = topBoundry;
    }
    if (x < bottomBoundry) {
        x = bottomBoundry;
    }

    return x;
}

export default checkBoundries;