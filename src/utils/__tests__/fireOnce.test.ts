import {fireOnce} from '../';

test('function should only fire once (with single element)', () => {
    const mockCallback = jest.fn();

    const element = document.createElement('div');

    fireOnce([element], 'click', mockCallback);

    element.click();

    expect(mockCallback.mock.calls.length).toBe(1);
});

test('function should only fire once (with multiple elements)', () => {
    const mockCallback = jest.fn();

    const elements: HTMLElement[] = [];
    for (let i = 0; i < 2; i++) {
        elements.push(document.createElement('div'));
    }

    fireOnce(elements, 'click', mockCallback);

    for (const el of elements) {
        el.click();
    }

    expect(mockCallback.mock.calls.length).toBe(1);
});
