import {getDimens} from '../../src/utils';

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
