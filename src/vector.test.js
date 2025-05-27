import Vector from "./vector";

test('Addition', () => expect(Vector.from([1, 1]).add([1, 3])).toEqual([2, 4]));
test('Equality', () => {
    expect(Vector.from([1, 1]).isEqualTo([1, 1])).toBe(true);
})