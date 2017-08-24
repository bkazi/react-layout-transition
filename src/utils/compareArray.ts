export default function compareArray(array1: any[], array2: any[]): boolean {
    if (array1.length !== array2.length) {
        return false;
    }
    for (const x of array1) {
        if (array2.indexOf(x) === -1) {
            return false;
        }
    }
    return true;
}
