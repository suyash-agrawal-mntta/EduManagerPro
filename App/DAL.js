/**
 * Data Access Layer (DAL) for EduManagerPro.
 * Implements the 5-Layer Protection Model.
 */

// Basic App Script lock mechanism for writes, preventing race conditions.
function _executeWithLock(actionFn) {
  const lock = LockService.getScriptLock();
  try {
    // Wait up to 10 seconds for other processes to finish.
    const success = lock.tryLock(10000);
    if (!success) {
      throw new Error("Could not acquire lock after 10 seconds. Database is busy.");
    }
    return actionFn();
  } catch (e) {
    console.error("LockService Error:", e);
    throw e;
  } finally {
    lock.releaseLock();
  }
}

function _logAudit(userRole, action, table, rowId, field, oldVal, newVal) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const logSheet = ss.getSheetByName('_audit_log');
  const ts = new Date();
  logSheet.appendRow([ts, userRole, action, table, rowId, field, oldVal, newVal]);
}

/**
 * Generates unique IDs (e.g. STU-YYYYMMDD-NNN)
 */
function _generateId(prefix) {
  const dateStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd");
  const rand = Math.floor(Math.random() * 900) + 100; // 100-999
  return `${prefix}-${dateStr}-${rand}`;
}

/**
 * Gets all records from a table, returning an array of objects.
 */
function getRecords(tableName, includeDeleted=false) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(tableName);
  if (!sheet) throw new Error(`Table ${tableName} not found.`);
  
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return []; // Only headers or empty
  
  const headers = data[0];
  const results = [];
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    let isDeleted = false;
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j];
      if (headers[j] === 'deleted' && row[j] === true) {
        isDeleted = true;
      }
    }
    if (includeDeleted || !isDeleted) {
      results.push(obj);
    }
  }
  return results;
}

/**
 * Adds a new record to the sheet.
 */
function addRecord(tableName, rowObj, userRole="Admin", idPrefix="REC") {
  return _executeWithLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(tableName);
    if (!sheet) throw new Error(`Table ${tableName} not found.`);
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const newId = _generateId(idPrefix);
    
    // Attempt to set the first column (assuming it's an ID column)
    if (headers.length > 0) rowObj[headers[0]] = newId;

    const rowData = headers.map(h => rowObj[h] !== undefined ? rowObj[h] : "");
    sheet.appendRow(rowData);
    
    _logAudit(userRole, "CREATE", tableName, newId, "ALL", "", JSON.stringify(rowObj));
    return newId;
  });
}

/**
 * Updates a record matching the target ID
 */
function updateRecord(tableName, idColName, idValue, updateObj, userRole="Admin") {
  return _executeWithLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(tableName);
    if (!sheet) throw new Error(`Table ${tableName} not found.`);
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const idIdx = headers.indexOf(idColName);
    if (idIdx === -1) throw new Error(`ID Column ${idColName} not found.`);
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][idIdx] === idValue) {
        // We found the row. Perform updates.
        for (const [key, val] of Object.entries(updateObj)) {
          const colIdx = headers.indexOf(key);
          if (colIdx !== -1) {
            const oldVal = data[i][colIdx];
            sheet.getRange(i + 1, colIdx + 1).setValue(val);
            _logAudit(userRole, "UPDATE", tableName, idValue, key, String(oldVal), String(val));
          }
        }
        return true;
      }
    }
    return false; // Not found
  });
}

/**
 * Soft delete rule: Set deleted=TRUE + move snapshot to _deleted tab.
 * Never call sheet.deleteRow()
 */
function softDelete(tableName, idColName, idValue, userRole="Admin") {
  return _executeWithLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(tableName);
    if (!sheet) throw new Error(`Table ${tableName} not found.`);
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const idIdx = headers.indexOf(idColName);
    
    const delIdx = headers.indexOf('deleted');
    const delAtIdx = headers.indexOf('deleted_at');
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][idIdx] === idValue) {
        // Construct full row JSON
        const fullRowObj = {};
        for (let j = 0; j < headers.length; j++) {
          fullRowObj[headers[j]] = data[i][j];
        }
        
        // 1. Mark softly deleted in origin table if fields exist
        const ts = new Date();
        if (delIdx !== -1) sheet.getRange(i + 1, delIdx + 1).setValue(true);
        if (delAtIdx !== -1) sheet.getRange(i + 1, delAtIdx + 1).setValue(ts);
        
        // 2. Move snapshot to _deleted tab
        const deletedSheet = ss.getSheetByName('_deleted');
        // _deleted cols: original_table, original_row_id, full_row_json, deleted_by, deleted_at, restored
        deletedSheet.appendRow([tableName, idValue, JSON.stringify(fullRowObj), userRole, ts, false]);
        
        _logAudit(userRole, "SOFT_DELETE", tableName, idValue, "status", "Active", "Deleted");
        return true;
      }
    }
    return false;
  });
}
