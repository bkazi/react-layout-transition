function markAndMeasure(
    childNodes: Node[],
    measureFn: (child: HTMLElement) => any,
) {
    const dimens: Map<string, any> = new Map();
    childNodes.forEach((child, index) => {
        if (!(child instanceof HTMLElement)) {
            return;
        }
        // mark initial elements with unique keys to track
        const key = `.${index}`;
        child.dataset.layoutKey = key;

        dimens.set(key, measureFn(child));
    });
    return dimens;
}

function ifMarkedThenMeasure(
    childNodes: Node[],
    measureFn: (child: HTMLElement) => any,
) {
    const dimens: Map<string, any> = new Map();
    childNodes.forEach(child => {
        if (child instanceof HTMLElement) {
            const key = child.dataset.layoutKey;
            if (key) {
                dimens.set(key, measureFn(child));
            }
        }
    });
    return dimens;
}

export {markAndMeasure, ifMarkedThenMeasure};
