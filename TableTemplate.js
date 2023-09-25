'use strict';

class TableTemplate {
  static fillIn(id, dict, colName) {
    const tableElement = document.getElementById(id);
    const headerRow = tableElement.rows[0];
    const headerCells = Array.from(headerRow.cells);
    const numColumns = headerCells.length;

    if (colName) {
      const columnIndex = headerCells.findIndex(cell => cell.innerHTML === colName);
      if (columnIndex === -1) {
        console.error(`Column "${colName}" not found in the table.`);
        return;
      }

      for (let i = 1; i < tableElement.rows.length; i++) {
        const currentCell = tableElement.rows[i].cells[columnIndex];
        const template = new TemplateProcessor(currentCell.innerHTML);
        currentCell.innerHTML = template.fillIn(dict);
      }
      
    } else {
      for (let i = 1; i < tableElement.rows.length; i++) {
        for (let j = 0; j < numColumns; j++) {
          const currentCell = tableElement.rows[i].cells[j];
          const template = new TemplateProcessor(currentCell.innerHTML);
          currentCell.innerHTML = template.fillIn(dict);
        }
      }
    }
  }
}
