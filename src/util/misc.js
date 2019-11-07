/**
 * sortCardInColumn: change the position of the card from oldIdx to newIdx, return an new array object
 * @param {array} column the column that has the card's index change
 * @param {number} oldIdx index the card swap from
 * @param {number} newIdx index the card swap to
 * @returns {array}
 */
function sortCardInColumn(column, oldIdx, newIdx) {
    const newColumn = [...column];
    const [movingCard] = newColumn.splice(oldIdx, 1);
    newColumn.splice(newIdx, 0, movingCard);

    return newColumn;
}

/**
 * moveCardBetweenColumns: move the card from specific index of sourceCol to specific index of targetCol, return an new array object
 * @param {array} sourceCol column the card swap from
 * @param {array} targetCol column the card swap to
 * @param {number} sourceColIdx index of card in the sourceCol
 * @param {number} targetColIdx index of card in the targetCol
 * @returns {[array, array]}
 */
function moveCardBetweenColumns(sourceCol, targetCol, sourceColIdx, targetColIdx) {
    const newSourceCol = [...sourceCol];
    const newTargetCol = [...targetCol];

    const [movingCard] = newSourceCol.splice(sourceColIdx, 1);
    newTargetCol.splice(targetColIdx, 0, movingCard);

    return [newSourceCol, newTargetCol];
}

export default { sortCardInColumn, moveCardBetweenColumns };
