import {ifMarkedThenMeasure, markAndMeasure} from '../../../src/utils/layoutTransition';

describe('markAndMeasure', () => {
    it('should mark the elements passed in and measure them', () => {
        const child1 = document.createElement('div');
        const child2 = document.createElement('div');

        document.body.appendChild(child1);
        document.body.appendChild(child2);

        const measureFn = jasmine.createSpy('measure function');

        markAndMeasure([child1, child2], measureFn);

        expect(measureFn).toHaveBeenCalledTimes(2);
        expect(measureFn).toHaveBeenCalledWith(jasmine.any(HTMLElement));
        expect(child1.dataset.layoutKey).toEqual('.0');

        child1.remove();
        child2.remove();
    }); 
});

describe('ifMarkedThenMeasure', () => {
    it('should only measure the elements that have been marked', () => {
        const child1 = document.createElement('div');
        child1.dataset.layoutKey = '.0';
        const child2 = document.createElement('div');

        document.body.appendChild(child1);
        document.body.appendChild(child2);

        const measureFn = jasmine.createSpy('measure function');

        ifMarkedThenMeasure([child1, child2], measureFn);

        expect(measureFn).toHaveBeenCalledTimes(1);
        expect(measureFn).toHaveBeenCalledWith(jasmine.any(HTMLElement));

        child1.remove();
        child2.remove();
    }); 
});

