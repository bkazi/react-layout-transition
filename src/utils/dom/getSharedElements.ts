export default function getSharedElements(
    container1?: HTMLElement,
    container2?: HTMLElement,
): {
    container1SharedElements: HTMLElement[];
    container2SharedElements: HTMLElement[];
} {
    if (!container1 || !container2) {
        return {
            container1SharedElements: [],
            container2SharedElements: [],
        };
    }

    const container1SharedElements = [];
    const container2SharedElements = [];

    const container1MarkedEls = Array.from(container1.querySelectorAll('[id]'));
    const container2MarkedEls = Array.from(container2.querySelectorAll('[id]'));

    const container1Set = new Set(
        Array.from(container1MarkedEls).map(el => el.id),
    );
    const container2Set = new Set(
        Array.from(container2MarkedEls).map(el => el.id),
    );

    for (const element of container1MarkedEls) {
        if (container2Set.has(element.id) && element instanceof HTMLElement) {
            container1SharedElements.push(element);
        }
    }
    for (const element of container2MarkedEls) {
        if (container1Set.has(element.id) && element instanceof HTMLElement) {
            container2SharedElements.push(element);
        }
    }

    return {
        container1SharedElements,
        container2SharedElements,
    };
}
