export function isEmpty(obj) {
    if (typeof obj === 'undefined' || obj == null || obj === '') {
        return true;
    } else {
        return false;
    }

}

export default {
    isEmpty
}