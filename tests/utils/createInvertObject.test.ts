import {createInvertObject, createInvertObjectArray} from '../../src/utils';

describe('createInvertObject', () => {
    it('should do the correct math', () => {
        const first: ClientRect = {
            bottom: 150,
            height: 150,
            left: 0,
            right: 200,
            top: 0,
            width: 200,
        };
        const last = first;

        const invert  = createInvertObject(first, last);

        expect(invert).toEqual({
            sx: 1,
            sy: 1,
            x: 0,
            y: 0,
        });
    });
});

describe('createInvertObjectArray', () => {
    it('should return the correct array', () => {
        const first: ClientRect[] = [{
            bottom: 150,
            height: 150,
            left: 0,
            right: 200,
            top: 0,
            width: 200,
        }];
        const last = first;

        const invert  = createInvertObjectArray(first, last);

        expect(invert.length).toEqual(1);
        expect(invert[0]).toEqual({
            sx: 1,
            sy: 1,
            x: 0,
            y: 0,
        });
    });
});
