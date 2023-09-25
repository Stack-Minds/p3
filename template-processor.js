'use strict';

class UpdatedTableTemplate {
  static fillIn(updatedTableId, updatedDictionaryData, updatedColumnName) {
    const updatedTableElement = document.getElementById(updatedTableId);
    if (!updatedTableElement) {
      console.error(`Table with id '${updatedTableId}' not found.`);
      return;
    }

    const replaceTemplateStrings = (updatedCellElement, updatedData) => {
      const cellText = updatedCellElement.textContent.trim();
      const templateInstance = new UpdatedTemplateProcessor(cellText);
      const templateString = templateInstance.fillIn(updatedData);
      updatedCellElement.textContent = templateString;
    };

    const updatedHeaderRow = updatedTableElement.rows[0];
    const columnIndexMap = {};
    for (let i = 0; i < updatedHeaderRow.cells.length; i++) {
      let cellElement = updatedHeaderRow.cells[i];
      replaceTemplateStrings(cellElement, updatedDictionaryData);
      columnIndexMap[cellElement.textContent.trim()] = i;
    }

    for (let rowIdx = 1; rowIdx < updatedTableElement.rows.length; rowIdx++) {
      const updatedRowElement = updatedTableElement.rows[rowIdx];
      if (updatedColumnName) {
        let cellElement = updatedRowElement.cells[columnIndexMap[updatedColumnName]];
        if (cellElement) {
          replaceTemplateStrings(cellElement, updatedDictionaryData);
        }
      } else {
        for (let cellIdx = 0; cellIdx < updatedRowElement.cells.length; cellIdx++) {
          let cellElement = updatedRowElement.cells[cellIdx];
          replaceTemplateStrings(cellElement, updatedDictionaryData);
        }
      }
    }

    updatedTableElement.style.visibility = 'visible';
  }
}

class UpdatedTemplateProcessor {
  constructor(template) {
    this.template = template;
  }

  fillIn(data) {
    let result = this.template;
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        const regex = new RegExp('{{' + key + '}}', 'g');
        result = result.replace(regex, data[key]);
      }
    }
    return result;
  }
}
