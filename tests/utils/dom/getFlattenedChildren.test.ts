import {getFlattenedChildren} from '../../../src/utils/dom';

describe('getFlattenedChildren', () => {
    it('should return a flat array of dom nodes', () => {
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

        const children = getFlattenedChildren([container1, container2]);

        expect(children.length).toEqual(2);

        container1.remove();
        container2.remove();
    })
});
