import compareArray from '../../src/utils/compareArray';

describe('compareArray', () => {
    it('should return false if arrays are different', () => {
        const x = [1, 3, 5, 7];
        const y = [2, 4, 6, 8];

        expect(compareArray(x, y)).toEqual(false);
    });

    it('should return false if arrays are of different length', () => {
        const x: any[] = [];
        const y = [1, 2];

        expect(compareArray(x, y)).toEqual(false);
    });

    it('should return true if arrays have same values', () => {
        const x = [1, 2, 3, 4];
        const y = [1, 2, 3, 4];

        expect(compareArray(x, y)).toEqual(true);
    });
});
