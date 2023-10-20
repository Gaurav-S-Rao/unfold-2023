export function emptyRows(page, rowsPerPage, arrayLength) {
    return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}
function descendingComparator(a, b, orderBy) {
    if (a[orderBy] === null) {
        return 1;
    }
    if (b[orderBy] === null) {
        return -1;
    }
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
export function getComparator(order, orderBy) {
    return order === 'desc'
        ? function (a, b) { return descendingComparator(a, b, orderBy); }
        : function (a, b) { return -descendingComparator(a, b, orderBy); };
}
