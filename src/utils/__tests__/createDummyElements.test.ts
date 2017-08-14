import {createDummyElements} from '../';

test('should create one dummy element', () => {
    const elements = [document.createElement('div')];
    const bcrs = elements.map(el => el.getBoundingClientRect());

    const returned = createDummyElements(elements, bcrs);

    const returnedEl = returned[0];
    const style = getComputedStyle(returnedEl);

    expect(returnedEl.tagName).toEqual('DIV');
    expect(style.position).toEqual('absolute');
    expect(style.width).toEqual('0px');
    expect(style.height).toEqual('0px');
});
