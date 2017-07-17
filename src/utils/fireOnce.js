export default function fireOnce(nodes, eventType, func) {
    const totalCount = nodes.length;
    let count = 0;
    const events = [];
    const eventListener = (event) => {
        count++;
        events.push(event);
        if (count === totalCount) {
            func(events);
        }
        event.target.removeEventListener(eventType, eventListener);
    };
    nodes.forEach((node) => {
        node.addEventListener(eventType, eventListener);
    });
}
