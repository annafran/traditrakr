"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
const date_fns_1 = require("date-fns");
const formatDate = (date) => (0, date_fns_1.format)(date, "iii dd LLL yyyy, HH:mm");
exports.formatDate = formatDate;
