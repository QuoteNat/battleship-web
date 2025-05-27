/**
 * Helper class for doing vector math with arrays.
 * Modified from https://stackoverflow.com/a/67804085
 */
export default class Vector extends Array {
    /**
     * Adds a vector to another vector
     * @param {Array} vector Vector to be added.
     * @returns The sum of the two vectors.
     */
    add(vector) {
      return this.map((left, index) => left + vector[index]);
    }

    isEqualTo(vector) {
        if (this.length != vector.length) return false;
        this.forEach((value, index) => {
            if (value !== vector[index]) return false;
        })
        return true;
    }
  }