"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateISODate = validateISODate;
function validateISODate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return false; // Invalid date
    }
    const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}([+-]\d{2}:\d{2}|Z)$/;
    return isoDatePattern.test(dateString);
}
