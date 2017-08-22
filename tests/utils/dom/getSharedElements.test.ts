import {getSharedElements} from '../../../src/utils/dom';

describe('getSharedElements', () => {
    it('should return empty arrays if containers are null', () => {
        const {container1SharedElements, container2SharedElements} = getSharedElements(null, null);

        expect(container1SharedElements.length).toEqual(0);
        expect(container2SharedElements.length).toEqual(0);
    });

    it('should return the correct common elements for each container', () => {
        const child1Text = 'Foo'
        const container1 = document.createElement('div');
        const child1 = document.createElement('span');
        child1.textContent = child1Text;
        child1.id = 'shared';
        container1.appendChild(child1);

        const child2Text = 'Bar'
        const container2 = document.createElement('div');
        const child2 = document.createElement('span');
        child2.textContent = child2Text;
        child2.id = 'shared';
        container2.appendChild(child2);

        document.body.appendChild(container1);
        document.body.appendChild(container2);

        const {container1SharedElements, container2SharedElements} = getSharedElements(container1, container2);

        expect(container1SharedElements.length).toEqual(1);
        expect(container1SharedElements[0].textContent).toEqual(child1Text);
        expect(container2SharedElements.length).toEqual(1);
        expect(container2SharedElements[0].textContent).toEqual(child2Text);

        container1.remove();
        container2.remove();
    });
});