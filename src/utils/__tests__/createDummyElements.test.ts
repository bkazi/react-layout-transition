import {createDummyElements} from '../';

describe('createDummyElements (single)', () => {
    const elementTag = 'DIV';
    const width = 150;
    const height = 200;

    function mockSingleElement() {
        const element = document.createElement(elementTag);
        document.body.appendChild(element);
        element.id = 'bleg';
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;

        const elements = [element];

        return elements;
    }

    it('should have same tag name', () => {
        const elements = mockSingleElement();

        const returned = createDummyElements(
            elements,
            elements.map(el => el.getBoundingClientRect()),
        );

        const returnedEl = returned[0];
        document.body.appendChild(returnedEl);
        const style = getComputedStyle(returnedEl);

        expect(returnedEl.tagName).toEqual(elementTag);

        elements.forEach(el => el.remove());
        returnedEl.remove();
    });

    it('should have position set to absoulte', () => {
        const elements = mockSingleElement();

        const returned = createDummyElements(
            elements,
            elements.map(el => el.getBoundingClientRect()),
        );

        const returnedEl = returned[0];
        document.body.appendChild(returnedEl);
        const style = getComputedStyle(returnedEl);

        expect(style.position).toEqual('absolute');

        elements.forEach(el => el.remove());
        returnedEl.remove();
    });

    it('should have width and height set properly', () => {
        const elements = mockSingleElement();

        const returned = createDummyElements(
            elements,
            elements.map(el => el.getBoundingClientRect()),
        );

        const returnedEl = returned[0];
        document.body.appendChild(returnedEl);
        const style = getComputedStyle(returnedEl);

        expect(style.width).toEqual(`${width}px`);
        expect(style.height).toEqual(`${height}px`);

        elements.forEach(el => el.remove());
        returnedEl.remove();
    });
});
