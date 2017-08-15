import {createDummyElements} from '../';

describe('createDummyElements (single)', () => {
    const elementTag = 'DIV';
    const width = 0;
    const height = 0;

    function mockSingleElement() {
        const element = document.createElement(elementTag);

        const elements = [element];

        return elements;
    }

    test('should have same tag name', () => {
        const elements = mockSingleElement();

        const returned = createDummyElements(
            elements,
            elements.map(el => el.getBoundingClientRect()),
        );

        const returnedEl = returned[0];
        const style = getComputedStyle(returnedEl);

        expect(returnedEl.tagName).toEqual(elementTag);
    });

    test('should have position set to absoulte', () => {
        const elements = mockSingleElement();

        const returned = createDummyElements(
            elements,
            elements.map(el => el.getBoundingClientRect()),
        );

        const returnedEl = returned[0];
        const style = getComputedStyle(returnedEl);

        expect(style.position).toEqual('absolute');
    });

    test('should have width and height set properly', () => {
        const elements = mockSingleElement();

        const returned = createDummyElements(
            elements,
            elements.map(el => el.getBoundingClientRect()),
        );

        const returnedEl = returned[0];
        const style = getComputedStyle(returnedEl);

        expect(style.width).toEqual(`${width}px`);
        expect(style.height).toEqual(`${height}px`);
    });
});
