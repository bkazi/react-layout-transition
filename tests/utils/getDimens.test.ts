import {getDimens, getDimensArray} from '../../src/utils';

describe('getDimens', () => {
    const bodyStyle = getComputedStyle(document.body);
    let bodyMarginTop: number;
    let bodyMarginLeft: number;
    if (bodyStyle && bodyStyle.marginTop && bodyStyle.marginLeft) {
        bodyMarginTop = parseInt(bodyStyle.marginTop, 10);
        bodyMarginLeft = parseInt(bodyStyle.marginLeft, 10);
    }
    const width = 100;
    const height = 100;
    let element: HTMLElement;

    beforeEach(() => {
        element = document.createElement('div');
        document.body.appendChild(element);
        element.style.position = 'absolute';
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
    });

    afterEach(() => {
        element.remove();
    });

    it('should get correct size', () => {
        const size = getDimens(element);

        expect(size.width).toEqual(width);
        expect(size.height).toEqual(height);
    });

    it('should get correct viewport independant position', () => {
        const pos = getDimens(element);

        expect(pos.top).toEqual(bodyMarginTop);
        expect(pos.left).toEqual(bodyMarginLeft);
    });
});

describe('getDimensArray', () => {
    const bodyStyle = getComputedStyle(document.body);
    let bodyMarginTop: number;
    let bodyMarginLeft: number;
    if (bodyStyle && bodyStyle.marginTop && bodyStyle.marginLeft) {
        bodyMarginTop = parseInt(bodyStyle.marginTop, 10);
        bodyMarginLeft = parseInt(bodyStyle.marginLeft, 10);
    }
    const width = 100;
    const height = 100;
    const elementCount = 3;
    let elements: HTMLElement[] = [];

    beforeEach(() => {
        for (let i = 0; i < elementCount; i++) {
            const element = document.createElement('div');
            document.body.appendChild(element);
            element.style.position = 'absolute';
            element.style.width = `${width}px`;
            element.style.height = `${height}px`;
            elements.push(element);
        }
    });

    afterEach(() => {
        elements.forEach(element => {
            element.remove();
        });
        elements = [];
    });

    it('should get correct size for each element', () => {
        const sizes = getDimensArray(elements);
        sizes.forEach(size => {   
            expect(size.width).toEqual(width);
            expect(size.height).toEqual(height);
        });
    });

    it('should get correct viewport independant position for each element', () => {
        const positions = getDimensArray(elements);
        positions.forEach(pos => {
            expect(pos.top).toEqual(bodyMarginTop);
            expect(pos.left).toEqual(bodyMarginLeft);
        });
    });
});
