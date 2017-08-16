import {fireOnce} from '../';

it('function should only fire once (with single element)', () => {
    const mockCallback = jasmine.createSpy('callback');

    const element = document.createElement('div');

    fireOnce([element], 'click', mockCallback);

    element.click();

    expect(mockCallback.calls.count()).toBe(1);
});

it('function should only fire once (with multiple elements)', () => {
    const mockCallback = jasmine.createSpy('callback');

    const elements: HTMLElement[] = [];
    for (let i = 0; i < 2; i++) {
        elements.push(document.createElement('div'));
    }

    fireOnce(elements, 'click', mockCallback);

    for (const el of elements) {
        el.click();
    }

    expect(mockCallback.calls.count()).toBe(1);
});
