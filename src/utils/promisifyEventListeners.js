export default function promisifyEventListeners(nodes, eventType) {
    return nodes.map((node) => {
        return new Promise((resolve, reject) => {
            node.addEventListener(eventType, (event) => {
                resolve(event);
            });
        });
    });
}
