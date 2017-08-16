import {fireOnce} from '../../src/utils';

describe('fireOnce', () => {
    let callback: jasmine.Spy;

    beforeEach(() => {
        callback = jasmine.createSpy('callback');
    })

    it('function should only fire once (with single element)', () => {
        const element = document.createElement('div');

        fireOnce([element], 'click', callback);
    
        element.click();
    
        expect(callback.calls.count()).toBe(1);
    });
    
    it('function should only fire once (with multiple elements)', () => {
        const elements: HTMLElement[] = [];
        for (let i = 0; i < 2; i++) {
            elements.push(document.createElement('div'));
        }
    
        fireOnce(elements, 'click', callback);
    
        for (const el of elements) {
            el.click();
        }
    
        expect(callback.calls.count()).toBe(1);
    });
});

