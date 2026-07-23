export function parseDropId(id: string) {
    const [position, nodeId] = id.split("-");
    return {
        position,
        nodeId,
    };

}