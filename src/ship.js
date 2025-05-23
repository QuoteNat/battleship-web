class Ship {
    hits = 0;

    constructor(length) {
        this.length = length;
    }
    hit() {
        this.hits += 1;
    }
}

export default Ship;