import {createDummyElements} from '../../src/utils';

describe('createDummyElements (single)', () => {
    const elementTag = 'DIV';
    const width = 150;
    const height = 200;

    let elements: HTMLElement[];
    let returnedEl: HTMLElement;
    let style: CSSStyleDeclaration;

    beforeEach(() => {
        const element = document.createElement(elementTag);
        document.body.appendChild(element);
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;

        elements = [element];
        
        const returned = createDummyElements(
            elements,
            elements.map(el => el.getBoundingClientRect()),
        );

        returnedEl = returned[0];
        document.body.appendChild(returnedEl);
        style = getComputedStyle(returnedEl);
    });

    afterEach(() => {
        elements.forEach(el => el.remove());
        returnedEl.remove();
    });

    it('should have same tag name', () => {
        expect(returnedEl.tagName).toEqual(elementTag);
    });

    it('should have position set to absoulte', () => {
        expect(style.position).toEqual('absolute');
    });

    it('should have width and height set properly', () => {
        expect(style.width).toEqual(`${width}px`);
        expect(style.height).toEqual(`${height}px`);
    });
});
